import React, {useState} from 'react';
import axios from 'axios';
import PinForm from './PinForm';
import PinInput from 'react-pin-input';

const DesignIdForm = ({ onDesignIdChange, onPinChange, validate }) => {

    const handleDesignIdChange = (event) => {
        onDesignIdChange(event.target.value)
        console.log(event.target.value)
    }

    const handlePinChange = (value) => {
        onPinChange(value)
        console.log(value)
    }

    return(
        <form>
            <h4>INSERT DESIGN ID AND PIN:</h4>
            <div className="pad-bottom">
                <input type="text" placeholder="DESIGN ID" initialValue="" className="input-text-box" required onChange={handleDesignIdChange} />
            </div>
            <PinInput 
                className="pad-text"
                length={4} 
                onChange={(value) => {handlePinChange(value)}}
                type="numeric" 
                inputMode="number"
                style={{paddingBottom: "2vh"}}
                inputStyle={{borderRadius: "4px", border: "2px solid #374a5c", backgroundColor: "#9db0c2", fontSize: "16px"}}
                inputFocusStyle={{borderRadius: "4px", backgroundColor: "#52708a"}}
                onComplete={(value) => {handlePinChange(value)}}
                autoSelect={true}
                regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
            />
            <input type="submit" to="/model" className="button button2" value="Continue" onClick={validate} />
        </form>
    )
}

const ResumeDesignPage = () => {
    const [inputDesignId, setInputDesignId] = useState('')
    const [inputPin, setInputPin] = useState(1234)

    const validateInput = () => {
        // TODO - send get request with desing to API with pin in body to see if that pair exists and either receive none or design
        // TODO - if none then display validation error, if design is returned then set context design and redirect to model 
    }

    const logDictionary = () => {
        console.log(inputDesignId)
        console.log(inputPin)
    }

    return (
        <div className="pad-block">
            <DesignIdForm onDesignIdChange={(v) => setInputDesignId(v)} onPinChange={(v) => setInputPin(v)} validate={validateInput}/>
            <p onClick={logDictionary}>hi</p>
        </div>
    )
}

export default ResumeDesignPage