import io from 'socket.io-client';
import { host } from './config';
import { IReminder } from '../interfaces/Reminder';
import { IList } from '../interfaces/List';

export const socket = io(host);

export const HandleReminderAlert = (reminder: IReminder, list: string, showAlertModal: Function) => {
    socket.emit('send_reminder', {
        message: `The reminder '${reminder.description}', has been added to the list '${list}'`
    });
    socket.on('receive_alert', (data) => {
        const message = data.message;
        console.log('New reminder broadcast: ', message);
        showAlertModal(message);
    })
}

export const handleListAlert = (list: IList, showAlertModal: Function) => {
    socket.emit('send_newlist', {
        message: `A new list called '${list.name}', has just been created`
    });
    socket.on('receive_alert', (data) => {
        const message = data.message;
        console.log('New list broadcast: ', message);
        showAlertModal(message);
    })
}

export const handleDeleteAlert = (list: string, showAlertModal: Function) => {
    socket.emit('send_deletelist', {
        message: `A list called '${list}', has just been deleted`
    });
    socket.on('receive_alert', (data) => {
        const message = data.message;
        console.log('Deleted list broadcast: ', message);
        showAlertModal(message);
    })
}

export const handleCompleteAlert = (reminder: string, status: boolean, showAlertModal: Function) => {
    if (status) {
        socket.emit('send_completed', {
            message: `A reminder called '${reminder}', has been marked as complete`
        });
        socket.on('receive_alert', (data) => {
            const message = data.message;
            console.log('Completed reminder broadcast: ', message);
            showAlertModal(message);
        });
    } 
    if (!status) {
        socket.emit('send_incomplete', {
            message: `A reminder called '${reminder}', has been marked as incomplete`
        });
        socket.on('receive_alert', (data) => {
            const message = data.message;
            console.log('Incomplete reminder broadcast: ', message);
            showAlertModal(message);
        });
    }
}

export const deleteReminderAlert = (reminder: string, showAlertModal: Function) => {
    socket.emit('send_deletereminder', {
        message: `A reminder called '${reminder}', has been deleted`
    });
    socket.on('receive_alert', (data) => {
        const message = data.message;
        console.log('Deleted reminder broadcast: ', message);
        showAlertModal(message);
    })
}
