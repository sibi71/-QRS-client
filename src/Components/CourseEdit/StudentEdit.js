import React, { useState,useEffect } from 'react';
import axios from '../../axios';

const StudentEdit = ({ studentId, initialName, initialEmail,initialCourse,onEdit, onCancel }) => {
 
    const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [mycourse,setMycourse] = useState(initialCourse)
  const [courses,setCourses] = useState([])

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const studentData = { name, email, mycourse  };
      
      await axios.put(`/student/${studentId}`, studentData);
      onEdit();
    } catch (error) {
      console.error(error);
    }
  };
  const handleOption = (e) => {
    e.preventDefault();
    setMycourse(e.target.value);
  };
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/course/course-list');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();

    const intervalId = setInterval(() => {
      fetchCourses();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []); 

  return (
  
    <div className='courseadd'>
    <h2>Edit Student</h2>
    <form onSubmit={handleUpdate}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div>
        <label>Email:</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
          <label>Course:</label>
          <select value={mycourse} onChange={handleOption} >
            
            {courses.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
         
          </div>

      <button type="submit">Update Student</button>
      <button type="button" onClick={onCancel} className='cancel' >Cancel</button>
    </form>
  </div>
  )
}

export default StudentEdit