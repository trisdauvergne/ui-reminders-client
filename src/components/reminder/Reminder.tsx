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

    const refreshList = async () => {
        console.log('in refresh lists');
        await axios.get(`${host}/lists/${listId}`)
            .then(res => {
                console.log('in refresh list', res.data);
                const updatedList = res.data[0];
                dispatch(saveListToState(updatedList));
            })
    }

    const deleteReminder = async () => {
        const reminderId = reminder.id;
        await axios.post(`${host}/reminders/delete/${reminderId}`, { listId })
            .then(res => console.log(`Reminder with ID ${res.data} deleted`))
        refreshList();
    };

    return (
        <section>
            <p>{reminder.description}</p>
            <button onClick={deleteReminder}>Delete reminder</button>
        </section>
    )
}

export default Reminder;