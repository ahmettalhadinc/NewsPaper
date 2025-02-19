
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Technology from '../pages/Technology'
import Sports from '../pages/Sports'
import Science from '../pages/Science'
import Health from '../pages/Health'
import General from '../pages/General'
import About from '../pages/About'
import Entertainment from '../pages/Entertainment'
import Business from '../pages/Business'
import SearchPage from '../pages/SearchPage'
import '../css/PageDesign.css'

function PageDesign() {
    return (
        <>
            <div className='all' >

                <Routes>

                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/teknoloji" element={<Technology />} />
                    <Route path="/bilim" element={<Science />} />
                    <Route path="/spor" element={<Sports />} />
                    <Route path="/saglik" element={<Health />} />
                    <Route path="/eglence" element={<Entertainment />} />
                    <Route path="/is" element={<Business />} />
                    <Route path="/genel" element={<General />} />
                    <Route path="/hakkimda" element={<About />} />
                </Routes>
            </div>
        </>
    )
}

export default PageDesign