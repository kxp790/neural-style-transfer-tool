import React from 'react'

const ImageForm = () => (
  <form method="POST" action="http://localhost:5000" encType="multipart/form-data">
    <input type="file" name="file" accept=".jpg, .png" />
    <input type="submit" value="Upload" />
  </form>
)

const ImageInputItem = () => (
  <div className="pad-block">
      <ImageForm />
  </div>
)

export default ImageInputItem
