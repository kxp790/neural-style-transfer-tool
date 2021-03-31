import React from 'react';
import './App.scss';
import Header from './Header';
import HomePage from './components/HomePage';
import ModelDesignPage from './components/ModelDesignPage';
import ResultPage from './components/ResultPage';
import SupportPage from './components/SupportPage';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage}/>
          <Route path="/model" component={ModelDesignPage}/>
          <Route path="/result" component={ResultPage}/>
          <Route path="/support" component={SupportPage}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

// export default (
//   <Route path="/" component={App}>
//     <IndexRoute component={HomePage} />
//     <Route path="/model_design" component={ModelDesignPage} />
//     <Route path="/result" component={ResultPage} />
//   </Route>
// );
