
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Technology from './pages/Technology'
import Sports from './pages/Sports'
import Science from './pages/Science'
import Health from './pages/Health'
import General from './pages/General'
import About from './pages/About'
import Entertainment from './pages/Entertainment'
import Business from './pages/Business'
import Categories from './pages/Categories'


import Header from './components/Header'
import PageDesign from './components/PageDesign'
function App() {


  return (
    <>

      <Header />
    <PageDesign/>
    </>
  )
}

export default App
