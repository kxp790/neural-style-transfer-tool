import React, { useContext } from 'react';
import { AppContext } from './AppContext';

const ContentLayerSelectionItem = () => {
    const design = useContext(AppContext)
    const layers = useContext(AppContext)

    return (
        <div className="model-item-container">
            <br></br>
            <AppContext.Consumer>
                {({layers}) => (
                    <div>
                        {layers.map(layer => <p className="layer-text-box">{layer}</p>)}
                    </div>
                )}
            </AppContext.Consumer>
        </div> 
    )
}

export default ContentLayerSelectionItem
