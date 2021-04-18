import axios from 'axios'
import React, { useContext, useState } from 'react'
import PinInput from 'react-pin-input'
import { AppContext } from './AppContext'

const DesignIdForm = ({ onDesignIdChange, onPinChange, validate }) => {

    // handle design id change
    const handleDesignIdChange = (event) => {
        onDesignIdChange(event.target.value)
    }

    // handle pin change
    const handlePinChange = (value) => {
        onPinChange(value)
    }

    return(
        <form>
            <h4 className="caption-box">INSERT DESIGN ID:</h4>
            <div className="pad-bottom">
                <input className="input-text-box" type="text" required maxLength="6" pattern="[a-z0-9]{6}" onChange={handleDesignIdChange} />
            </div>
            <h4 className="caption-box">INSERT PIN:</h4>
            <PinInput 
                className="pad-text"
                length={4} 
                onChange={(value) => {handlePinChange(value)}}
                type="numeric" 
                inputMode="number"
                style={{paddingBottom: "3vh", width: "25vh", minWidth: "fit-content", margin: "0 auto"}}
                inputStyle={{borderRadius: "4px", border: "2px solid #374a5c", backgroundColor: "#9db0c2", font: "400 22px Arial", height: "4vh", width: "4vh", padding: "1vh"}}
                inputFocusStyle={{borderRadius: "4px", backgroundColor: "#52708a"}}
                onComplete={(value) => {handlePinChange(value)}}
                autoSelect={true}
                regexCriteria={/^[0-9]*$/}
            />
            <input type="submit" to="/model" className="button button2" value="Edit model" onClick={validate} />
            <p className="pad-sides">/</p>
            <input type="submit" className="button button1" value="See results" onClick={(event) => validate(event)} />
        </form>
    )
}

const ResumeDesignPage = ({ history }) => {
    // context 
    const { design, setDesign } = useContext(AppContext)
    
    // input storing variables
    const [ inputDesignId, setInputDesignId ] = useState('')
    const [ inputPin, setInputPin ] = useState(1234)

    // function sends get request with input design id and pin to api to check pair validity and either receives none or the corresponding design
    // if none then displays validation error, if design is returned then sets context design and redirects to model 
    const validateInput = (event) => {
        event.preventDefault()
        history.push('/model')
        axios.post('http://localhost:5000/check_design_with_pin', {
            design_id: inputDesignId,
            pin: inputPin
        }, {
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000'
        }
        }).then(function (response) {
            if(response.status === 200) {
                axios.get('http://localhost:5000/get_design/' + inputDesignId, {
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
                }
                }).then(function (response) {
                    delete response.data['_id']
                    console.log(response.status)
                    console.log(response)
                    
                    setDesign(response.data)
                    console.log(design)
                })
            } else {console.log(response.status)}
        })
    }

    return (
        <div className="pad-block">
            <DesignIdForm onDesignIdChange={(v) => setInputDesignId(v)} onPinChange={(v) => setInputPin(v)} validate={validateInput}/>
        </div>
    )
}

export default ResumeDesignPage
