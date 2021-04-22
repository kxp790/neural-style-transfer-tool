import React, { useContext } from 'react'
import { ModelDesignContext } from './ModelDesignContext'

const ContentLayer = (props) => {
    return (
        <table className={props.isEnabled ? "parameter-table enabled" : "parameter-table"}>
            <tbody>
                <tr>
                    <td>
                        <p className="name-box content-layer" onClick={props.onPick} style={{cursor: "pointer"}}>{props.layer}</p>
                    </td>
                </tr>
            </tbody>  
        </table>
    )
}

const ContentLayerSelectionStep = () => {
    // context
    const { selectedContentLayer, setSelectedContentLayer } = useContext(ModelDesignContext)

    // update selected content layer
    const toggleLayer = (event) => {
        if(event.target.innerText !== selectedContentLayer) {
            setSelectedContentLayer(event.target.innerText)
        }
    }

    return (
        <div className="model-design-step-container large">
            <h4 style={{textShadow: "1px 1px black"}}>SELECT A CONTENT LAYER:</h4>
            <ModelDesignContext.Consumer>
                {({layers}) => (
                    <div>
                        {layers.map(layer => <ContentLayer 
                            onPick={(event) => toggleLayer(event)}
                            isEnabled={(selectedContentLayer === layer)} 
                            layer={layer}
                            key={layer}
                        />)}
                    </div>
                )}
            </ModelDesignContext.Consumer>
        </div> 
    )
}

export default ContentLayerSelectionStep
