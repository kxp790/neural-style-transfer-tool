import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';
import axios from 'axios';
import { AppContext } from '../AppContext';
import { ModelDesignContext } from './ModelDesignContext';

 
const StepProgressItem = (props) => {
    const { design } = useContext(AppContext)
    
    // setup step validators, will be called before proceeding to the next step
    const styleSelectionValidator = () => {
        // console.log("selectedStyleImage from StepProgress:" + design.stye_image_name)
        // return (design.style_image_name !== '') ? true : false
        return true
    }
    
    const contentLayerSelectionValidator = () =>  {
        // console.log("selectedContentLayer from ContentLayerSelection:" + selectedContentLayer)
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
        axios.get('http://localhost:5000/update_design', {
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            }
        })
        .then(function (response) {
            if(response.data == '200') {
                props.history.push('/result')
                axios.get('http://localhost:5000/style_transfer/' + design.id, {
                    headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:3000'
                    }
                }).then(x => console.log("Design updated"))
            } else {
                console.log("Design update unsuccessful")
            }
        })
    }
    
    // render the progress bar
    return (
        <ModelDesignContext.Consumer>
            {({imageInput, styleSelection, contentLayerSelection, 
            styleLayerSelection, parameterSelection}) => (
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
            )}
        </ModelDesignContext.Consumer>
    )
}

export default withRouter(StepProgressItem)
