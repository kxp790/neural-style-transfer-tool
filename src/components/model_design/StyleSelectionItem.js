import React, { useContext } from 'react'
import { ModelDesignContext } from './ModelDesignContext'
import style_1 from '../../images/placeholder.png'
import style_2 from '../../images/stained-glass.jpg'
import style_3 from '../../images/placeholder.png'

const StyleSelectionItem = () => {
    // list of style options
    const styles = ['placeholder_1.png', 'stained-glass.jpg', 'placeholder_2.png']

    // context
    const { selectedStyleImage, setSelectedStyleImage } = useContext(ModelDesignContext)

    // update selected style image
    const updateSelectedStyleImage = (event) => {
        setSelectedStyleImage(event.target.name)
    }

    return(
        <div className="model-item-container">
            <table className="style-image-table">
                <tbody>
                    <tr>
                        <td className={(styles[0] === selectedStyleImage) ? "style-image-cell enabled" : "style-image-cell"} onClick={(event) => updateSelectedStyleImage(event)}>
                            <img src={style_1} name={styles[0]} className="style-image" alt="" style={{cursor: "pointer"}} />
                        </td>
                        <td className={(styles[1] === selectedStyleImage) ? "style-image-cell enabled" : "style-image-cell"} onClick={(event) => updateSelectedStyleImage(event)}>
                            <img src={style_2} name={styles[1]} className="style-image" alt="" style={{cursor: "pointer"}} />
                        </td>
                        <td className={(styles[2] === selectedStyleImage) ? "style-image-cell enabled" : "style-image-cell"} onClick={(event) => updateSelectedStyleImage(event)}>
                            <img src={style_3} name={styles[2]} className="style-image" alt="" style={{cursor: "pointer"}} />
                        </td>
                    </tr>
                </tbody>         
            </table>
        </div>    
    )
}

export default StyleSelectionItem
