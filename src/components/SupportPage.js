import React from 'react'
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel } from 'react-accessible-accordion'
import 'react-accessible-accordion/dist/fancy-example.css'

const SupportPage = () => (
    <div className="support-page-container">
        <Accordion allowMultipleExpanded>
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        Home Page
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                        On the Home Page you can choose to start a new model design by pressing "Start 
                        New" or if you have already made one, you can resume the previous model design 
                        by pressing "Resume previous". 
                    </p>
                </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        New Design Page
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                        On the New Design Page you are presented with your new design id. If you wish to 
                        return to the same design later, mark it up somewhere. The default pin each design
                        gets is 1234, but if you would like to change it to something else then this is
                        your one chance to do it. By clicking "Continue" you will be directed to the 
                        Model Design Page. 
                    </p>
                </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        Resume Design Page
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                        One the Resume Design Page you are asked to insert your already existing 
                        design id and pin to continue. If the design id and pin combination is valid, 
                        by clicking "Edit model" you will be directed to the Model Design Page; by 
                        clicking "See result" you will be directed to the Result Page. 
                    </p>
                </AccordionItemPanel>
            </AccordionItem>

            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        Model Design Page
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                        On the model Design Page you can see a step progress journey. This consists of 
                        five steps in the following order: Image Upload, Style Selection, Content Layer 
                        Selection, Style Layer Selection, Other Parameters. You can proceed to the next 
                        step when the validation of the current step passes. You can also move to the 
                        previous steps if you wish to check your previous answers. You can see how far 
                        in the step progress journey you are by the progress bar at the top of the page. 
                        Each of the steps will be explained in more detail in their own accordion item. 
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
    </div>
)

export default SupportPage
