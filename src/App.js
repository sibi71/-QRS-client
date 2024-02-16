import React from 'react'
import "./App.css"
import { BrowserRouter as Router } from "react-router-dom"
import Navbar from "./Components/Navbar/Navbar"
import AnimatedRoute from './Components/AnimatedRoute/AnimatedRoute'
const App = () => {
  return (
    <Router>
    <Navbar />
    <AnimatedRoute />
  </Router>
  )
}

export default App