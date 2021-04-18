import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'

const Header = () => (
    <div className='App-header'>
        <Link to='/'><img src={logo} className="App-logo logo" alt="logo" /></Link>
        {/* <p className='header-links title'>PHOTO STYLER</p> */}
        <Link to='/support' className='header-links'>Support</Link>
    </div>
)

export default Header
