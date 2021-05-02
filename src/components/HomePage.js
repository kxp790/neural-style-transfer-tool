import React from 'react'
import { useHistory } from 'react-router-dom'
import logo from '../images/logo.png'

const HomePage = () => {

    const history = useHistory()

    return(
        <div style={{paddingTop: "10vh", height: "20vh"}}>
            <img src={logo} style={{height: "25vh", padding: "5vh"}} alt="" />
            <div></div>
            <button title="start-design-button" className="button button1" onClick={() => history.push("/new_design")}>Start New</button>
            <p style={{padding: "3vh 1vh"}}>OR</p>
            <button title="resume-design-button" className="button button2" onClick={() => history.push("/resume_design")}>Resume Previous</button>
        </div>
    )
}

export default HomePage
