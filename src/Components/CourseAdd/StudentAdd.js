import React, { useEffect, useState } from 'react';
import axios from '../../axios';

const StudentAdd = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mycourse,setMycourse] = useState(" ")
  const [courses, setCourses] = useState([]); 
  
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const studentData = { name, email ,mycourse };
      console.log(mycourse , studentData);
      await axios.post('/student/students-add', studentData);
      setName('');
      setEmail('');
      onSubmit();
    } catch (error) {
      console.error(error);
    }
  };

  const handleOption = (e)=> {

    const event = e.target.value ;
    console.log(event);
    setMycourse(event)

  }
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
      <h2>Create Student</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
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

        <button type='submit'>Create Student</button>
      </form>
    </div>
  );
};

export default StudentAdd;
