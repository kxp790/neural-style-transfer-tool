import React from 'react';
import Select from 'react-select';
import style_1 from '../../images/placeholder.png';
import style_2 from '../../images/stained-glass.jpg';
import style_3 from '../../images/placeholder.png';

const StyleSelectionItem = () => {
    const styles = [
        { value: 'style_1', label: <div><img src={style_1} height="100vh" width="100vh" alt="" /></div> },
        { value: 'style_2', label: <div><img src={style_2} height="100vh" width="100vh" alt="" /></div> },
        { value: 'style_3', label: <div><img src={style_3} height="100vh" width="100vh" alt="" /></div> },
    ];
    
    return(
        <div className="pad-style-image">
            <div><br></br></div>
            <div><br></br></div>
            <div><br></br></div>
            <Select className="select-style" options={styles}/>  
            <img src={style_1} className="style-select-image" alt="" />
            <img src={style_2} className="style-select-image" alt="" />
            <img src={style_3} className="style-select-image" alt="" />

             
        </div>
    )
}

export default StyleSelectionItem
