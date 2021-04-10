import React from 'react'
import { withRouter } from 'react-router-dom'
import PinForm from './PinForm';
import { AppContext } from './AppContext';
import PropogateLoader from 'react-spinners/PropagateLoader'

const NewDesignPage = (props) => {

    const savePin = () => {
        props.history.push("/model")
    }

    return(
        <div className="pad-block">
            <AppContext.Consumer>
                {({design}) => (
                    design == null ? <PropogateLoader /> :
                    <>
                        <h4>YOUR DESIGN ID:</h4>
                        <h1 className="input-text-box">{design.id}</h1>
                        <h4>CHOOSE A PIN:</h4>
                        <PinForm />
                        <input type="submit" to="/model" className="button button2" value="Continue" onClick={savePin} />
                    </>
                )}
            </AppContext.Consumer>
        </div>
    )
}

export default withRouter(NewDesignPage)