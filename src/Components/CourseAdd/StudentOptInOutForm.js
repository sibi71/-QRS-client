import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentOptInOutForm = ({ onSubmit }) => {
    const [students, setStudents] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [studentId, setStudentId] = useState('');
    const [trainingScheduleId, setTrainingScheduleId] = useState('');
    const [optAction, setOptAction] = useState('opt-in');
    useEffect(() => {

        axios.get('/student/students-list')
            .then(response => setStudents(response.data))
            .catch(error => console.error(error));

        axios.get('/training/training-schedules-list')
            .then(response => setSchedules(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const requestData = { trainingScheduleId };

            if (optAction === 'opt-in') {
                await axios.post(`/student/${studentId}/opt-in`, requestData);
            } else {
                await axios.post(`/student/${studentId}/opt-out`, requestData);
            }

            setStudentId('');
            setTrainingScheduleId('');
            onSubmit();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='courseadd'>
            <h2>Student Opt-In/Opt-Out</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Student:</label>
                    <select value={studentId} onChange={(e) => setStudentId(e.target.value)}>
                        <option value="" disabled>Select a student</option>
                        {students.map(student => (
                            <option key={student._id} value={student._id}>
                                {student.name} - {student.email}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Training Schedule:</label>
                    <select value={trainingScheduleId} onChange={(e) => setTrainingScheduleId(e.target.value)}>
                        <option value="" disabled>Select a training schedule</option>
                        {schedules.map(schedule => (
                            <option key={schedule._id} value={schedule._id}>
                                Course: {schedule.courseId} - Date: {schedule.date}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Action:</label>
                    <select value={optAction} onChange={(e) => setOptAction(e.target.value)}>
                        <option value="opt-in">Opt-In</option>
                        <option value="opt-out">Opt-Out</option>
                    </select>
                </div>


                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default StudentOptInOutForm;
