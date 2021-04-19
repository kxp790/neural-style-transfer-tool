import React, { useContext, useState } from 'react'
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

  return (
    !hasResult ? <PropagateLoader /> : <div className="cards">
      <ImageWrapper src={'http://localhost:5000/input/' + design.id + '.jpg'} title="BEFORE" />
      <ImageWrapper src={'http://localhost:5000/output/' + design.id + '.jpg'} title="AFTER" />
    </div>
  )
}

export default ResultPage
