import React, {
  useState
} from 'react';
import axios from 'axios';
import { host } from '../../utils/config';
import { IList } from '../../interfaces/List';
import { IReminder } from '../../interfaces/Reminder';
import {
  useDispatch,
} from 'react-redux';
import { addListsToState } from '../../redux/listsSlice';
import Modal from '../modal/Modal';
import { v4 as uuidv4 } from 'uuid';

const ListItem = (list: IList) => {
    const [ reminderModalVisible, setReminderModalVisible ] = useState(false);
    const [ reminder, setReminder ] = useState<string>('');
    const dispatch = useDispatch();

    const refreshPage = async () => {
      await axios.get(`${host}/lists`)
      .then(res => {
        const listData = res.data;
        dispatch(addListsToState(listData));
      })
    };
    
    const deleteList = async () => {
      console.log('in deleteList', list, `${host}/${list.id}`);
      await axios.delete(`${host}/lists/${list.id}`)
        .then(() => {
          console.log('Post deleted');
        });
      refreshPage();
    };

    const sendReminderToBackEnd = (reminderToAdd: IReminder) => {
      console.log('sending to backend', reminderToAdd);
    }

    const createReminderObject = (e: any) => {
      e.preventDefault();
      const id = uuidv4().replace(/-/g, "");
      const reminderToAdd: IReminder = {
        description: reminder,
        id,
        notes: []
      };
      sendReminderToBackEnd(reminderToAdd);
      setReminder('');
      setReminderModalVisible(false);
    }

    const modalJsx = 
      <>
        <h1>Add a reminder to {list.name}</h1>
        <p>{list.id}</p>
        <form onSubmit={(e) => createReminderObject(e)}>
          <label>Description</label>
          <p>Describe your reminder</p>
          <input
            type="text"
            name="reminder"
            onChange={e => setReminder(e.target.value)}
            value={reminder}
          />
          <button type="submit">Add reminder</button>
        </form>
        <button onClick={() => setReminderModalVisible(false)}>Hide modal</button>
      </>
    ;

    return (
      <div>
        {reminderModalVisible && <Modal children={modalJsx} />}
          <h3>{list.name}</h3>
          <p>{list.description}</p>
          <p>ID: {list.id}</p>
          <button>Hide completed</button>
          <button onClick={() => setReminderModalVisible(true)}>Add reminder to {list.name}</button>
          <button onClick={deleteList}>Delete {list.name}</button>
          <p>Reminders: {list.reminders && list.reminders.length > 0 ? `There are ${list.reminders.length} reminders in your list` : `No reminders`}</p>
          <button>View more</button>
          <button>Delete reminder</button>
      </div>
    )
}

export default ListItem;