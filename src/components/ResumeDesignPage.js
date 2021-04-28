import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import PinInput from 'react-pin-input'
import { AppContext } from './AppContext'

const ResumeDesignPage = () => {
    // context 
    const { setDesign, setHasResult } = useContext(AppContext)
    
    // input storing variables
    const [ inputDesignId, setInputDesignId ] = useState('')
    const [ inputPin, setInputPin ] = useState('')

    const [ inputDesignIdIsValid, setInputDesignIdIsValid ] = useState(false)
    const [ inputPinIsValid, setInputPinIsValid ] = useState(false)

    const [ displayErrorMessage, setDisplayErrorMessage ] = useState(false)

    const designIdExp = new RegExp('^[a-z0-9]{6}$');
    const pinExp = new RegExp('^[0-9]{4}$');
    
    const history = useHistory()

    const handleEditModel = async () => {
        if(await validateInput()) {
            history.push('/model')
        } else { 
            setDisplayErrorMessage(true)
            console.log("Validation unsuccessful")
        }
    }

    const handleSeeResult = async () => {
        if(await validateInput()) {
            setHasResult(true)
            history.push('/result')
        } else { 
            setDisplayErrorMessage(true)
            console.log("Validation unsuccessful")
        }
    }

    const updateInputDesignId = (value) => {
        setInputDesignIdIsValid(designIdExp.test(value))
        setInputDesignId(value)
    }

    const updateInputPin = (value) => {
        setInputPinIsValid(pinExp.test(value))
        setInputPin(value)
    }

    // function sends get request with input design id and pin to api to check pair validity and either receives none or the corresponding design
    // if none then displays validation error, if design is returned then sets context design and redirects to model 
    const validateInput = async () => {
        var successful = false
        const res = await axios.post('http://localhost:5000/check_design_with_pin', {
            design_id: inputDesignId,
            pin: inputPin
        }, {
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            }
        }).then((response) => {
            delete response.data['_id']
            setDesign(response.data)
            successful = true
        }).catch((error) => console.log(error))
        return successful
    }

    return (
        <div style={{paddingTop: "20vh"}}>
            <h4 className="caption-box">INSERT DESIGN ID {(!inputDesignIdIsValid && inputDesignId !== '') ? <FontAwesomeIcon icon={faTimes} style={{display: "inline", color: "red", padding:"0px 1px"}} /> : ''}</h4>
            <div style={{paddingBottom: "1vh"}}>
                <input className="input-text-box" type="text" maxLength="6" pattern="[a-z0-9]{6}" onChange={(event) => updateInputDesignId(event.target.value)} />
            </div>
            <h4 className="caption-box">INSERT PIN {(!inputPinIsValid && inputPin !== '') ? <FontAwesomeIcon icon={faTimes} style={{display: "inline", color: "red", padding:"0px 1px"}} /> : ''}</h4>
            <PinInput 
                className="pad-pin"
                length={4} 
                secret 
                onChange={(value) => updateInputPin(value)}
                type="numeric" 
                inputMode="number"
                style={{paddingBottom: "3vh", width: "25vh", minWidth: "fit-content", margin: "0 auto"}}
                inputStyle={{borderRadius: "4px", border: "2px solid #374a5c", backgroundColor: "#9db0c2", fontSize: "22px", height: "5vh", width: "5vh", padding: "1vh"}}
                inputFocusStyle={{borderRadius: "4px", backgroundColor: "#52708a"}}
                onComplete={(value) => {updateInputPin(value)}}
                autoSelect={true}
                regexCriteria={/^[0-9]*$/}
            />
            <button type="submit" className="button button2" disabled={!inputDesignIdIsValid || !inputPinIsValid} onClick={handleEditModel}>Edit model</button>
            <p style={{padding: "0vh 1vh", display: "inline"}}>/</p>
            <button type="submit" className="button button1" disabled={!inputDesignIdIsValid || !inputPinIsValid} onClick={handleSeeResult}>See result</button>
            {displayErrorMessage ? <p style={{color: "red", padding: "1vh"}}>INVALID DESIGN ID AND/OR PIN</p> : ""}
        </div>
    )
}

export default ResumeDesignPage
