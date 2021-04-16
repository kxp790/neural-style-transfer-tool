import React, { useContext } from 'react';
import { ModelDesignContext } from './ModelDesignContext';
import { AppContext } from '../AppContext';
import axios from 'axios'
import style_1 from '../../images/placeholder.png';
import style_2 from '../../images/stained-glass.jpg';
import style_3 from '../../images/placeholder.png';

const StyleSelectionItem = () => {
    const styles = ['placeholder_1.png', 'stained-glass.jpg', 'placeholder_2.png']
    const { design } = useContext(AppContext)
    const { selectedStyleImage, setSelectedStyleImage } = useContext(ModelDesignContext)

    const updateSelectedStyleImage = (event) => {
        setSelectedStyleImage(event.target.name)
        if(selectedStyleImage !== '') {
            axios.post('http://localhost:5000/update_design', {
            design_id: design.id,
            style_image_name: selectedStyleImage
            // update_list: [['style_image_name', selectedStyleImage]]
            }, {
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
            }
            })
            .then(function (response) {
                console.log(response.data)
            })
        }
        console.log("selectedStyle from StyleSelectionItem:" + selectedStyleImage)
    }

    return(
        <div className="model-item-container">
            <table className="style-image-table">
                <tbody>
                    <tr>
                        <td className={(styles[0] === selectedStyleImage) ? "style-image-cell enabled" : "style-image-cell"} onClick={(event) => updateSelectedStyleImage(event)}>
                            <img src={style_1} name={styles[0]} className="style-image" alt="" />
                        </td>
                        <td className={(styles[1] === selectedStyleImage) ? "style-image-cell enabled" : "style-image-cell"} onClick={(event) => updateSelectedStyleImage(event)}>
                            <img src={style_2} name={styles[1]} className="style-image" alt="" />
                        </td>
                        <td className={(styles[2] === selectedStyleImage) ? "style-image-cell enabled" : "style-image-cell"} onClick={(event) => updateSelectedStyleImage(event)}>
                            <img src={style_3} name={styles[2]} className="style-image" alt="" />
                        </td>
                    </tr>
                </tbody>         
            </table>
        </div>    
    )
}

export default StyleSelectionItem
