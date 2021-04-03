import React from 'react';
import style_1 from '../images/placeholder.png'
import style_2 from '../images/stained-glass.jpg'
import style_3 from '../images/placeholder.png'

const StyleSelectionItem = () => (
    <div className="pad-style-image">
        <div><br></br></div>
        <div><br></br></div>
        <div><br></br></div>
        <img src={style_1} className="style-select-image"/>
        <img src={style_2} className="style-select-image"/>
        <img src={style_3} className="style-select-image"/>
    </div>
)

export default StyleSelectionItem
