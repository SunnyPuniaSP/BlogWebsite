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
            {label && <label className="text-xl">{label}</label>}
            <input 
                type={type}
                className={`${className} border-2 mx-2 border-gray-700 `}
                {...props}
                ref={ref}
            ></input>
        </div>
    )
})

export default Input