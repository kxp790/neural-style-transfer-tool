import React from 'react';
import PinInput from 'react-pin-input';

const PinForm = () => (
    <PinInput 
        className="pad-text"
        length={4} 
        initialValue="1234"
        onChange={(value, index) => {}} 
        type="numeric" 
        inputMode="number"
        style={{paddingBottom: "2vh"}}
        inputStyle={{borderRadius: "4px", border: "2px solid #374a5c", backgroundColor: "#9db0c2", fontSize: "16px"}}
        inputFocusStyle={{borderRadius: "4px", backgroundColor: "#52708a"}}
        onComplete={(value, index) => {}}
        autoSelect={true}
        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
    />
)

export default PinForm