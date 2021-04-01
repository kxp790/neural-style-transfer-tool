import React, { useContext } from 'react';
import { AppContext } from './AppContext';

const ContentLayerSelectionItem = () => {
    const design = useContext(AppContext)
    const layers = useContext(AppContext)

    return (
        <AppContext.Consumer>
            {({layers}) => (
            <div >
                <p>{layers.map(layer => <p>{layer}</p>)}</p>
            </div>
            )}
        </AppContext.Consumer>
    )
}

export default ContentLayerSelectionItem
