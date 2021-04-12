import React, { useContext } from 'react';
import { AppContext } from '../AppContext';
import { ModelDesignContext } from './ModelDesignContext';

const StyleLayerWeight = (props) => {
    return (
        <table className={props.isEnabled ? "style-layer-weight enabled" : "style-layer-weight"} >
            <tbody>
                <tr>
                    <td className="cell-width">
                        <text className="layer-box" onClick={props.onPick} style={{cursor: "pointer"}}>{props.layer}</text>
                    </td>
                    <td>
                        <input className="weight-box" type="text" disabled={!props.isEnabled} value={props.value} onChange={props.onChange}></input>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export const StyleLayerSelectionItem = () => {
    const { design } = useContext(AppContext)
    const { selectedStyleLayers, setSelectedStyleLayers } = useContext(ModelDesignContext)

    const toggleLayer = (layer) => {
        const index = selectedStyleLayers.indexOf(layer)
        if(index === -1) {
            setSelectedStyleLayers([...selectedStyleLayers, layer])
        } else {
            setSelectedStyleLayers(selectedStyleLayers.filter(l => l !== layer))
        }
    }

    return (
        <div className="model-item-container">
            <ModelDesignContext.Consumer>
                {({styleLayerWeights, setStyleLayerWeight}) => (
                    <div>
                        {Object.entries(styleLayerWeights).map(
                            layer => <StyleLayerWeight 
                                className="pad-top-bottom"
                                value={layer[1]} 
                                onChange={(e) => setStyleLayerWeight(layer[0], e.target.value)} 
                                onPick={() => toggleLayer(layer[0])} 
                                isEnabled={selectedStyleLayers.some(l => l === layer[0])} 
                                layer={layer[0]} />)}
                    </div>
                )}
            </ModelDesignContext.Consumer>
        </div>
    )
}

export default StyleLayerSelectionItem
