import React from 'react';
import axios from 'axios';
import { host } from '../../utils/config';
import { IList } from '../../interfaces/List';
import { useDispatch, useSelector } from 'react-redux';
import { addListsToState } from '../../redux/listsSlice';
import { changeModalVisibility, selectModal } from '../../redux/modalSlice';

const ListItem = (list: IList) => {
  const modalVisible = useSelector(selectModal);
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
      console.log('before', modalVisible);
      dispatch(changeModalVisibility(true));
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