import React, { useState } from 'react'

import PropagateLoader from 'react-spinners/PropagateLoader'

const ImageWrapper = ({ src, title }) => (
    <div className="img-wrapper">
      <p>{title}</p>
      <img src={src} alt="" />
    </div>
)

const ResultPage = () => {
  const [ loading, setLoading ] = useState(false)

  return (
    loading ? <PropagateLoader /> : <div className="cards">
    <ImageWrapper src="http://localhost:3000/input/test.jpg" title="BEFORE" />
    <ImageWrapper src="http://localhost:3000/output/test.jpg" title="AFTER" />
  </div>
      )

  
}

export default ResultPage
