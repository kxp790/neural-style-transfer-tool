import React, { useState, useContext } from 'react'
import { ModelDesignContext } from './model_design/ModelDesignContext'
import { AppContext } from './AppContext'
import StepFunctionItem from './model_design/StepProgressItem'

export const ModelDesignPage = () => {
    const { design, layers } = useContext(AppContext)

    var initialWeights = {}
    layers.forEach (layer => {
        initialWeights[layer] = '0.1'
    })
    
    Object.entries(design.style_layers).forEach(weight => {
        initialWeights[weight[0]] = weight[1]
    });
    
    const [ styleLayerWeights, setStyleLayerWeights ] = useState(initialWeights)
    const [ selectedStyleLayers, setSelectedStyleLayers ] = useState(Object.keys(design.style_layers))
    const [ selectedContentLayer, setSelectedContentLayer ] = useState(design.content_layer)
    
    const setStyleLayerWeight = (layer, weight) => {
        setStyleLayerWeights({
            ...styleLayerWeights,
            [layer]: weight
        })
    }
    
    return (
        <ModelDesignContext.Provider value={{selectedStyleLayers, setSelectedStyleLayers, selectedContentLayer, setSelectedContentLayer, styleLayerWeights, setStyleLayerWeight, design, layers}}>
            <StepFunctionItem />
        </ModelDesignContext.Provider>
    )
}
