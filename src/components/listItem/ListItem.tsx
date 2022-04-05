import React from 'react';
import axios from 'axios';
import { host } from '../../config';
import { IList } from '../../interfaces/List';

const ListItem = (list: IList) => {
    const deleteList = () => {
      console.log('in deleteList', list, `${host}/${list.id}`);
      axios.delete(`${host}/lists/${list.id}`)
        .then(() => {
          console.log('Post deleted');
        })
    };

    return (
      <div>
          <h3>{list.name}</h3>
          <p>{list.description}</p>
          <p>ID: {list.id}</p>
          <button>Hide completed</button>
          <button>Add reminder to {list.name}</button>
          <button onClick={deleteList}>Delete {list.name}</button>
          <p>Reminders: {list.reminders && list.reminders.length > 0 ? `There are ${list.reminders.length} reminders in your list` : `No reminders`}</p>
          <button>View more</button>
          <button>Delete reminder</button>
      </div>
    )
}

export default ListItem;