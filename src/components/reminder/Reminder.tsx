import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { host } from '../../utils/config';
import { saveListToState } from '../../redux/listsSlice';
import { IReminder } from '../../interfaces/Reminder';
import './reminder.scss';

const Reminder = (reminder: IReminder) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const listId = id;
    const reminderId = reminder.id;

    const refreshList = async () => {
        await axios.get(`${host}/lists/${listId}`)
            .then(res => {
                const updatedList = res.data[0];
                dispatch(saveListToState(updatedList));
            })
    };

    const markAsDone = async () => {
        await axios.post(`${host}/reminders/completed/${reminderId}`, { listId })
        refreshList();
    };

    const markAsToDo = async () => {
        await axios.post(`${host}/reminders/incomplete/${reminderId}`, { listId })
        refreshList();
    };

    const changeStatus = () => {
        if (reminder.completed === false) {
            markAsDone();
        } else {
            markAsToDo();
        };
    };

    const deleteReminder = async () => {
        await axios.post(`${host}/reminders/delete/${reminderId}`, { listId })
        refreshList();
    };

    return (
        <section className={reminder.completed ? 'reminder reminder--grey' : 'reminder'}>
            <p className={reminder.completed ? 'reminder-txt reminder-txt--line-through' : 'reminder-txt'}>{reminder.description}</p>
            <div className='reminder__btns'>
                <button onClick={changeStatus}>{!reminder.completed ? 'Done' : 'Undo'}</button>
                <button onClick={deleteReminder}>Delete reminder</button>
            </div>
        </section>
    )
}

export default Reminder;