import React from 'react'
import { IReminder } from '../../interfaces/Reminder'

const Reminder = (reminder: IReminder) => {
  return (
    <section>
        <p>{reminder.description}</p>
        <button>Delete reminder</button>
    </section>
  )
}

export default Reminder