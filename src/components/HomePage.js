import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'

const HomePage = () => {
    return(
        <div style={{paddingTop: "10vh", height: "20vh"}}>
            <img src={logo} style={{height: "25vh", padding: "5vh"}} />
            <div></div>
            <Link to="/new_design" className="button button1">Start New</Link>
            <p style={{padding: "0vh 1vh", padding: "3vh"}}>OR</p>
            <Link to="/resume_design" className="button button2">Resume Previous</Link>
        </div>
    )
}

export default HomePage
