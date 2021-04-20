import React, { useContext, useEffect } from 'react'
import PinInput from 'react-pin-input'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import PropogateLoader from 'react-spinners/PropagateLoader'
import { AppContext } from './AppContext'

const NewDesignPage = (props) => {
    const { setDesign } = useContext(AppContext)

    // function to call api to save new pin to database
    const savePin = () => {
        props.history.push("/model")
    }

    useEffect(() => {
        makeNewDesign()
    }, [])

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
                        <h4>YOUR DESIGN ID:</h4>
                        <h1 className="input-text-box">{design.id}</h1>
                        <h4>CHOOSE A PIN:</h4>
                        <PinInput 
                            className="pad-pin"
                            length={4} 
                            initialValue="1234"
                            onChange={(value, index) => {}} 
                            type="numeric" 
                            inputMode="number"
                            style={{paddingBottom: "3vh", width: "25vh", minWidth: "fit-content", margin: "0 auto"}}
                            inputStyle={{borderRadius: "4px", border: "2px solid #374a5c", backgroundColor: "#9db0c2", font: "400 22px Arial", height: "4vh", width: "4vh", padding: "1vh"}}
                            inputFocusStyle={{borderRadius: "4px", backgroundColor: "#52708a"}}
                            onComplete={(value, index) => {}}
                            autoSelect={true}
                            regexCriteria={/^[0-9]*$/}
                        />
                        <input type="submit" to="/model" className="button button2" value="Continue" onClick={savePin} />
                    </>
                )}
            </AppContext.Consumer>
        </div>
    )
}

export default withRouter(NewDesignPage)