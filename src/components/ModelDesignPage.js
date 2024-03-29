import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router'
import { AppContext } from './AppContext'
import { ModelDesignContext } from './model_design/ModelDesignContext'
import StepProgress from './model_design/StepProgress'

const ModelDesignPage = () => {
    const location = useLocation()

    // context
    const { design } = useContext(AppContext)

    // list of editable convolutional layers in the network
    const layers = [
        'block1_conv1', 'block1_conv2', 
        'block2_conv1', 'block2_conv2', 
        'block3_conv1', 'block3_conv2', 'block3_conv3', 'block3_conv4', 
        'block4_conv1', 'block4_conv2', 'block4_conv3', 'block4_conv4', 
        'block5_conv1', 'block5_conv2', 'block5_conv3', 'block5_conv4'
    ]

    // whether the user has uploaded a content image
    const [ hasSelectedContentImage, setHasSelectedContentImage ] = useState(location.state.isResuming)

    // selected style image 
    const [ selectedStyleImage, setSelectedStyleImage ] = useState(design.style_image_name)

    // selected content layer 
    const [ selectedContentLayer, setSelectedContentLayer ] = useState(design.content_layer)

    // selected style layers and weights
    var initialWeights = {}
    layers.forEach (layer => {
        initialWeights[layer] = '0.1'
    })
    Object.entries(design.style_layers).forEach(weight => {
        initialWeights[weight[0]] = weight[1].toString()
    })
    const [ styleLayerWeights, setStyleLayerWeights ] = useState(initialWeights)
    const [ selectedStyleLayers, setSelectedStyleLayers ] = useState(Object.keys(design.style_layers))
    const setStyleLayerWeight = (layer, weight) => {
        if(weight === '0.' || weight > 0) {
            setStyleLayerWeights({
                ...styleLayerWeights,
                [layer]: weight
            })
        } else {
            setStyleLayerWeights({
                ...styleLayerWeights,
                [layer]: 0
            })
        }
    }
    
    // other parameters
    const [ contentWeight, setContentWeight ] = useState(design.content_weight)
    const [ styleWeight, setStyleWeight ] = useState(design.style_weight)
    const [ numOfIterations, setNumOfIterations ] = useState(design.iterations)

    return (
        <ModelDesignContext.Provider value={{
            hasSelectedContentImage, setHasSelectedContentImage,
            selectedStyleImage, setSelectedStyleImage,
            selectedContentLayer, setSelectedContentLayer, 
            selectedStyleLayers, setSelectedStyleLayers, 
            styleLayerWeights, setStyleLayerWeight, 
            contentWeight, setContentWeight, 
            styleWeight, setStyleWeight,
            numOfIterations, setNumOfIterations, 
            design, layers}}>
            <StepProgress />
        </ModelDesignContext.Provider>
    )
}

export default ModelDesignPage