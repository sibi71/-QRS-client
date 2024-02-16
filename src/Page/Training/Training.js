import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import TrainingScheduleList from '../../Components/CourseList/TrainingScheduleList';
import TrainingScheduleAdd from '../../Components/CourseAdd/TrainingScheduleAdd';
import TrainingScheduleEdit from '../../Components/CourseEdit/TrainingScheduleEdit';
const Training = ({courses}) => {
    const [schedules, setSchedules] = useState([]);
    const [editingSchedule, setEditingSchedule] = useState(null);

    useEffect(() => {
        fetchSchedules();
    }, []);

    const fetchSchedules = () => {
        axios.get('/training/training-schedules-list')
            .then(response => setSchedules(response.data))
            .catch(error => console.error(error));
    };

    const handleEdit = (scheduleId) => {
        const scheduleToEdit = schedules.find(schedule => schedule._id === scheduleId);
        setEditingSchedule(scheduleToEdit);
    };

    const handleEditCancel = () => {
        setEditingSchedule(null);
    };

    const handleEditSubmit = () => {
        setEditingSchedule(null);
        fetchSchedules();
    };

    const handleDelete = async (scheduleId) => {
        try {
            await axios.delete(`/training/${scheduleId}`);
            fetchSchedules();
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className='course'>


            {editingSchedule ? (
                <TrainingScheduleEdit
                    key={editingSchedule._id}
                    scheduleId={editingSchedule._id}
                    initialCourseId={editingSchedule.courseId.map((item)=>{return item._id})}
                    initialStart={editingSchedule.Training_start}
                    initialEnd={editingSchedule.Training_end}
                    initialStudent={editingSchedule.student}
                    onEdit={handleEditSubmit}
                    onCancel={handleEditCancel}
                />
            ) : (
                <>
                    <TrainingScheduleAdd onSubmit={fetchSchedules} courses={courses} />
                    <TrainingScheduleList schedules={schedules} onEdit={handleEdit} onDelete={handleDelete} />

                </>

            )}
        </div>
    )
}

export default Training