import React, { useState} from 'react';
import axios from 'axios';
import { host } from '../../utils/config';
import { IList } from '../../interfaces/List';
import { useDispatch } from 'react-redux';
import { addListsToState } from '../../redux/listsSlice';
import ReminderModal from '../modals/reminderModal/ReminderModal';

const ListItem = (list: IList) => {
  const [ reminderModalVisible, setReminderModalVisible ] = useState(false);
    const dispatch = useDispatch();

    const refreshPage = async () => {
      await axios.get(`${host}/lists`)
      .then(res => {
        const listData = res.data;
        dispatch(addListsToState(listData));
      })
    };

    const addReminderToList = async () => {
      console.log('in add reminder to list function');
      setReminderModalVisible(!reminderModalVisible);
    }
    
    const deleteList = async () => {
      console.log('in deleteList', list, `${host}/${list.id}`);
      await axios.delete(`${host}/lists/${list.id}`)
        .then(() => {
          console.log('Post deleted');
        });
      refreshPage();
    };

    return (
      <div>
          {reminderModalVisible && <ReminderModal {...list}/>}
          <h3>{list.name}</h3>
          <p>{list.description}</p>
          <p>ID: {list.id}</p>
          <button>Hide completed</button>
          <button onClick={addReminderToList}>Add reminder to {list.name}</button>
          <button onClick={deleteList}>Delete {list.name}</button>
          <p>Reminders: {list.reminders && list.reminders.length > 0 ? `There are ${list.reminders.length} reminders in your list` : `No reminders`}</p>
          <button>View more</button>
          <button>Delete reminder</button>
      </div>
    )
}

export default ListItem;