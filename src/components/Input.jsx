/* eslint-disable react/prop-types */
import React from "react"
const Input=React.forwardRef(function Input({
    label,
    type="text",
    className="",
    ...props
},ref){
    return (
        <div className="my-2">
            {label && <label className="block mb-1 text-gray-700 font-medium">{label}</label>}
            <input 
                type={type}
                className={`${className}`}
                {...props}
                ref={ref}
            ></input>
        </div>
    )
})

export default Input