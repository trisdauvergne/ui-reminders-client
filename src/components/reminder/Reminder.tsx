import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { host } from '../../utils/config';
import { saveListToState } from '../../redux/listsSlice';
import {
    saveAlertMessage,
    changeAlertModalVisibility
} from '../../redux/modalSlice';
import { IReminder } from '../../interfaces/Reminder';
import {
    handleCompleteAlert,
    deleteReminderAlert
} from '../../utils/socketroutes';
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

    const showAlertModal = (alert: string) => {
        console.log('in show alert modal', alert);
        refreshList();
        dispatch(saveAlertMessage(alert));
        dispatch(changeAlertModalVisibility(true));
    };

    const markAsDone = async () => {
        const status = true;
        await axios.post(`${host}/reminders/completed/${reminderId}`, { listId })
        handleCompleteAlert(reminder.description, status, showAlertModal);
        refreshList();
    };

    const markAsToDo = async () => {
        const status = false;
        await axios.post(`${host}/reminders/incomplete/${reminderId}`, { listId })
        handleCompleteAlert(reminder.description, status, showAlertModal);
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
        deleteReminderAlert(reminder.description, showAlertModal);
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