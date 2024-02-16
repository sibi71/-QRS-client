import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import {navbar} from "../../static/data"
import {  NavLink } from 'react-router-dom'
import Navlink from "../Navlink/Navlink"
import { HiMenuAlt3, HiX } from "react-icons/hi"
import { motion, AnimatePresence } from "framer-motion"
const Navbar = () => {
    const [toggle, setToggle] = useState(false)
    const [scroll, setScroll] = useState(false)


    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 20)
        })
    }, [])

    const item = {
        exit: {
            opacity: 0,
            height: 0,
            transtion: {
                ease: "easeInOut",
                duration: 0.3,
                delay: .9
            }
        }
    }
    return (
        <nav className={scroll ? "navbar_active" : "navbar"}>
            {navbar.map((nav, index) => {
                return (
                    <div className='navbar_container' key={index}>
                        <div className='navbar_logo'>
                            <NavLink to={"/"} className={({ isActive }) => (isActive ? 'active' : '')}>
                                {nav.title}
                            </NavLink>
                        </div>
                        <div className='navbar_link'>
                            {
                                nav.navlink.map((navlink, index) => {
                                    return (
                                        <>
                                            <NavLink to={`/${navlink.nav}`} key={index} className={({ isActive }) => (isActive ? 'active' : '')} >{navlink.nav}</NavLink>
                                        </>
                                    )
                                })
                            }



                        </div>
                        <div className='navbar_menu'>
                            <HiMenuAlt3 onClick={() => setToggle(!toggle)} className="navbar__menuicon" />
                        </div>
                        <AnimatePresence>
                            {
                                toggle && (
                                    <motion.div className='navbar_menudetalls'
                                    variants={item}
                                    initial={{height:0,opacity:0}}
                                    animate={{height:"100vh",opacity:1}}
                                    transition={{duration:.5}}
                                    exit="exit"
                                    >

                                        {
                                            nav.navlink.map((navlink, index) => {
                                                return (
                                                    <>
                                                        <Navlink key={index} navlink={navlink.nav}  setToggle={setToggle} />
                                                    </>
                                                )
                                            })
                                        }


                                        <div className='navbar_closeicon' onClick={() => setToggle(!toggle)}>
                                            <HiX className='' />
                                        </div>

                                    </motion.div>
                                )
                            }
                        </AnimatePresence>
                    </div>
                )
            })}




        </nav>
    )
}

export default Navbar