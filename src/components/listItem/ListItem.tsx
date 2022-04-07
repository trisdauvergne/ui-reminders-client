import React, {
  useState
} from 'react';
import axios from 'axios';
import { host } from '../../utils/config';
import { IList } from '../../interfaces/List';
// import { IReminder } from '../../interfaces/Reminder';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { addListsToState } from '../../redux/listsSlice';
import {
  storeListToShare,
  selectList,
  selectViewMoreModal,
  selectReminderModal,
  changeReminderModalVisibility,
  changeViewMoreModalVisibility
} from '../../redux/modalSlice';
// import Modal from '../modal/Modal';
import { v4 as uuidv4 } from 'uuid';
import './listitem.scss';
import ModalAddReminder from '../modalAddReminder/ModalAddReminder';
import ModalViewMore from '../modalViewMore/ModalViewMore';

const ListItem = (list: IList) => {
  const viewMoreModalVisible = useSelector(selectViewMoreModal);
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
          console.log('List deleted');
        });
      refreshPage();
    };

    // const reminderModalJSX = 
    //   <>
    //     <h1>Add a reminder to {list.name}</h1>
    //     <p>{list.id}</p>
    //     <form onSubmit={(e) => createReminderObject(e)}>
    //       <label>Description</label>
    //       <p>Describe your reminder</p>
    //       <input
    //         type="text"
    //         name="reminder"
    //         onChange={e => setReminder(e.target.value)}
    //         value={reminder}
    //       />
    //       <button type="submit">Add reminder</button>
    //     </form>
    //     <button onClick={() => setReminderModalVisible(false)}>Hide modal</button>
    //   </>
    // ;

    // const viewMoreJSX = 
    // <>
    //   <h1>View moreeeee</h1>
    //   <p>Reminders: {list.reminders && list.reminders.length > 0 ? `There are ${list.reminders.length} reminders in your list` : `No reminders`}</p>
    //   {list.reminders!.map(reminder => <>
    //     <p>{reminder.description}</p>
    //     {reminder.completed ? <p>Finished</p> : <p>To be completed</p>}
    //     <button>Mark as complete</button>
    //   </>
    //   )}
    //   <button onClick={() => setViewMoreModalVisible(false)}>Hide modal</button>
    // </>
    
    const showReminderModal = () => {
      dispatch(storeListToShare(list));
      dispatch(changeReminderModalVisibility(true));
    };

    const showViewMoreModal = () => {
      console.log('in showViewMoreModal');
      dispatch(storeListToShare(list));
      dispatch(changeViewMoreModalVisibility(true));
    }

    return (
      <section className="list">
        {viewMoreModalVisible && <ModalViewMore />}
          <h3>{list.name}</h3>
          <p>{list.description}</p>
          <p>ID: {list.id}</p>
          <button>Hide completed</button>
          <button onClick={showReminderModal}>Add reminder</button>
          <button onClick={deleteList}>Delete {list.name}</button>
          <p>Reminders: {list.reminders && list.reminders.length > 0 ? `There are ${list.reminders.length} reminders in your list` : `No reminders`}</p>
          <button onClick={showViewMoreModal}>View more</button>
          <button>Delete reminder</button>
      </section>
    )
}

export default ListItem;