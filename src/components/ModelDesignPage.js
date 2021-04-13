import React, { useState, useContext } from 'react'
import { ModelDesignContext } from './model_design/ModelDesignContext'
import { AppContext } from './AppContext'
import StepProgressItem from './model_design/StepProgressItem'
import ContentLayerSelectionItem from './model_design/ContentLayerSelectionItem';
import ImageInputItem from './model_design/ImageInputItem';
import ParameterSelectionItem from './model_design/ParameterSelectionItem';
import StyleLayerSelectionItem from './model_design/StyleLayerSelectionItem';
import StyleSelectionItem from './model_design/StyleSelectionItem';

export const ModelDesignPage = () => {
    const { design, layers } = useContext(AppContext)

    // selected style image 
    const [ selectedStyleImage, setSelectedStyleImage ] = useState(design.style_image_name)

    // selected content layer 
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
    const [ contentWeight, setContentWeight ] = useState(design.content_weight)
    const [ styleWeight, setStyleWeight ] = useState(design.style_weight)
    const [ numOfIterations, setNumOfIterations ] = useState(design.iterations)
    
    // function to export updated design data
    const jsonifyDesignData = () => {
        return {
            'id': design.id,
            'style_image_name': selectedStyleImage,
            'content_layer': selectedContentLayer,
            'style_layers': {},
            'content_weight': contentWeight,
            'style_weight' : styleWeight,
            'iterations' : numOfIterations
        }
    }

    // setup the step content 
    const imageInput = <ImageInputItem />
    const styleSelection = <StyleSelectionItem />
    const contentLayerSelection = <ContentLayerSelectionItem />
    const styleLayerSelection = <StyleLayerSelectionItem />
    const parameterSelection = <ParameterSelectionItem />

    
    return (
        <ModelDesignContext.Provider value={{
            selectedStyleImage, setSelectedStyleImage,
            selectedContentLayer, setSelectedContentLayer, 
            selectedStyleLayers, setSelectedStyleLayers, 
            styleLayerWeights, setStyleLayerWeight, 
            contentWeight, setContentWeight, 
            styleWeight, setStyleWeight,
            numOfIterations, setNumOfIterations,
            imageInput, 
            styleSelection, 
            contentLayerSelection,
            styleLayerSelection,
            parameterSelection,
            design, layers}}>
            <StepProgressItem />
        </ModelDesignContext.Provider>
    )
}
