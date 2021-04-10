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
    
    console.log("initialWeights:")
    console.log(initialWeights)
    
    Object.entries(design.style_layers).forEach(weight => {
        initialWeights[weight[0]] = weight[1]
    });
    console.log("initialWeights:")
    console.log(initialWeights)

    const [ styleLayerWeights, setStyleLayerWeights ] = useState(initialWeights)
    const [ selectedStyleLayers, setSelectedStyleLayers ] = useState(Object.keys(design.style_layers))
    const [ selectedContentLayer, setSelectedContentLayer ] = useState(design.content_layer)
    console.log("ModelDesignPage making things happen:")
    console.log("styleLayerWeights:")
    console.log(styleLayerWeights)
    console.log("selectedStyleLayers:")
    console.log(selectedStyleLayers)
    console.log("selectedContentLayer:")
    console.log(selectedContentLayer)

    const setStyleLayerWeight = (layer, weight) => {
        setStyleLayerWeights({
            ...styleLayerWeights,
            [layer]: weight
        })
    }
    console.log("StyleLayerWeights:")
    console.log(styleLayerWeights)

    return (
        <ModelDesignContext.Provider value={{selectedStyleLayers, setSelectedStyleLayers, selectedContentLayer, setSelectedContentLayer, styleLayerWeights, setStyleLayerWeight, design, layers}}>
            <StepFunctionItem />
        </ModelDesignContext.Provider>
    )
}
