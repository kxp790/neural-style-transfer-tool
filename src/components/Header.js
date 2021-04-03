import React from 'react'
import logo from '../images/logo.png'
import { Link } from 'react-router-dom';

const Header = () => (
    <div className='App-header'>
        <Link to='/'>
            <img src={logo} className="App-logo logo" alt="logo" />
        </Link>
        {/* <p className='header-links title'>PHOTO STYLER</p> */}
        <Link to='/support' className='header-links'>Support</Link>
    </div>
)

export default Header
