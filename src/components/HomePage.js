import React from 'react';
import { Link } from 'react-router-dom'; 

export const HomePage = () => {
    
    return(
        <div className="pad-block">
            <Link to="/new_design" className="button button1">Start</Link>
            <p className="pad-text">OR</p>
            <Link to="/resume_design" className="button button2">Continue</Link>
        </div>
    )
}

export default HomePage
