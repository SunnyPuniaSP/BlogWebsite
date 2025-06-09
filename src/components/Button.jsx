/* eslint-disable react/prop-types */
function Button({
    children,
    bgColor="bg-blue-600",
    textColor="text-white",
    type="button",
    className="",
    ...props
}){
    return (
        <button className={`${bgColor} ${textColor} ${className} `} type={type} {...props}>{children}</button>
    )
}

export default Button