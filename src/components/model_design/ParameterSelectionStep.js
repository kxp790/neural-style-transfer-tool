import React from 'react'
import { ModelDesignContext } from './ModelDesignContext'

const Parameter = (props) => {
    return (
        <table className="parameter-table">
            <tbody>
                <tr>
                    <td style={{width: "20vw"}}>
                        <p className="name-box parameter">{props.name}</p>
                    </td>
                    <td style={{width: "18vw", alignContent: "left", display: "flex"}}>
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

const ParameterSelectionStep = () => {
    
    return (
        <div className="model-design-step-container small">
            <h4 style={{textShadow: "1px 1px black"}}>CUSTOMISE PARAMETERS:</h4>
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

export default ParameterSelectionStep
