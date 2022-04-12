import io from 'socket.io-client';
import { host } from './config';
import { IReminder } from '../interfaces/Reminder';

const socket = io(host);

export const HandleReminderAlert = (reminder: IReminder, list: string) => {
    socket.emit('send_reminder', {
        message: `The reminder '${reminder.description}', has been added to the list '${list}'`
    });
    socket.on('receive_reminder', (data) => {
        const message = data.message
        alert(message);
    })
}