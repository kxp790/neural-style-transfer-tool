import React from 'react'
import PinForm from './PinForm';
import { AppContext } from './AppContext';

const NewDesignPage = () => {

    const savePin = () => {

    }

    return(
        <div className="pad-block">
            <AppContext.Consumer>
                {({designId}) => (
                    <>
                        <h4>YOUR DESIGN ID:</h4>
                        <h1 className="input-text-box">{designId}</h1>
                        <h4>CHOOSE A PIN:</h4>
                        <PinForm />
                        <input type="submit" to="/model" className="button button2" value="Continue" onClick={savePin} />
                    </>
                )}
            </AppContext.Consumer>
        </div>
    )
}

export default NewDesignPage