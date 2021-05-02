import React from 'react'
import { useHistory } from 'react-router-dom'
import logo from '../images/logo.png'

const Header = () => {
    const history = useHistory()

    return(
        <div className="App-header" title="header">
            <div style={{padding: "0.5vh 10vw"}}>
                <button title="logoLink" onClick={() => history.push("/")} className="logo-link"><img src={logo} className="App-logo logo" alt="logo" /></button>
            </div>
            <button title="supportLink" onClick={() => history.push("/support")} className='header-links'>Support</button>
        </div>
    )
}

export default Header
