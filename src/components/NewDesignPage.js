import React, { useState } from 'react'
import PinForm from './PinForm';

const NewDesignPage = () => {
    const design_id = 'af2iak2jh3';
    
    const savePin = () => {
        
    }

    return(
        <div className="pad-block">
            <h4>YOUR DESIGN ID:</h4>
            <h1 className="input-text-box">{design_id}</h1>
            <h4>CHOOSE A PIN:</h4>
            <PinForm />
            <input type="submit" to="/model" className="button button2" value="Continue" onClick={savePin} />
        </div>
    )
}

export default NewDesignPage