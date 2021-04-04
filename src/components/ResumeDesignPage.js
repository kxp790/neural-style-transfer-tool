import React, {useState} from 'react'
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

    const validateDesignId = () => {
        
    }  

    return (
        <div className="pad-block">
            <DesignIdForm value={designId} onFormChange={(v) => {setDesignId(v)}} validate={validateDesignId}/>
        </div>
    )
}

export default ResumeDesignPage