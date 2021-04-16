import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import "react-step-progress-bar/styles.css";
import axios from 'axios';
import { AppContext } from '../AppContext';
import { ModelDesignContext } from './ModelDesignContext';
import ImageInputItem from './ImageInputItem';
import ContentLayerSelectionItem from './ContentLayerSelectionItem';
import ParameterSelectionItem from './ParameterSelectionItem';
import StyleLayerSelectionItem from './StyleLayerSelectionItem';
import StyleSelectionItem from './StyleSelectionItem';
import { ProgressBar, Step } from 'react-step-progress-bar'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
  
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

    //stage stuff
    const [ currentStage, setCurrentStage ] = useState(0)

    const regressStage = () => {
        if(currentStage > 0) {
            setCurrentStage(currentStage - 1)
        }
    }

    const progressStage = () => {
        if(validation[currentStage]()) {
            setCurrentStage(currentStage + 1)
        }
    }

    //context
    const { design } = useContext(AppContext)
    const { selectedStyleImage, selectedContentLayer } = useContext(ModelDesignContext)
    
    const imageInputValidator = () => {
        return true
    }

    // setup step validators, will be called before proceeding to the next step
    const styleSelectionValidator = () => {
        console.log(selectedStyleImage)
        return (selectedStyleImage !== '') ? true : false
    }
    
    const contentLayerSelectionValidator = () =>  {
        console.log(selectedContentLayer)
        
        return true
    }
    
    const styleLayerSelectionValidator = () => {
        return true
    }

    const parameterSelectionValidator = () => {
        return true
    }

    const stages = [
        <ImageInputItem />,
        <StyleSelectionItem />,
        <ContentLayerSelectionItem />,
        <StyleLayerSelectionItem />,
        <ParameterSelectionItem />
    ]

    const validation = [
        imageInputValidator,
        styleSelectionValidator,
        contentLayerSelectionValidator,
        styleLayerSelectionValidator,
        parameterSelectionValidator
    ]

    const onFormSubmit = async () => {
        // submit logic when "submit" is pressed
        
        props.history.push('/result')
        axios.get('http://localhost:5000/style_transfer/' + design.id, {
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            }
        }).then(x => console.log("Design updated"))
    }
    
    const progressBar = () => {
        return (<ProgressBar
                    percent={currentStage / 4 * 100}
                    filledBackground="linear-gradient(to right, #00a5a7, #00a5a7)"
                >
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
                        <ProgressStep number={4} text="Select Style Layer" accomplished={accomplished} />
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

    // render the progress bar
    return (
        <div className="model-design">
            <button onClick={regressStage}><FontAwesomeIcon icon={faAngleLeft} /></button>
            <div className="content">
            <div className="progress-bar-container">
                {progressBar()}   
            </div>
                {stages[currentStage]}
            </div>
            <button onClick={progressStage}><FontAwesomeIcon icon={faAngleRight} /></button>
        </div>
    )
}

export default withRouter(StepProgressItem)
