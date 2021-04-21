import React from 'react'
import { ModelDesignContext } from './ModelDesignContext'

const Parameter = (props) => {
    return (
        <table className="parameter-table">
            <tbody>
                <tr>
                    <td className="cell-width">
                        <p className="name-box">{props.name}</p>
                    </td>
                    <td>
                        <input className={(/^[1-9][0-9]?$|^100$/).test(props.value) ? "weight-box" : "weight-box invalid"} value={props.value} onChange={props.onChange} type="text" maxLength={props.maxLength} pattern={props.pattern} required></input>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        {!(/^[1-9][0-9]?$|^100$/).test(props.value) ? <p>Allowed range: 1-100</p> : <p></p>}
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

const ParameterSelectionItem = () => {
    
    return (
        <div className="model-item-container small">
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
