import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useContext, useEffect } from 'react'
import PinInput from 'react-pin-input'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import PropogateLoader from 'react-spinners/PropagateLoader'
import { AppContext } from './AppContext'

const NewDesignPage = (props) => {
    const { setDesign } = useContext(AppContext)

    const [ inputPin, setInputPin ] = useState(1234)
    const [ inputPinIsValid, setInputPinIsValid ] = useState(true)
    const pinExp = new RegExp('^[0-9]{4}$');

    // function to call api to save new pin to database
    const savePin = () => {
        props.history.push("/model")
    }

    useEffect(() => {
        makeNewDesign()
    }, [])

    const updateInputPin = (value) => {
        setInputPinIsValid(pinExp.test(value))
        setInputPin(value)
    }

    // function to call api to make a new design, load it into context and and redirects to model
    async function makeNewDesign () {
        axios.get('http://localhost:5000/create_design', {
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            }
        }).then(function (response) {
            delete response.data['_id']
            setDesign(response.data)
        }).catch((error) => console.log(error))
    }

    return(
        <div style={{paddingTop: "20vh"}}>
            <AppContext.Consumer>
                {({design}) => (
                    design === undefined ? <PropogateLoader /> :
                    <>
                        <h4 className="caption-box">THIS IS YOUR DESIGN ID</h4>
                        <div style={{paddingBottom: "1vh"}}>
                            <p className="input-text-box">{design.id}</p>
                        </div>
                        <h4 className="caption-box">CHOOSE A PIN {(!inputPinIsValid) ? <FontAwesomeIcon icon={faTimes} style={{display: "inline", color: "red", padding:"0px 1px"}} /> : ''}</h4>
                        <PinInput 
                            className="pad-pin"
                            length={4} 
                            initialValue="1234"
                            onChange={(value) => updateInputPin(value)}
                            type="numeric" 
                            inputMode="number"
                            style={{paddingBottom: "3vh", width: "25vh", minWidth: "fit-content", margin: "0 auto"}}
                            inputStyle={{borderRadius: "4px", border: "2px solid #374a5c", backgroundColor: "#9db0c2", fontSize: "22px", height: "5vh", width: "5vh", padding: "1vh"}}
                            inputFocusStyle={{borderRadius: "4px", backgroundColor: "#52708a"}}
                            onComplete={(value) => updateInputPin(value)}
                            autoSelect={true}
                            regexCriteria={/^[0-9]*$/}
                        />
                        <button type="submit" to="/model" className="button button2" disabled={ !inputPinIsValid} onClick={savePin}>Continue</button>
                    </>
                )}
            </AppContext.Consumer>
        </div>
    )
}

export default withRouter(NewDesignPage)