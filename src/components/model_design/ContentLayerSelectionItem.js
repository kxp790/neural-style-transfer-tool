import React, { useContext } from 'react';
import { ModelDesignContext } from './ModelDesignContext';

const ContentLayer = (props) => {
    return (
        <table className={props.isEnabled ? "content-layer enabled" : "content-layer"}>
            <tbody>
                <tr>
                    <td>
                        <text className="layer-box" onClick={props.onPick}>{props.layer}</text>
                    </td>
                </tr>
            </tbody>  
        </table>
    )
}

const ContentLayerSelectionItem = () => {
    const { selectedContentLayer, setSelectedContentLayer } = useContext(ModelDesignContext)
    
    const toggleLayer = (event) => {
        if(event.target.innerText !== selectedContentLayer) {
            setSelectedContentLayer(event.target.innerText)
        }
    }

    return (
        <div className="model-item-container">
            <ModelDesignContext.Consumer>
                {({layers}) => (
                    <div>
                        {layers.map(layer => <ContentLayer 
                            onPick={(event) => toggleLayer(event)}
                            isEnabled={(selectedContentLayer === layer)} 
                            layer={layer} />)}
                    </div>
                )}
            </ModelDesignContext.Consumer>
        </div> 
    )
}

export default ContentLayerSelectionItem
