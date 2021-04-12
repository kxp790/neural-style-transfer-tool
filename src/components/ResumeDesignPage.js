import React, {useState} from 'react';
import axios from 'axios';
import PinInput from 'react-pin-input';

const DesignIdForm = ({ onDesignIdChange, onPinChange, validate }) => {

    const handleDesignIdChange = (event) => {
        onDesignIdChange(event.target.value)
    }

    const handlePinChange = (value) => {
        onPinChange(value)
    }

    return(
        <form>
            <h3 className="caption-box">INSERT DESIGN ID:</h3>
            <div className="pad-bottom">
                <input className="input-text-box" type="text" required maxLength="6" pattern="[a-z0-9]{6}" onChange={handleDesignIdChange} />
            </div>
            <h3 className="caption-box">INSERT PIN:</h3>
            <PinInput 
                className="pad-text"
                length={4} 
                onChange={(value) => {handlePinChange(value)}}
                type="numeric" 
                inputMode="number"
                style={{paddingBottom: "3vh", width: "25vh", minWidth: "fit-content", margin: "0 auto"}}
                inputStyle={{borderRadius: "4px", border: "2px solid #374a5c", backgroundColor: "#9db0c2", font: "400 22px Arial", height: "4vh", width: "4vh", padding: "0.5vh"}}
                inputFocusStyle={{borderRadius: "4px", backgroundColor: "#52708a"}}
                onComplete={(value) => {handlePinChange(value)}}
                autoSelect={true}
                regexCriteria={/^[0-9]*$/}
            />
            <input type="submit" to="/model" className="button button2" value="Edit model" onClick={validate} />
            <text className="pad-sides">/</text>
            <input type="submit" to="/result" className="button button1" value="See results" onClick={validate} />
        </form>
    )
}

const ResumeDesignPage = ({ history }) => {
    const [ inputDesignId, setInputDesignId ] = useState('')
    const [ inputPin, setInputPin ] = useState(1234)

    async function validateInput () {
        // TODO - send get request with desing to API with pin in body to see if that pair exists and either receive none or design
        // TODO - if none then display validation error, if design is returned then set context design and redirect to model 
        history.push('/model')

        axios.get('http://localhost:5000/check_design', {
                'design_id': inputDesignId,
                'pin': inputPin
            }, {
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
                }
        })
        .then(function (response) {
            console.log(response.data)
        })
    }

    return (
        <div className="pad-block">
            <DesignIdForm onDesignIdChange={(v) => setInputDesignId(v)} onPinChange={(v) => setInputPin(v)} validate={validateInput}/>
        </div>
    )
}

export default ResumeDesignPage