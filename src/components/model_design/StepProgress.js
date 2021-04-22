import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { ProgressBar, Step } from 'react-step-progress-bar'
import "react-step-progress-bar/styles.css"
import { AppContext } from '../AppContext'
import ContentLayerSelectionStep from './ContentLayerSelectionStep'
import ImageUploadStep from './ImageUploadStep'
import { ModelDesignContext } from './ModelDesignContext'
import ParameterSelectionStep from './ParameterSelectionStep'
import StyleLayerSelectionStep from './StyleLayerSelectionStep'
import StyleSelectionStep from './StyleSelectionStep'

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

const StepProgress = (props) => {
    // context
    const { design, setDesign, setHasResult } = useContext(AppContext)
    const { layers, hasSelectedContentImage, selectedStyleImage, selectedContentLayer, selectedStyleLayers, styleLayerWeights, 
        contentWeight, styleWeight, numOfIterations } = useContext(ModelDesignContext)

    // list of steps in step progress
    const steps = [
        <ImageUploadStep />,
        <StyleSelectionStep />,
        <ContentLayerSelectionStep />,
        <StyleLayerSelectionStep />,
        <ParameterSelectionStep />
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
        // return hasSelectedContentImage
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
        if(selectedStyleLayers.length !== 5) return false
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

    // function to submit data inserted during step progress and and redirect to results 
    const submitForm = async () => {
        setHasResult(false)
        props.history.push('/result')
        
        var styleLayers = {}
        selectedStyleLayers.forEach(function (layer) {
            styleLayers[layer] = styleLayerWeights[layer]
        })

        axios.post('http://localhost:5000/update_design', {
            design_id: design.id,
            style_image_name : selectedStyleImage,
            content_layer: selectedContentLayer,
            style_layers: styleLayers,
            content_weight: contentWeight,
            style_weight: styleWeight,
            iterations: numOfIterations
        }, {
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            }
        }).then((response) => {
            delete response.data['_id']
            setDesign(response.data)

            axios.get('http://localhost:5000/style_transfer/' + design.id, {
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
                }
            }).then((response) => {
                setHasResult(true)
            }).catch((error) => console.log(error))
        }).catch((error) => console.log(error))
    }
    
    // progress bar component
    const progressBar = () => {
        return (
            <ProgressBar percent={currentStep / 4 * 100} filledBackground="linear-gradient(to right, #00a5a7, #00a5a7)">
                <Step>
                    {({ accomplished }) => (
                        <ProgressStep number={1} text="Content Image" accomplished={accomplished} />
                    )}
                </Step>
                <Step>
                    {({ accomplished }) => (
                        <ProgressStep number={2} text="Style Image" accomplished={accomplished} />
                    )}
                </Step>
                <Step>
                    {({ accomplished }) => (
                        <ProgressStep number={3} text="Content Layer" accomplished={accomplished} />
                    )}
                </Step>
                <Step>
                    {({ accomplished }) => (
                        <ProgressStep number={4} text="Style Layers" accomplished={accomplished} />
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

export default withRouter(StepProgress)
