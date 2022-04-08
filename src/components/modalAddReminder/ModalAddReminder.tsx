import React, {
    FormEvent,
    useState
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    changeReminderModalVisibility,
    changeViewMoreModalVisibility,
} from '../../redux/modalSlice';
import {
    addListsToState,
    selectSavedList
} from '../../redux/listsSlice';
import { IReminder } from '../../interfaces/Reminder';
import axios from 'axios';
import { host } from '../../utils/config';
import '../modal/modal.scss';

const ModalAddReminder = () => {
    const [ reminder, setReminder ] = useState('');
    const list = useSelector(selectSavedList);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    const closeAddReminderModal = () => {
        dispatch(changeReminderModalVisibility(false));
    };
    const refreshPage = async () => {
        console.log('in refresh page');
        await axios.get(`${host}/lists`)
            .then(res => {
                const listData = res.data;
                dispatch(addListsToState(listData));
            })
        closeAddReminderModal();
        dispatch(changeViewMoreModalVisibility(true));
      };

    const sendReminderToBackEnd = async (reminderToAdd: IReminder) => {
        await axios.post(`${host}/reminders/${list.id}`, reminderToAdd)
            .then(res => {
                console.log('reminder added', res.data)
            })
        refreshPage();
        closeAddReminderModal();
    };

    const createReminderObject = (e: FormEvent) => {
        e.preventDefault();
        const id = uuidv4().replace(/-/g, "");
        const reminderToAdd: IReminder = {
            description: reminder,
            id,
            notes: []
        };
        sendReminderToBackEnd(reminderToAdd);
    };

  return (
    <div className="modal">
        <h1>Add reminder to list name</h1>
        <p>List ID</p>
        <button onClick={closeAddReminderModal}>Close modal</button>
        <form onSubmit={createReminderObject}>
            <label>Description</label>
            <p>Describe your reminder</p>
            <input type="text"
            name="reminder"
            onChange={e => setReminder(e.target.value)}
            value={reminder}
            />
            <button type="submit">Add reminder</button>
        </form>
    </div>
  )
}

export default ModalAddReminder