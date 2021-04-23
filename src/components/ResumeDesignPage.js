import axios from 'axios'
import React, { useContext, useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import PinInput from 'react-pin-input'
import { AppContext } from './AppContext'
import { ModelDesignContext } from './model_design/ModelDesignContext'

const DesignIdForm = ({ handleEditModel, handleSeeResult, onDesignIdChange, onPinChange }) => {

    // handle design id change
    const handleDesignIdChange = (event) => {
        onDesignIdChange(event.target.value)
    }

    // handle pin change
    const handlePinChange = (value) => {
        onPinChange(value)
    }

    return(
        <>
            <h4 className="caption-box">INSERT DESIGN ID:</h4>
            <div style={{paddingBottom: "2vh"}}>
                <input className="input-text-box" type="text" required maxLength="6" pattern="[a-z0-9]{6}" onChange={handleDesignIdChange} />
            </div>
            <h4 className="caption-box">INSERT PIN:</h4>
            <PinInput 
                className="pad-pin"
                length={4} 
                secret 
                onChange={(value) => {handlePinChange(value)}}
                type="numeric" 
                inputMode="number"
                style={{paddingBottom: "3vh", width: "25vh", minWidth: "fit-content", margin: "0 auto"}}
                inputStyle={{borderRadius: "4px", border: "2px solid #374a5c", backgroundColor: "#9db0c2", fontSize: "22px", height: "5vh", width: "5vh", padding: "1vh"}}
                inputFocusStyle={{borderRadius: "4px", backgroundColor: "#52708a"}}
                onComplete={(value) => {handlePinChange(value)}}
                autoSelect={true}
                regexCriteria={/^[0-9]*$/}
            />
            <input type="submit" className="button button2" value="Edit model" onClick={handleEditModel} />
            <p style={{padding: "0vh 1vh", display: "inline"}}>/</p>
            <input type="submit" className="button button1" value="See result" onClick={handleSeeResult} />
        </>
    )
}

const ResumeDesignPage = () => {
    // context 
    const { design, setDesign, setHasResult } = useContext(AppContext)
    
    // input storing variables
    const [ inputDesignId, setInputDesignId ] = useState('')
    const [ inputPin, setInputPin ] = useState(1234)
    
    const history = useHistory()

    const handleEditModel = async () => {
        if(await validateInput()) {
            history.push('/model')
        } else { 
            console.log("Validation unsuccessful")
        }
    }

    const handleSeeResult = async () => {
        if(await validateInput()) {
            setHasResult(true)
            history.push('/result')
        } else { 
            console.log("Validation unsuccessful")
        }
    }

    // function sends get request with input design id and pin to api to check pair validity and either receives none or the corresponding design
    // if none then displays validation error, if design is returned then sets context design and redirects to model 
    const validateInput = async () => {
        var response = await axios.post('http://localhost:5000/check_design_with_pin', {
            design_id: inputDesignId,
            pin: inputPin
        }, {
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            }
        }).catch((error) => console.log(error))

        if(response.status === 200) {
            delete response.data['_id']
            await setDesign(response.data)
            return true
        }
        return false
    }

    return (
        <div style={{paddingTop: "20vh"}}>
            <DesignIdForm onDesignIdChange={(v) => setInputDesignId(v)} onPinChange={(v) => setInputPin(v)} handleSeeResult={handleSeeResult} handleEditModel={handleEditModel} validate={validateInput}/>
        </div>
    )
}

export default ResumeDesignPage
