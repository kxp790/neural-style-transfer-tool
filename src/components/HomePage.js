import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom'; 
import DesignIdForm from './DesignIdForm';

export const HomePage = () => {
    
    const [designId, setDesignId] = useState([])

    const validateDesignId = () => {
        
    }

    return(
        <div className="button-container">
            <Link to="/model" className="button button1">Start</Link>
            <div><br></br></div>
            <div><p>OR</p></div>
            <div><br></br></div>
            <DesignIdForm value={designId} onFormChange={(v) => {setDesignId(v)}} validate={validateDesignId}/>
        </div>
    )
}

export default HomePage
