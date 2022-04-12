import {
    FormEvent,
    useState,
    useEffect
} from 'react';
import {
    useNavigate
} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
    useSelector,
    useDispatch
} from 'react-redux';
import {
    changeAlertModalVisibility,
    changeReminderModalVisibility,
} from '../../redux/modalSlice';
import {
    addListsToState,
    selectSavedList
} from '../../redux/listsSlice';
import { IReminder } from '../../interfaces/Reminder';
import axios from 'axios';
import { host } from '../../utils/config';
import { HandleReminderAlert } from '../../utils/socketroutes';

const ModalAddReminder = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [ reminder, setReminder ] = useState('');

    const list = useSelector(selectSavedList);
    
    const closeAddReminderModal = () => {
        dispatch(changeReminderModalVisibility(false));
    };

    const refreshPage = async () => {
        await axios.get(`${host}/lists`)
        .then(res => {
            const listData = res.data;
            dispatch(addListsToState(listData));
        })
        navigate(`/viewlists`);
        closeAddReminderModal();
        navigate(`/viewlist/${list.id}`);
      };

    const sendReminderToBackEnd = async (reminderToAdd: IReminder) => {
        await axios.post(`${host}/reminders/${list.id}`, reminderToAdd);
        HandleReminderAlert(reminderToAdd, list.name, refreshPage);
        refreshPage();
        closeAddReminderModal();
    };

    const createReminderObject = (e: FormEvent) => {
        e.preventDefault();
        const id = uuidv4().replace(/-/g, "");
        if (reminder !== ' ') {
            const reminderToAdd: IReminder = {
                description: reminder,
                id,
                completed: false,
                notes: []
            };
            sendReminderToBackEnd(reminderToAdd);
        } else {
            alert('Please check you have typed a description into the box');
        }
    };

    return (
        <div className="modal">
            <button onClick={closeAddReminderModal}>Back to list</button>
            <h1>Add a reminder to {list.name}</h1>
            <form onSubmit={createReminderObject}>
                <label>Description</label>
                <p>Describe your reminder</p>
                <input type="text"
                name="reminder"
                onChange={e => setReminder(e.target.value)}
                value={reminder}
                required
                />
                <button type="submit">Add reminder</button>
            </form>
        </div>
    )
}

export default ModalAddReminder;