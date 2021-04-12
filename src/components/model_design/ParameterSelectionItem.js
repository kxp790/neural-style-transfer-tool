import React from 'react';
import { ModelDesignContext } from './ModelDesignContext';

const Parameter = (props) => {
    return (
        <table className="style-layer-weight">
            <tbody>
                <tr>
                    <td className="cell-width">
                        <text className="layer-box" style={{cursor: "pointer"}}>{props.name}</text>
                    </td>
                    <td>
                        <input className="weight-box" type="text" value={props.value} onChange={props.onChange}></input>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

const ParameterSelectionItem = () => {
    return (
        <div className="model-item-container">
            <ModelDesignContext.Consumer>
                {({contentWeight, setContentWeight, styleWeight, setStyleWeight, numOfIterations, setNumOfIterations}) => (
                    <div>
                        <Parameter name="Content weight" value={contentWeight} onChange={(event) => setContentWeight(event.target.value)} />
                        <Parameter name="Style weight" value={styleWeight} onChange={(event) => setStyleWeight(event.target.value)} />
                        <Parameter name="Number of iterations" value={numOfIterations} onChange={(event) => setNumOfIterations(event.target.value)} />
                    </div>
                )}
            </ModelDesignContext.Consumer>
        </div>
    )
}

export default ParameterSelectionItem
