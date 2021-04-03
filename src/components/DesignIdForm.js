import React from 'react';

const DesignIdForm = ({ designId, onFormChange, validate }) => {
    
    const handleChange = (event) => {
        onFormChange(event.target.value)
    }

    return(
        <form className="wrap">
            <input type="text" className="input-text-box" required value={designId} onChange={handleChange} />
            <div><br></br></div>
            <input type="submit" to="/model" className="button button2" value="Continue" onClick={validate} />
        </form>
    )
}

export default DesignIdForm