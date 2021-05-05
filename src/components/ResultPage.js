import React, { useContext, useEffect } from 'react'
import PropagateLoader from 'react-spinners/PropagateLoader'
import { AppContext } from './AppContext'
import { useHistory } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style_1 from '../images/painting.jpg'
import style_2 from '../images/stained-glass.jpg'
import style_3 from '../images/jeans.jpg'

// component for displaying style transfer results
const ImageWrapper = ({ src, title, imgClass }) => (
    <div className="img-wrapper">
      <p>{title}</p>
      <img className={imgClass} src={src} alt="" />
    </div>
)

const ResultPage = () => {
  // whether style transfer has finished
  const { design, hasResult } = useContext(AppContext)

  const history = useHistory()

  useEffect(() => {
    shouldLoad()
  }, [hasResult])

  const shouldLoad = () => {
    return !hasResult || design == null
  }

  const styleImage = () => {
    console.log(design.style_image_name)
    switch(design.style_image_name) {
      default: {
        console.log("Something went wrong, defaulting to stained-glass")
        return style_2
      }
      case 'painting.jpg': return style_1
      case 'stained-glass.jpg': return style_2
      case 'jeans.jpg': return style_3
    }
  }
  return (
    shouldLoad() ? 
    <>
      <div style={{paddingTop: "30vh"}}><PropagateLoader /></div>
      <p style={{paddingTop: "5vh"}}>Loading style transfer result!</p>
      <p style={{paddingTop: "1vh"}}>(this can take minutes depending on the number of iterations)</p>
    </> 
    : 
    <>
      <div className="button-bar">
        <button className="links" onClick={() => history.push('/model', { isResuming: true })}><FontAwesomeIcon icon={faArrowLeft} /> UPDATE PARAMETERS</button>
        {/* <Link to="/new_design" className="links">Start New</Link> */}
        <button className="links" onClick={() => history.push('/new_design', { isResuming: true })}>START NEW DESIGN <FontAwesomeIcon icon={faArrowRight} /></button>
      </div>
      <div className="cards">
        <ImageWrapper src={'http://localhost:5000/get_input_image/' + design.id + '.jpg'} title="CONTENT" />
        {/* <ImageWrapper src={'http://localhost:5000/get_input_image/' + design.id + '.jpg'} title="CONTENT" imgClass="small"/>
        <ImageWrapper src={styleImage()} title="STYLE" imgClass="small" /> */}
        <ImageWrapper src={'http://localhost:5000/get_output_image/' + design.id + '.jpg'} title="RESULT" />
      </div>
    </>
  )
}

export default withRouter(ResultPage)
