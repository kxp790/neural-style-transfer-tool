import React, { useContext, useEffect } from 'react'
import PropagateLoader from 'react-spinners/PropagateLoader'
import { AppContext } from './AppContext'
import { Link, withRouter } from 'react-router-dom'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
    shouldLoad()
  }, [hasResult])

  const shouldLoad = () => {
    return !hasResult || design == null
  }

  return (
    shouldLoad() ? <div style={{paddingTop: "30vh"}}><PropagateLoader /></div> : 
    <>
      {/* <Link to="/model" className="button button2"><FontAwesomeIcon icon={faArrowLeft} /> Update Parameters</Link> */}
      <Link to="/model" className="links"><FontAwesomeIcon icon={faArrowLeft} /> Update Parameters</Link>
      <div className="cards">
        <ImageWrapper src={'http://localhost:5000/get_input_image/' + design.id + '.jpg'} title="BEFORE" />
        <ImageWrapper src={'http://localhost:5000/get_output_image/' + design.id + '.jpg'} title="AFTER" />
      </div>
      <Link to="/new_design" className="button button1">Start New</Link>
      {/* <p style={{padding: "0vh 1vh", display: "inline", margin: "0 auto"}}>/</p>
      <Link to="/model" className="button button2">Update Current</Link> */}
    </>
  )
}

export default withRouter(ResultPage)
