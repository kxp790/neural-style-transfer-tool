import React, { useContext, useState } from 'react';
import { AppContext } from '../AppContext';
import { ModelDesignContext } from './ModelDesignContext';

const StyleLayerWeight = (props) => {
    const [ isEnabled, setIsEnabled ] = useState(false)

    return (
        <table className={props.isEnabled ? "layer-weight enabled" : "layer-weight"}>
            <tr>
                <td>
                <p onClick={props.onPick} style={{cursor: "pointer"}}>{props.layer}</p>
                </td>

                <td>
                <input className="input-text-box" type="text" disabled={!props.isEnabled} value={props.value} onChange={props.onChange}></input>
                </td>
            </tr>
            
        </table>
    )
}

export const StyleLayerSelectionItem = () => {
    const {design} = useContext(AppContext)
    const { selectedLayers, setSelectedLayers } = useContext(ModelDesignContext)

    const toggleLayer = (layer) => {
        const index = selectedLayers.indexOf(layer)
        if(index == -1) {
            setSelectedLayers([...selectedLayers, layer])
        } else {
            setSelectedLayers(selectedLayers.filter(l => l != layer))
        }
    }

    return (
        <div className="model-item-container">
            <ModelDesignContext.Consumer>
                {({styleLayerWeights, setStyleLayerWeight}) => (
                <div>
                    {Object.entries(styleLayerWeights).map(
                        layer => <StyleLayerWeight value={layer[1]} 
                            onChange={(e) => setStyleLayerWeight(layer[0], e.target.value)} 
                            onPick={() => toggleLayer(layer[0])} 
                            isEnabled={selectedLayers.some(l => l == layer[0])} 
                            layer={layer[0]} />)}
                </div>
                )}
            </ModelDesignContext.Consumer>
        </div>
    )
}

export default StyleLayerSelectionItem
