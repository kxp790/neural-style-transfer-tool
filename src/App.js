import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { AppContext } from './components/AppContext';

import Header from './components/Header';
import HomePage from './components/HomePage';
import NewDesignPage from './components/NewDesignPage';
import ResultPage from './components/ResultPage';
import ResumeDesignPage from './components/ResumeDesignPage';
import SupportPage from './components/SupportPage';

import './App.scss';
import { ModelDesignPage } from './components/ModelDesignPage';

const App = () => {

  const [designId, setDesignId] = useState('')
  const [design, setDesign] = useState()
  
  const layers = ['block1_conv1', 'block1_conv2', 
                  'block2_conv1', 'block2_conv2', 
                  'block3_conv1', 'block3_conv2', 'block3_conv3', 
                  'block4_conv1', 'block4_conv2', 'block4_conv3', 
                  'block5_conv1', 'block5_conv2', 'block5_conv3']
  
  return (
    <BrowserRouter>
      <AppContext.Provider value={{designId, setDesignId, design, setDesign, layers}}>
        <div className="App">
          <Header />
          {1 == 2 ? (<Redirect to="/" />) : (
            <Switch>
              <Route path="/" exact children={<HomePage design={designId, setDesign} />} />
              <Route path="/new_design" exact component={NewDesignPage} />
              <Route path="/resume_design" exact component={ResumeDesignPage}/>
              <Route path="/model" exact component={ModelDesignPage} />
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
