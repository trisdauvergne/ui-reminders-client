import React from 'react';
import './remindermodal.scss'
import { IList } from '../../../interfaces/List';

const ReminderModal = (list: IList) => {
    const id = list.id;
    console.log('in modal', id);
  return (
    <section className="modal">
        <h1>Add a reminder to {list.name}</h1>
    </section>
  )
}

export default ReminderModal