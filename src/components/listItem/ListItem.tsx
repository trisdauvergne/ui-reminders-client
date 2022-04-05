import React from 'react';
import { IList } from '../../interfaces/List';

const ListItem = (list: IList) => {
    console.log('in listItem', list);
  return (
    <div>
        <h3>{list.name}</h3>
        <p></p>
    </div>
  )
}

export default ListItem