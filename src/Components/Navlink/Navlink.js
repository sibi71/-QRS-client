import React from 'react'
import "./Navlink.css"
import { Link } from 'react-router-dom'

const Navlink = ({ index, navlink, setToggle }) => {
  return (
    <div className='navlink' key={index} onClick={prev => setToggle(!prev)}>
      <Link to={`/${navlink}`} className="navlink_option" >{navlink}</Link>
    </div>
  )
}

export default Navlink