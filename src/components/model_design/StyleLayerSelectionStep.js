import React, { useContext } from 'react'
import { ModelDesignContext } from './ModelDesignContext'

const StyleLayerWeight = (props) => {
    return (
        <table className={props.isEnabled ? "parameter-table enabled" : "parameter-table"} >
            <tbody>
                <tr>
                    <td>
                        <p className="name-box" onClick={props.onPick} style={{cursor: "pointer"}}>{props.layer}</p>
                    </td>
                    <td>
                        <input className="weight-box" type="text" disabled={!props.isEnabled} value={props.value} onChange={props.onChange}></input>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

const StyleLayerSelectionStep = () => {
    const { selectedStyleLayers, setSelectedStyleLayers } = useContext(ModelDesignContext)

    const toggleLayer = (layer) => {
        if(selectedStyleLayers.indexOf(layer) === -1) {
            setSelectedStyleLayers([...selectedStyleLayers, layer])
        } else {
            setSelectedStyleLayers(selectedStyleLayers.filter(l => l !== layer))
        }
    }

    return (
        <div className="model-design-step-container large">
            <div style={{paddingBottom: "1vh"}}>
                <p className="step-description">Select at least one style layer by clicking on it and enter a value above 0 and below 1 for its weight:</p>
            </div>
            <ModelDesignContext.Consumer>
                {({styleLayerWeights, setStyleLayerWeight}) => (
                    <div>
                        {Object.entries(styleLayerWeights).map(layer => <StyleLayerWeight 
                            style={{padding: "0.5vh 0vh"}}
                            value={layer[1]} 
                            onChange={(e) => setStyleLayerWeight(layer[0], e.target.value)} 
                            onPick={() => toggleLayer(layer[0])} 
                            isEnabled={selectedStyleLayers.some(l => l === layer[0])} 
                            layer={layer[0]} 
                            key={layer[0]}
                        />)}
                    </div>
                )}
            </ModelDesignContext.Consumer>
        </div>
    )
}

export default StyleLayerSelectionStep
