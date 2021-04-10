import React, { useState, useContext } from 'react'
import { ModelDesignContext } from './model_design/ModelDesignContext'
import { AppContext } from './AppContext'
import StepFunctionItem from './model_design/StepFunctionItem'

export const ModelDesignPage = () => {
    const { design, layers } = useContext(AppContext)

    var initialWeights = {}
    layers.forEach (layer => {
        initialWeights[layer] = '0.1'
    })
    Object.entries(design.style_layers).forEach(weight => {
        initialWeights[weight.key] = weight.value
    });

    const [ styleLayerWeights, setStyleLayerWeights ] = useState(initialWeights)
    const [ selectedLayers, setSelectedLayers ] = useState(Object.keys(design.style_layers))

    const setStyleLayerWeight = (layer, weight) => {
        setStyleLayerWeights({
            ...styleLayerWeights,
            [layer]: weight
        })
    }

    return (
        <ModelDesignContext.Provider value={{selectedLayers, setSelectedLayers, styleLayerWeights, setStyleLayerWeight}}>
            <StepFunctionItem />
        </ModelDesignContext.Provider>
    )
}
