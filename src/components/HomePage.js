import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
// import APIClient from '../apiClient';
import axios from 'axios';

export const HomePage = () => {

    const [designId, setDesignId] = useState(); 
    // const [client, setClient] = useState();

    // useEffect(() => {
    //     setClient(new APIClient());
    // }, [])
    
    // const makeNewDesign = () => {
    //     const id = 'asdfafegaeg'
    //     this.apiClient.createDesign().then((data) =>
    //         setDesignId({...this.state, kudos: data})
    //     );
    // }

    async function makeNewDesign () {
        axios.get('http://localhost:5000/create_design', {})
        .then(function (response) {
            console.log(response)
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
