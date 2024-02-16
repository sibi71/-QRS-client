import React, { useState } from 'react'
import axios from "../../axios"
const CourseAdd = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const courseData = { name, description, };
      await axios.post('/course/course-add', courseData);
      setName('');
      setDescription('');
      onSubmit();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className='courseadd'>
      <h2>Create Course</h2>
      <form onSubmit={handleSubmit}>

        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <label>Description:</label>
          <textarea value={description} rows={5} cols={50} onChange={(e) => setDescription(e.target.value)} />

        </div>
        

        <button type="submit">Create Course</button>
      </form>
    </div>
  )
}

export default CourseAdd