// TrainingScheduleEdit.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrainingScheduleEdit = ({ scheduleId, initialCourseId, initialStart,initialEnd, onEdit, onCancel }) => {
  const [courseId, setcourseId] = useState(initialCourseId);
 const [training_start,setTraining_start] = useState(initialStart)
 const [training_end,setTraining_end] = useState(initialEnd)
 const [courses,setCourses] = useState([])
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const scheduleData = { courseId, training_start,training_end };
      await axios.put(`/training/${scheduleId}`, scheduleData);
      onEdit();
    } catch (error) {
      console.error(error);
    }
  };
  const handleOption = (e) => {
    e.preventDefault();
    setcourseId(e.target.value);
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
    <form onSubmit={handleUpdate}>
      <label>
        Training Start:
        <input
          type="datetime-local"
          name="training_start"
          value={training_start}
          onChange={(e)=>setTraining_start(e.target.value)}
        />
      </label>
      <br />
      <label>
        Training End:
        <input
          type="datetime-local"
          name="training_end"
          value={training_end}
          onChange={(e)=>setTraining_end(e.target.value)}
        />
      </label>
      <br />
      <div>
        <label>Course:</label>
        <select
          name="mycourse"
          value={courseId}
          onChange={handleOption}
        >
          {courses.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <br />
      <button type="submit">Update Training Schedule</button>
      <button type="button" onClick={onCancel} className='cancel' >Cancel</button>
    </form>
  </div>
  );
};

export default TrainingScheduleEdit;
