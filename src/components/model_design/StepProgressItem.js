import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { ProgressBar, Step } from 'react-step-progress-bar'
import "react-step-progress-bar/styles.css"
import { AppContext } from '../AppContext'
import ContentLayerSelectionItem from './ContentLayerSelectionItem'
import ImageInputItem from './ImageInputItem'
import { ModelDesignContext } from './ModelDesignContext'
import ParameterSelectionItem from './ParameterSelectionItem'
import StyleLayerSelectionItem from './StyleLayerSelectionItem'
import StyleSelectionItem from './StyleSelectionItem'

const ProgressStep = (props) => {
    return (
        <div className="step-container">
            <div className={props.accomplished ? "progress-step filled" : "progress-step"}>
                {props.number}
            </div>
            <div className="progress-label">
                {props.text}
            </div>
        </div>
    )
}

const StepProgressItem = (props) => {
    // context
    const { design } = useContext(AppContext)
    const { layers, selectedStyleImage, selectedContentLayer, selectedStyleLayers, styleLayerWeights, 
        contentWeight, styleWeight, numOfIterations } = useContext(ModelDesignContext)

    // list of steps in step progress
    const steps = [
        <ImageInputItem />,
        <StyleSelectionItem />,
        <ContentLayerSelectionItem />,
        <StyleLayerSelectionItem />,
        <ParameterSelectionItem />
    ]
    
    // keep track of step 
    const [ currentStep, setCurrentStep ] = useState(0)

    // progress step if inputs pass validation, on last step
    const progressStep = () => {
        if(validation[currentStep]()) {
            (currentStep < 4) ? setCurrentStep(currentStep + 1) : submitForm()
        } 
    }

    // regress step if there exists a previous step
    const regressStep = () => {
        if(currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    // image input step validator
    // true if image exists in database
    const imageInputValidator = () => {
        // TODO - check api whether image with design_id is in folder
        return true
    }

    // style image selection step validator
    // true if selection is not empty
    const styleSelectionValidator = () => {
        return (selectedStyleImage !== '') ? true : false
    }
    
    // content layer selection step validator
    // true if an existing layer is selected
    const contentLayerSelectionValidator = () =>  {
        return (layers.indexOf(selectedContentLayer) >= 0) ? true : false
    }
    
    // style layer selection step validator
    // true if at least one layer is selected and weight value is larger than 0 and smaller than 1
    const styleLayerSelectionValidator = () => {
        if(selectedStyleLayers.length === 0) return false
        for (let layer in selectedStyleLayers) {
            if(styleLayerWeights[selectedStyleLayers[layer]] <= 0 || styleLayerWeights[selectedStyleLayers[layer]] >= 1) return false
        }
        return true
    }

    // other parameters step validator
    // true if all values are larger than 0 and smaller than 100
    const parameterSelectionValidator = () => {
        return ((/^[1-9][0-9]?$|^100$/).test(contentWeight)
            && (/^[1-9][0-9]?$|^100$/).test(styleWeight)
            && (/^[1-9][0-9]?$|^100$/).test(numOfIterations)) ? true : false
    }

    // list of validation steps
    const validation = [
        imageInputValidator,
        styleSelectionValidator,
        contentLayerSelectionValidator,
        styleLayerSelectionValidator,
        parameterSelectionValidator
    ]

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

    // function to submit form and progress to results
    const submitForm = async () => {
        props.history.push('/result')
        console.log(jsonifyDesignData)
        axios.get('http://localhost:5000/style_transfer/' + design.id, {
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            }
        }).then(x => console.log("Design updated"))
    }
    
    // progress bar component
    const progressBar = () => {
        return (
            <ProgressBar percent={currentStep / 4 * 100} filledBackground="linear-gradient(to right, #00a5a7, #00a5a7)">
                <Step>
                    {({ accomplished }) => (
                        <ProgressStep number={1} text="Upload Image" accomplished={accomplished} />
                    )}
                </Step>
                <Step>
                    {({ accomplished }) => (
                        <ProgressStep number={2} text="Select Style" accomplished={accomplished} />
                    )}
                </Step>
                <Step>
                    {({ accomplished }) => (
                        <ProgressStep number={3} text="Select Content Layer" accomplished={accomplished} />
                    )}
                </Step>
                <Step>
                    {({ accomplished }) => (
                        <ProgressStep number={4} text="Select Style Layers" accomplished={accomplished} />
                    )}
                </Step>
                <Step>
                    {({ accomplished }) => (
                        <ProgressStep number={5} text="Other Parameters" accomplished={accomplished} />
                    )}
                </Step>
            </ProgressBar>
        )
    }

    return (
        <div className="model-design">
            <button onClick={regressStep}><FontAwesomeIcon icon={faAngleLeft} /></button>
            <div className="content">
            <div className="progress-bar-container">
                {progressBar()}   
            </div>
                {steps[currentStep]}
            </div>
            <button onClick={progressStep}><FontAwesomeIcon icon={faAngleRight} /></button>
        </div>
    )
}

export default withRouter(StepProgressItem)
