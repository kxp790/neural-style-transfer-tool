import React, { useContext } from 'react';
import { AppContext } from '../AppContext';

export const StyleLayerSelectionItem = () => {
    const design = useContext(AppContext)
    const layers = useContext(AppContext)

    return (
        <div className="model-item-container">
            <AppContext.Consumer>
                {({layers}) => (
                <div >
                    <p>{layers.map(layer => <p>{layer}</p>)}</p>
                </div>
                )}
            </AppContext.Consumer>
        </div>
    )
}

export default StyleLayerSelectionItem;
