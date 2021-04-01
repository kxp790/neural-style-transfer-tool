import React from 'react'

const ImageWrapper = ({src, title}) => (
    <div className="img-wrapper">
      <p>{title}</p>
      <img src={src} />
    </div>
)

const ResultPage = () => (
  <div className="cards">
    <ImageWrapper src="http://localhost:5000/input/test.jpg" title="BEFORE" />
    <ImageWrapper src="http://localhost:3000/output/test.jpg" title="AFTER" />
  </div>
)

export default ResultPage
