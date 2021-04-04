import React, { useContext } from 'react';
import { AppContext } from '../AppContext';

export const StyleLayerSelectionItem = () => {
    const design = useContext(AppContext)
    const layers = useContext(AppContext)

    return (
        <div className="model-item-container">
            <AppContext.Consumer>
                {({layers}) => (
                <div className="layer-container">
                    <p>{layers.map(layer => <div className="box-container"><p className="box layer-box">{layer}</p><input className="box weight-box"></input></div>)}</p>
                </div>
                )}
            </AppContext.Consumer>
        </div>
    )
}

export default StyleLayerSelectionItem;
