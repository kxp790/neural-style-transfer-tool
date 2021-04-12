import React, { useState, useContext } from 'react'
import { ModelDesignContext } from './model_design/ModelDesignContext'
import { AppContext } from './AppContext'
import StepProgressItem from './model_design/StepProgressItem'

export const ModelDesignPage = () => {
    const { design, layers } = useContext(AppContext)

    // content layer selection item variables
    const [ selectedContentLayer, setSelectedContentLayer ] = useState(design.content_layer)

    // style layer selection item variables
    var initialWeights = {}
    layers.forEach (layer => {
        initialWeights[layer] = '0.1'
    })
    Object.entries(design.style_layers).forEach(weight => {
        initialWeights[weight[0]] = weight[1]
    });
    const [ styleLayerWeights, setStyleLayerWeights ] = useState(initialWeights)
    const [ selectedStyleLayers, setSelectedStyleLayers ] = useState(Object.keys(design.style_layers))
    const setStyleLayerWeight = (layer, weight) => {
        setStyleLayerWeights({
            ...styleLayerWeights,
            [layer]: weight
        })
    }

    // other parameters variables
    const [ contentWeight, setContentWeight ] = useState(Object.keys(design.content_weight))
    const [ styleWeight, setStyleWeight ] = useState(Object.keys(design.style_weight))
    const [ numOfIterations, setNumOfIterations ] = useState(Object.keys(design.iterations))
    
    return (
        <ModelDesignContext.Provider value={{
            selectedStyleLayers, setSelectedStyleLayers, 
            selectedContentLayer, setSelectedContentLayer, 
            styleLayerWeights, setStyleLayerWeight, 
            contentWeight, setContentWeight, 
            styleWeight, setStyleWeight,
            numOfIterations, setNumOfIterations,
            design, layers}}>
            <StepProgressItem />
        </ModelDesignContext.Provider>
    )
}
