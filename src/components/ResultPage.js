import React from 'react'

const ImageWrapper = ({src, title}) => (
    <div class="img-wrapper">
      <p>{title}</p>
      <img src={src} />
    </div>
)

function ResultPage() {
    return (
    <div class="cards">
        <ImageWrapper src="http://localhost:5000/input/test" title="BEFORE" />
        <ImageWrapper src="http://localhost:3000/output/test" title="AFTER" />
      </div>
    )
}

export default ResultPage