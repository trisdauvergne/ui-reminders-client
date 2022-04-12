import io from 'socket.io-client';
import { host } from './config';
import { IReminder } from '../interfaces/Reminder';
import { IList } from '../interfaces/List';

const socket = io(host);

export const HandleReminderAlert = (reminder: IReminder, list: string, refreshPage: Function) => {
    socket.emit('send_reminder', {
        message: `The reminder '${reminder.description}', has been added to the list '${list}'`
    });
    socket.on('receive_reminder', (data) => {
        const message = data.message
        alert(message);
        refreshPage();
    })
}

export const handleListAlert = (list: IList, goToLists: Function) => {
    console.log('in handle list alert');
    socket.emit('send_newlist', {
        message: `A new list called '${list.name}', has just been created`
    });
    socket.on('receive_newlist', (data) => {
        const message = data.message
        alert(message);
        goToLists();
    })
}
//     socket.emit('send_reminder', {
//         message: `The reminder '${reminder.description}', has been added to the list '${list}'`
//     });
//     socket.on('receive_reminder', (data) => {
//         const message = data.message
//         alert(message);
//         refreshPage();
//     })
// }