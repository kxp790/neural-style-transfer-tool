import axios from 'axios'
import React, { useContext } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { AppContext } from './AppContext'

const HomePage = ({ history }) => {
    // context
    const { setDesign } = useContext(AppContext)

    // function to call api to make a new design, load it into context and and redirects to model
    async function makeNewDesign () {
        history.push('/new_design')
        axios.get('http://localhost:5000/create_design', {
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            }
        }).then(function (response) {
            delete response.data['_id']
            console.log(response.data)
            setDesign(response.data)
        })
    }

    return(
        <div className="pad-block">
            <button className="button button1" onClick={makeNewDesign}>Start</button>
            <p className="pad-sides">OR</p>
            <Link to="/resume_design" className="button button2">Continue</Link>
        </div>
    )
}

export default withRouter(HomePage)
