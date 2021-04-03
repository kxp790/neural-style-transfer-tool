import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { AppContext } from './components/AppContext';

import ContentLayerSelectionItem from './components/ContentLayerSelectionItem';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ImageInputItem from './components/ImageInputItem';
import ModelDesignPage from './components/ModelDesignPage';
import ParameterSelectionItem from './components/ParameterSelectionItem';
import ResultPage from './components/ResultPage';
import SupportPage from './components/SupportPage';
import StyleLayerSelectionItem from './components/StyleLayerSelectionItem';
import StyleSelectionItem from './components/StyleSelectionItem';

import './App.scss';

const App = () => {

  const [design, setDesign] = useState();
  const layers = ['conv_1_1', 'conv_1_2', 
                  'conv_2_1', 'conv_2_2', 
                  'conv_3_1', 'conv_3_2', 'conv_3_3', 
                  'conv_4_1', 'conv_4_2', 'conv_4_3', 
                  'conv_5_1', 'conv_5_2', 'conv_5_3']

  useEffect(() => {
    fetch("/design/af2iak2jh3").then(response =>
      response.json().then(data => {
        setDesign(data);
      })
    );
  }, []);

  return (
    <BrowserRouter>
      <AppContext.Provider value={{design, layers}}>
        <div className="App">
          <Header />
          {(design === undefined) ? (<Redirect to="/" />) : (
            <Switch>
            <Route path="/" exact component={HomePage}/>
            <Route path="/model" exact children={<ModelDesignPage design={design} />} />
            <Route path="/model/input" exact children={<ImageInputItem design={design} />} />
            <Route path="/model/content_layers" exact children={<ContentLayerSelectionItem design={design, layers} />} />
            <Route path="/model/style_layers" exact children={<StyleLayerSelectionItem design={design, layers} />} />
            <Route path="/model/style" exact children={<StyleSelectionItem design={design} />} />
            <Route path="/model/parameter" exact children={<ParameterSelectionItem design={design} />} />
            <Route path="/result" exact children={<ResultPage design={design} />} />
            <Route path="/support" component={SupportPage}/>
          </Switch>)}
        </div>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;  
