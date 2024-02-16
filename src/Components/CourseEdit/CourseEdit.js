import React, { useState } from 'react';
import axios from '../../axios';

const CourseEdit = ({ courseId, initialName, initialDescription, onEdit, onCancel }) => {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const courseData = { name, description };
      await axios.put(`/course/${courseId}`, courseData);
      onEdit();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='courseadd'>
      <h2>Edit Course</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>


        <button type="submit">Update Course</button>
        <button type="button" onClick={onCancel} className='cancel' >Cancel</button>
      </form>
    </div>
  );
};

export default CourseEdit;
