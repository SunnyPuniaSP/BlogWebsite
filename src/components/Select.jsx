/* eslint-disable react/prop-types */
import React from "react"
function Select({
    label,
    options,
    className="",
    ...props
},ref){
    return(
        <div className="px-2">
            {label && <label className="text-xl">{label}</label> }
            <select className={`${className} border-2 border-gray-500 w-44 mx-2`} {...props} ref={ref} defaultValue={"active"}>
                {
                    options &&
                    options.map((option)=>(
                        <option value={option} key={option}>{option}</option>
                    ))
                }

            </select>
        </div>
    )
}

export default React.forwardRef(Select)