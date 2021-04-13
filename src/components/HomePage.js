import React, { useContext } from 'react';
import { withRouter, Link } from 'react-router-dom'; 
import axios from 'axios';
import { AppContext } from './AppContext';

export const HomePage = ({ history }) => {

    const { setDesign } = useContext(AppContext)

    async function makeNewDesign () {
        history.push('/new_design')

        axios.get('http://localhost:5000/create_design', {
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            }
        })
        .then(function (response) {
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
