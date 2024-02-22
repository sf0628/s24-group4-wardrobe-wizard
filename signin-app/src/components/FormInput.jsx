import React from "react"
import "./formInput.css"

const FormInput = (props) => {
    return (
        <div className="formInput">
            <label></label>
            <input 
            ref={props.refer}
            placeholder={props.placeholder}
            />
        </div>

        
        
    )
}

export default FormInput