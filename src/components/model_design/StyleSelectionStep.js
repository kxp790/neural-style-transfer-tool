import React, { useContext } from 'react'
import { ModelDesignContext } from './ModelDesignContext'
import style_1 from '../../images/painting.jpg'
import style_2 from '../../images/stained-glass.jpg'
import style_3 from '../../images/jeans.jpg'

const StyleSelectionStep = () => {
    // list of style options
    const styles = ['painting.jpg', 'stained-glass.jpg', 'placeholder.jpg']

    // context
    const { selectedStyleImage, setSelectedStyleImage } = useContext(ModelDesignContext)

    // update selected style image
    const updateSelectedStyleImage = (event) => {
        setSelectedStyleImage(event.target.name)
    }

    return(
        <div className="model-design-step-container small">
            <h4 style={{textShadow: "1px 1px black"}}>SELECT A STYLE IMAGE:</h4>
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

export default StyleSelectionStep
