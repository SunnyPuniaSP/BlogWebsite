import colors from "./Theme"
function Footer(){
    return(
        <>
            <div className={`flex justify-center border-t text-sm text-gray-500 w-full ${colors.barColor} mt-auto`}>Made By <span className="font-semibold text-blue-600 ml-1">SUNNY PUNIA</span></div>
        </>
    )
}

export default Footer