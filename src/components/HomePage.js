import React from 'react';
import { Link } from 'react-router-dom';

function  HomePage() {
    return(
        <div>
            <Link to="/model" className="btn">GO</Link>
        </div>
    )  
}

export default HomePage
