import React, { useContext } from 'react';
import { AppContext } from './AppContext';
import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';

import ContentLayerSelectionItem from './ContentLayerSelectionItem';
import ImageInputItem from './ImageInputItem';
import ParameterSelectionItem from './ParameterSelectionItem';
import StyleLayerSelectionItem from './StyleLayerSelectionItem';
import StyleSelectionItem from './StyleSelectionItem';
 
const ModelDesignPage = () => {
    const design = useContext(AppContext);
    console.log(design)
    
    // setup the step content
    const imageInput = <ImageInputItem />;
    const contentLayerSelection = <ContentLayerSelectionItem />;
    const styleLayerSelection = <StyleLayerSelectionItem />;
    const styleSelection = <StyleSelectionItem />;
    const parameterSelection = <ParameterSelectionItem />;
    
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
    
    const onFormSubmit = () => {
        // submit logic when "submit" is pressed
        window.location.replace('http://localhost:3000/result');
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
            label: 'Style Selection',
            name: 'step 2',
            content: styleSelection,
            validator: styleSelectionValidator
            },
            {
            label: 'Content Layer Selection',
            name: 'step 3',
            content: contentLayerSelection,
            validator: contentLayerSelectionValidator
            },
            {
            label: 'Style Layers Selection',
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

export default ModelDesignPage;
