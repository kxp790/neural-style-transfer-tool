import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { AppContext } from './components/AppContext';

import ContentLayerSelectionItem from './components/model_design_items/ContentLayerSelectionItem';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ImageInputItem from './components/model_design_items/ImageInputItem';
import ModelDesignPage from './components/ModelDesignPage';
import NewDesignPage from './components/NewDesignPage';
import ParameterSelectionItem from './components/model_design_items/ParameterSelectionItem';
import ResultPage from './components/ResultPage';
import ResumeDesignPage from './components/ResumeDesignPage';
import SupportPage from './components/SupportPage';
import StyleLayerSelectionItem from './components/model_design_items/StyleLayerSelectionItem';
import StyleSelectionItem from './components/model_design_items/StyleSelectionItem';

import './App.scss';

const App = () => {

  const [designId, setDesignId] = useState('')
  const [design, setDesign] = useState()
  
  const layers = ['block1_conv1', 'block1_conv1', 
                  'block2_conv1', 'block2_conv2', 
                  'block3_conv1', 'block3_conv2', 'block3_conv3', 
                  'block4_conv1', 'block4_conv2', 'block4_conv3', 
                  'block5_conv1', 'block5_conv2', 'block5_conv3']
  const parameters = ['Content weight', 
                      'Style weight', 
                      'Number of iterations', 
                      'Number of images saved']

  return (
    <BrowserRouter>
      <AppContext.Provider value={{designId, setDesignId, design, setDesign, layers}}>
        <div className="App">
          <Header />
          {(1 === 2) ? (<Redirect to="/" />) : (
            <Switch>
              <Route path="/" exact children={<HomePage design={designId, setDesign} />} />
              <Route path="/new_design" exact component={NewDesignPage} />
              <Route path="/resume_design" exact component={ResumeDesignPage}/>
              <Route path="/model" exact children={<ModelDesignPage design={design} />} />
              <Route path="/model/input" exact children={<ImageInputItem design={design} />} />
              <Route path="/model/content_layers" exact children={<ContentLayerSelectionItem design={design, layers} />} />
              <Route path="/model/style_layers" exact children={<StyleLayerSelectionItem design={design, layers} />} />
              <Route path="/model/style" exact children={<StyleSelectionItem design={design} />} />
              <Route path="/model/parameter" exact children={<ParameterSelectionItem design={design} />} />
              <Route path="/result" exact children={<ResultPage design={design} />} />
              <Route path="/support" component={SupportPage}/>
            </Switch>
          )}
        </div>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App
