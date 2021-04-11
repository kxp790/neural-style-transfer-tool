import React, { useContext, useState } from 'react';
import { ModelDesignContext } from './ModelDesignContext';

const ContentLayer = (props) => {
    const [ isEnabled, setIsEnabled ] = useState(false)

    return (
        <table className={props.isEnabled ? "content-layer enabled" : "content-layer"}>
            <tr>
                <td>
                    <text className="layer-box" onClick={props.onPick}>{props.layer}</text>
                </td>
            </tr>
        </table>
    )
}

const ContentLayerSelectionItem = () => {
    const [isEnabled, setIsEnabled] = useState(false)
    const {selectedContentLayer, setSelectedContentLayer} = useContext(ModelDesignContext)
    
    const toggleLayer = (event) => {
        if(event.target.innerText != selectedContentLayer) {
            setSelectedContentLayer(event.target.innerText)
        }
    }

    console.log("SelectedContentLayer")
    console.log(selectedContentLayer)

    return (
        <div className="model-item-container">
            <ModelDesignContext.Consumer>
                {({layers}) => (
                    <div>
                        {layers.map(layer => <ContentLayer 
                            onPick={(event) => toggleLayer(event)}
                            isEnabled={(selectedContentLayer == layer)} 
                            layer={layer} />)}
                    </div>
                )}
            </ModelDesignContext.Consumer>
        </div> 
    )
}

export default ContentLayerSelectionItem
