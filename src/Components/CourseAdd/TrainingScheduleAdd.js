import React, { useState, useEffect } from 'react';
import axios from '../../axios';
const TrainingScheduleAdd = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
      training_start: "",
      training_end: "",
      mycourse: ""
    });
  
    const [courses, setCourses] = useState([]);
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post("/training/training-schedules-add", formData);
        console.log("Training schedule added:", response.data);
        onSubmit();
      } catch (error) {
        console.error("Error adding training schedule:", error.message);
      }
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
      <div className='courseadd' >
        <h2>Create Training Schedule</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Training Start:
            <input
              type="datetime-local"
              name="training_start"
              value={formData.training_start}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Training End:
            <input
              type="datetime-local"
              name="training_end"
              value={formData.training_end}
              onChange={handleChange}
            />
          </label>
          <br />
          <div>
            <label>Course:</label>
            <select
              name="mycourse"
              value={formData.mycourse}
              onChange={handleChange}
            >
              {courses.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <br />
          <button type="submit">Add Training Schedule</button>
        </form>
      </div>
    );
  }
  
  export default TrainingScheduleAdd;