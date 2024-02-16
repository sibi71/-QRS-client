import React, { useEffect, useState } from 'react'
import "./Student.css"
import axios from '../../axios';
import StudentEdit from '../../Components/CourseEdit/StudentEdit';
import StudentList from '../../Components/CourseList/StudentList';
import StudentAdd from '../../Components/CourseAdd/StudentAdd';
const Student = () => {
    const [student, setStudent] = useState([]);
    const [editingStudent, setEditingStudent] = useState(null);
    
    

    useEffect(() => {
        fetchstudent();
      }, []);
      const fetchstudent = () => {
        axios.get('/student/students-list')
          .then(response => setStudent(response.data))
          .catch(error => console.error(error));
      };
      const handleEdit = (studentId) => {
        const studentToEdit = student.find(student => student._id === studentId);
        setEditingStudent(studentToEdit);
      };
      const handleEditCancel = () => {
        setEditingStudent(null);
      }
      const handleEditSubmit = () => {
        setEditingStudent(null);
        fetchstudent();
      };
      const handleDelete = async (studentId) => {
        try {
          await axios.delete(`/student/${studentId}`);
          fetchstudent();
        } catch (error) {
          console.error(error);
        }
      };
     
  return (
    <div className='course'>

    {editingStudent ? (
      <StudentEdit
        key={editingStudent._id}
        studentId={editingStudent._id}
        initialName={editingStudent.name}
        initialEmail={editingStudent.email}
        initialCourse={editingStudent.course.map((item)=>{return item.value})}
        onEdit={handleEditSubmit}
        onCancel={handleEditCancel}
      />
    ) : (
      <>
        <StudentAdd onSubmit={fetchstudent} />
        <StudentList student={student} onEdit={handleEdit} onDelete={handleDelete} />
   
      </>

    )}

  </div>
  )
}

export default Student