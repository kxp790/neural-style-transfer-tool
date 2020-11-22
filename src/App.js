import React, { useState, useEffect } from 'react';
import './App.scss';
import logo from './logo.png';

const ImageWrapper = ({src, title}) => (
  <div class="img-wrapper">
    <p>{title}</p>
    <img src={src} />
  </div>
)

const Form = () => (
  <form method="POST" action="http://localhost:5000" enctype="multipart/form-data">
    <p><input type="file" name="file" accept=".jpg" /></p>
    <p><input type="submit" value="Submit" /></p>
  </form>
)

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>PHOTO STYLER</h1>
          <div class="cards">
            <ImageWrapper src="http://localhost:5000/before" title="BEFORE" />
            <ImageWrapper src="http://localhost:5000/after" title="AFTER" />
          </div>
          <Form />
      </header>
    </div>
  );
}

export default App;
