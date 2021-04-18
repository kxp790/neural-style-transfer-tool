import React, { useState } from 'react'
import PropagateLoader from 'react-spinners/PropagateLoader'

// component for displaying style transfer results
const ImageWrapper = ({ src, title }) => (
    <div className="img-wrapper">
      <p>{title}</p>
      <img src={src} alt="" />
    </div>
)

const ResultPage = () => {
  // whether style transfer has finished
  const [ loading, setLoading ] = useState(false)

  // update loading switch
  setLoading(false)

  return (
    loading ? <PropagateLoader /> : <div className="cards">
      <ImageWrapper src="http://localhost:3000/input/test.jpg" title="BEFORE" />
      <ImageWrapper src="http://localhost:3000/output/test.jpg" title="AFTER" />
    </div>
  )
}

export default ResultPage
