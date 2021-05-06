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
            <div style={{paddingBottom: "1vh"}}>
                <p className="step-description">Click on one content layer to select it:</p>
            </div>
            <div style={{width: "20vw", margin: "0 auto"}}>
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
        </div> 
    )
}

export default ContentLayerSelectionStep
