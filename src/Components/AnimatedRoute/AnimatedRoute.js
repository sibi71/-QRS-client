import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from 'framer-motion'
import Home from "../../Page/Home/Home"
import Course from '../../Page/Course/Course'
import Student from '../../Page/Student/Student'
import Training from '../../Page/Training/Training'
const AnimatedRoute = () => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })

  }, [location])
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<><Home /></>} />
        <Route path='/course' element={<><Course /></>} />
        <Route path='/student' element={<><Student /></>} />
        <Route path='/training' element={<><Training /></>} />
      </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoute