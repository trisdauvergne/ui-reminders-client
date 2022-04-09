import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { host } from '../../utils/config';
import { saveListToState } from '../../redux/listsSlice';
import { IReminder } from '../../interfaces/Reminder';

const Reminder = (reminder: IReminder) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const listId = id;
    const reminderId = reminder.id;

    const refreshList = async () => {
        await axios.get(`${host}/lists/${listId}`)
            .then(res => {
                // console.log('in refresh list', res.data);
                const updatedList = res.data[0];
                dispatch(saveListToState(updatedList));
            })
    };

    const markAsDone = async () => {
        await axios.post(`${host}/reminders/completed/${reminderId}`, { listId })
            // .then(res => console.log('in markasdone', res.data))
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
        console.log('in delete reminder');
        await axios.post(`${host}/reminders/delete/${reminderId}`, { listId })
            // .then(res => console.log(`Reminder with ID ${res.data} deleted`))
        refreshList();
    };

    return (
        <section>
            <p>{reminder.description}</p>
            <p>{reminder.completed ? 'Done' : 'Not done'}</p>
            <button onClick={changeStatus}>{!reminder.completed ? 'Done' : 'Undo'}</button>
            <button onClick={deleteReminder}>Delete reminder</button>
        </section>
    )
}

export default Reminder;