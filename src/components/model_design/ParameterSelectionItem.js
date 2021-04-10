import React, { useContext } from 'react';
import { AppContext } from '../AppContext';

const ParameterSelectionItem = () => {
    const design = useContext(AppContext)

    return (
        <div>
            <br></br>
            <p>Content weight</p>
            <p>Style Weight</p>
            <p>Number of iterations</p>
        </div>
    )
}

export default ParameterSelectionItem
