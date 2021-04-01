import React, { useState, useEffect } from 'react';
import './App.scss';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ModelDesignPage from './components/ModelDesignPage';
import ResultPage from './components/ResultPage';
import SupportPage from './components/SupportPage';
import LayerSelectionItem from './components/LayerSelectionItem';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppContext } from './components/AppContext';

function App() {
  const [design, setDesign] = useState();
  const layers = ['conv_1_1', 'conv_1_2', 'pooling_1',
                  'conv_2_1', 'conv_2_2', 'pooling_2',
                  'conv_3_1', 'conv_3_2', 'conv_3_3', 'pooling_3',
                  'conv_4_1', 'conv_4_2', 'conv_4_3', 'pooling_4',
                  'conv_5_1', 'conv_5_2', 'conv_5_3', 'pooling_5']

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
          <Switch>
            <Route path="/" exact children={<HomePage design={design} />}/>
            <Route path="/model" exact component={ModelDesignPage}/>
            <Route path="/model/layers" exact children={<LayerSelectionItem design={design, layers} />} />
            <Route path="/result" component={ResultPage}/>
            <Route path="/support" component={SupportPage}/>
          </Switch>
        </div>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;  
