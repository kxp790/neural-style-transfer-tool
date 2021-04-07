import React, {useState} from 'react';
import axios from 'axios';
import PinForm from './PinForm';

const DesignIdForm = ({ designId, onFormChange, validate }) => {

    const handleChange = (event) => {
        onFormChange(event.target.value)
    }

    return(
        <form>
            <h4>INSERT DESIGN ID AND PIN:</h4>
            <div className="pad-bottom">
                <input type="text" placeholder="DESIGN ID" className="input-text-box" required value={designId} onChange={handleChange} />
            </div>
            <PinForm />
            <input type="submit" to="/model" className="button button2" value="Continue" onClick={validate} />
        </form>
    )
}

const ResumeDesignPage = () => {
    const [designId, setDesignId] = useState([])

    const validateInput = () => {
        // TODO - send get request with desing to API with pin in body to see if that pair exists and either receive none or design
        // TODO - if none then display validation error, if design is returned then set context design and redirect to model 
    }

    return (
        <div className="pad-block">
            <DesignIdForm value={designId} onFormChange={(v) => {setDesignId(v)}} validate={validateInput}/>
        </div>
    )
}

export default ResumeDesignPage