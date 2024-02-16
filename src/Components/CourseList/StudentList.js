import React from 'react'
import Table from 'react-bootstrap/Table';

const StudentList = ({ student, onEdit, onDelete }) => {



  return (
    <div className='courselist'>
      <h2>Student List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>student Name</th>
            <th>student email</th>
            <th>student course</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {student.map((student) => {

            return (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>
                  {student.course.map((item) => { return item.name })}
                </td>
                <td>
                  <button onClick={() => onEdit(student._id)} className='edit'>Edit</button>
                  <button onClick={() => onDelete(student._id)} className='delete'>Delete</button>
                </td>

              </tr>
            )
          })}

        </tbody>

      </Table>
    </div>
  )
}

export default StudentList