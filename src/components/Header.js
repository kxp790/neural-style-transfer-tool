import React from 'react'
import logo from '../logo.png'
import { Link } from 'react-router-dom';

const Header = () => (
    <div className='App-header left'>
        <Link to='/'>
            <img src={logo} className="App-logo" alt="logo" />
            {/* <li className='header-links'>PHOTO STYLER</li> */}
        </Link>
        
        <Link to='/support'>
            <li className='header-links'>Support</li>
        </Link>
    </div>
)

export default Header
