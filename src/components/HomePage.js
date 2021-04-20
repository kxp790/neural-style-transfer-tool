import React, { useContext } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { AppContext } from './AppContext'

const HomePage = ({ history }) => {
    // context
    const { setDesign } = useContext(AppContext)

    return(
        <div style={{paddingTop: "20vh"}}>
            <Link to="/new_design" className="button button1">Start</Link>
            <p style={{padding: "0vh 1vh", display: "inline"}}>OR</p>
            <Link to="/resume_design" className="button button2">Continue</Link>
        </div>
    )
}

export default withRouter(HomePage)
