import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; 
import { AppContext } from './AppContext';

export const HomePage = () => (
    <div className="button-holder">
        <Link to="/model" className="button button1">Start</Link>
        <p className="pad">or</p>
        <Link to="/model" className="button button2">Continue</Link>
    </div>
)

export default HomePage
