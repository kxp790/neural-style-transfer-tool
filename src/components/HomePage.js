import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import { AppContext } from './AppContext';

export const HomePage = () => {

    const {setDesignId} = useContext(AppContext)

    async function makeNewDesign () {
        axios.get('http://localhost:5000/create_design', {}, {
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            }
        })
        .then(function (response) {
            console.log(response.data)
            setDesignId(response.data.id)
        })
    }

    return(
        <div className="pad-block">
            <Link to="/new_design" className="button button1" onClick={makeNewDesign}>Start</Link>
            <p className="pad-text">OR</p>
            <Link to="/resume_design" className="button button2">Continue</Link>
        </div>
    )
}

export default HomePage
