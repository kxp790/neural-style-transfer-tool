import React, { useContext, useState, useRef, useEffect } from 'react'
import PropagateLoader from 'react-spinners/PropagateLoader'
import { AppContext } from './AppContext'

// component for displaying style transfer results
const ImageWrapper = ({ src, title }) => (
    <div className="img-wrapper">
      <p>{title}</p>
      <img src={src} alt="" />
    </div>
)

const ResultPage = () => {
  // whether style transfer has finished
  const { design, hasResult } = useContext(AppContext)

  useEffect(() => {
    
  }, [hasResult])

  const shouldLoad = () => {
    return !hasResult || design == null
  }

  return (
    shouldLoad() ? <PropagateLoader style={{paddingTop: "30vh"}}/> : <div className="cards">
      <ImageWrapper src={'http://localhost:5000/get_input_image/' + design.id + '.jpg'} title="BEFORE" />
      <ImageWrapper src={'http://localhost:5000/get_output_image/' + design.id + '.jpg'} title="AFTER" />
    </div>
  )
}

export default ResultPage
