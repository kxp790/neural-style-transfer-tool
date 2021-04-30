import axios from 'axios'
import React, { useState, useContext, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { AppContext } from '../AppContext'
import { ModelDesignContext } from './ModelDesignContext'

function Basic(props) {
  const onDrop = useCallback(files => {
    props.onChange(files[0])
  })

  const { getRootProps, getInputProps } = useDropzone({onDrop: onDrop, accept: "image/jpg, image/jpeg, image/png"})

  return (
    <section className="drop-container">
      <div style={{padding: "5vh", width: "70%", margin: "0 auto", minWidth: "fit-content", borderStyle: "dashed", borderWidth: "1px", borderRadius: "2px"}} {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>drag 'n' drop / click to select a content image</p>
      </div>
    </section>
  )
}

const ImageInputStep = () => {
  const { design } = useContext(AppContext)
  const [ image, setImage ] = useState()
  const { hasSelectedContentImage, setHasSelectedContentImage } = useContext(ModelDesignContext)
  const [ imgHash, setImgHash ] = useState(Date.now())

  useEffect(() => {}, [image, hasSelectedContentImage])

  const updateImage = (file) => {
    var ext = file.name.split('.')[1]
    var renamedFile = new File([file], `${design.id}.${ext}`, { type: file.type })
    var data = new FormData()
    setImage(renamedFile)
    data.append('file', renamedFile)
    setHasSelectedContentImage(false)
    axios.post('http://localhost:5000/upload_image', data, {
      headers: {
          'Access-Control-Allow-Origin': 'http://localhost:3000/model',
          'Content-Type': 'multipart/form-data'
      }
    }).then(() => {
      setHasSelectedContentImage(true)
      setImgHash(Date.now())
    }).catch((error) => console.log(error))
  }

  return(
    <div className="model-design-step-container small">
      <Basic onChange={(file) => updateImage(file)}/>
      <div style={{maxWidth: "125px", paddingTop: "5vh", margin: "0 auto"}}>
        {!hasSelectedContentImage ? null : <img onError={(e) => setHasSelectedContentImage(false)} src={'http://localhost:5000/get_input_image/' + design.id + '.jpg?' + imgHash} style={{maxWidth: "125px", borderStyle: "dotted", borderWidth: "1px", borderRadius: "2px"}} alt="" />}
      </div>
    </div>
  )
}

export default ImageInputStep
