import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';
import axios from 'axios';
import { AppContext } from '../AppContext';

import ContentLayerSelectionItem from './ContentLayerSelectionItem';
import ImageInputItem from './ImageInputItem';
import ParameterSelectionItem from './ParameterSelectionItem';
import StyleLayerSelectionItem from './StyleLayerSelectionItem';
import StyleSelectionItem from './StyleSelectionItem';

 
const StepFunctionItem = (props) => {
    const {design} = useContext(AppContext)
    
    // setup the step content
    const imageInput = <ImageInputItem />
    const styleSelection = <StyleSelectionItem />
    const contentLayerSelection = <ContentLayerSelectionItem />
    const styleLayerSelection = <StyleLayerSelectionItem />
    const parameterSelection = <ParameterSelectionItem />
    
    // setup step validators, will be called before proceeding to the next step
    const styleSelectionValidator = () => {
        return true
    }
    
    const contentLayerSelectionValidator = () =>  {
        return true
    }
    
    const styleLayerSelectionValidator = () => {
        return true
    }

    const parameterSelectionValidator = () => {
        return true
    }
    
    const onFormSubmit = async () => {
        // submit logic when "submit" is pressed
        axios.get('http://localhost:5000/update_design', {}, {
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            }
        })
        .then(function (response) {
            if(response.data == '200') {
                props.history.push('/result')
                axios.get('http://localhost:5000/style_transfer/' + design.id, {}, {
                    headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:3000'
                    }
                }).then(x => console.log("New design saved"))
            } else {
                console.log("New design save unsuccessful")
            }
        })
    }
    
    // render the progress bar
    return (
        <StepProgressBar
        startingStep={0}
        onSubmit={onFormSubmit}
        steps={[
            {
            label: 'Image Upload',
            name: 'step 1',
            content: imageInput
            },
            {
            label: 'Select Style Image',
            name: 'step 2',
            content: styleSelection,
            validator: styleSelectionValidator
            },
            {
            label: 'Select Content Layer',
            name: 'step 3',
            content: contentLayerSelection,
            validator: contentLayerSelectionValidator
            },
            {
            label: 'Select Style Layers',
            name: 'step 4',
            content: styleLayerSelection,
            validator: styleLayerSelectionValidator
            },
            {
            label: 'Other Parameters',
            name: 'step 5',
            content: parameterSelection,
            validator: parameterSelectionValidator
            }
        ]}/>
    )
}

export default withRouter(StepFunctionItem)
