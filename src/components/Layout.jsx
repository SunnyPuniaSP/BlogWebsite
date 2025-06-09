import {Outlet} from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import colors from './Theme'
function Layout(){
    return (
        <div className={`flex-col min-h-screen ${colors.bgColor} `}>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default  Layout