import React, { useState, useContext } from 'react';
import { AppContext } from '../AppContext';

import style_1 from '../../images/placeholder.png';
import style_2 from '../../images/stained-glass.jpg';
import style_3 from '../../images/placeholder.png';

const StyleSelectionItem = () => {
    const { design } = useContext(AppContext)
    const styles = ['placeholder_1.png', 'stained-glass.jpg', 'placeholder_2.png']
    const [ selectedStyle, setSelectedStyle ] = useState(design.style_image_name)

    const updateSelectedStyle = (event) => {
        setSelectedStyle(event.target.name)
    }

    return(
        <div className="model-item-container">
            <table className="style-image-table">
                <td className={(styles[0] === selectedStyle) ? "style-image-cell enabled" : "style-image-cell"} onClick={(event) => updateSelectedStyle(event)}>
                    <img src={style_1} name={styles[0]} className="style-image" alt="" />
                </td>
                <td className={(styles[1] === selectedStyle) ? "style-image-cell enabled" : "style-image-cell"} onClick={(event) => updateSelectedStyle(event)}>
                    <img src={style_2} name={styles[1]} className="style-image" alt="" />
                </td>
                <td className={(styles[2] === selectedStyle) ? "style-image-cell enabled" : "style-image-cell"} onClick={(event) => updateSelectedStyle(event)}>
                    <img src={style_3} name={styles[2]} className="style-image" alt="" />
                </td>
            </table>
        </div>    
    )
}

export default StyleSelectionItem
