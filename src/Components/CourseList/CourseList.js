import React from 'react';
import Table from 'react-bootstrap/Table';

const CourseList = ({ courses, onEdit, onDelete }) => {

  return (
    <div className='courselist'>
      <h2>Course List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Description</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => {
            return (
              <tr key={course._id} >
                <td> {course.name}</td>
                <td>{course.description}</td>
                <td> <button onClick={() => onEdit(course._id)} className='edit'>Edit</button>
                  <button onClick={() => onDelete(course._id)} className='delete'>Delete</button></td>
              </tr>
            )
          })}

        </tbody>
      </Table>


    </div>
  );
};

export default CourseList;
