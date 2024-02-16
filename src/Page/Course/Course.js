import React, { useState, useEffect } from 'react';
import "./Course.css"
import axios from '../../axios';
import CourseList from '../../Components/CourseList/CourseList'
import CourseEdit from '../../Components/CourseEdit/CourseEdit';
import CourseAdd from '../../Components/CourseAdd/CourseAdd';
import Home from '../Home/Home';


const Course = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    axios.get('/course/course-list')
      .then(response => setCourses(response.data))
      .catch(error => console.error(error));
  };

  const handleEdit = (courseId) => {
    const courseToEdit = courses.find(course => course._id === courseId);
    setEditingCourse(courseToEdit);
  };

  const handleEditCancel = () => {
    setEditingCourse(null);
  };

  const handleEditSubmit = () => {
    setEditingCourse(null);
    fetchCourses();
  };

  const handleDelete = async (courseId) => {
    try {
      await axios.delete(`/course/${courseId}`);
      fetchCourses();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='course'>

      {editingCourse ? (
        <CourseEdit
          key={editingCourse._id}
          courseId={editingCourse._id}
          initialName={editingCourse.name}
          initialDescription={editingCourse.description}
          onEdit={handleEditSubmit}
          onCancel={handleEditCancel}
        />
      ) : (
        <>
          <CourseAdd onSubmit={fetchCourses} />
          <CourseList courses={courses} onEdit={handleEdit} onDelete={handleDelete} />
          
        </>

      )}
      
    </div>
  );
};

export default Course;
