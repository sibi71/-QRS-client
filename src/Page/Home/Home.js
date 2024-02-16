import React, { useEffect, useState } from 'react'
import "./Home.css"
import { home } from '../../static/data'
import axios from '../../axios'

const Home = () => {

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    axios.get('/course/course-list')
      .then(response => setCourses(response.data))
      .catch(error => console.error(error));
  };
  return (
    <div className='home'>
      {
        home.map((home,index)=>{
          return(
            <>
            <div className='home_container' key={index}>
              <p>{home.title}</p>
              <img src={home.img} alt='img' />
            </div>
            </>
          )
        })
      }
      <div className='course_details'>
        {
          courses.map((course,indes)=>{
            return(
              <>
              <div className='course_body'>
                <img src="https://yorvitech.com/images/fullstackdeveloper.png" alt=''/>
                <h5>{course.name}</h5>
                <p>{course.description}</p>
              </div>
              </>
            )
          })
        }

      </div>
    </div>
  )
}

export default Home