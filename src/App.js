// import npm packages
import React, { useState } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
// import stylesheet
import './App.scss'
// import app context 
import { AppContext } from './components/AppContext'
// import components 
import Header from './components/Header'
import HomePage from './components/HomePage'
import ModelDesignPage from './components/ModelDesignPage'
import NewDesignPage from './components/NewDesignPage'
import ResultPage from './components/ResultPage'
import ResumeDesignPage from './components/ResumeDesignPage'
import SupportPage from './components/SupportPage'

const App = () => {
  // context
  const [ design, setDesign ] = useState()
  const [ hasResult, setHasResult ] = useState(false)
  
  return (
    <BrowserRouter>
      <AppContext.Provider value={{design, setDesign, hasResult, setHasResult}}>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/new_design" exact component={NewDesignPage} />
            <Route path="/resume_design" exact component={ResumeDesignPage}/>
            <Route path="/model" exact children={design == null ? <Redirect to="/" /> : <ModelDesignPage />} />
            <Route path="/result" exact children={design == null ? <Redirect to="/" /> : <ResultPage />} />
            <Route path="/support" component={SupportPage}/>
            <Route path="/" component={HomePage} />
          </Switch>
        </div>
      </AppContext.Provider>
    </BrowserRouter>
  )
}

export default App
