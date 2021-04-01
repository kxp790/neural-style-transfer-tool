import React from 'react';

const Form = () => (
  <form method="POST" action="http://localhost:5000" enctype="multipart/form-data">
    <p><input type="file" name="file" accept=".jpg, .png" /></p>
    <p><input type="submit" value="Submit" /></p>
  </form>
)

const ImageInputItem = () => (
  <div>
      <Form />
  </div>
)

export default ImageInputItem
