import React from 'react';
import Table from 'react-bootstrap/Table';

const TrainingScheduleList = ({ schedules, onEdit, onDelete }) => {
  console.log(schedules);
  return (
    <div className='courselist'>
      <h2>TrainingSchedule List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>student Name</th>
            <th>student time</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedules) => {
            return (
              <tr key={schedules._id}>
                <td>{schedules.courseId.map((item) => { return item.name })}</td>
                <td> {schedules.courseId.map((item) => { return item.student.map((name) => { return name.name }) })}</td>
                <td>{schedules.training_start.slice(0, 16)}-{schedules.training_end.slice(0, 16)}</td>
                <td> <button onClick={() => onEdit(schedules._id)} className='edit'>Edit</button>
                  <button onClick={() => onDelete(schedules._id)} className='delete'>Delete</button></td>

              </tr>
            )
          })}

        </tbody>
      </Table>
    </div>
  );
};

export default TrainingScheduleList;
