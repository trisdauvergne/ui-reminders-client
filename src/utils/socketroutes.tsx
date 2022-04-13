import io from 'socket.io-client';
import { host } from './config';
import { IReminder } from '../interfaces/Reminder';
import { IList } from '../interfaces/List';

export const socket = io(host);

export const HandleReminderAlert = (reminder: IReminder, list: string, refreshPage: Function) => {
    socket.emit('send_reminder', {
        message: `The reminder '${reminder.description}', has been added to the list '${list}'`
    });
    socket.on('receive_alert', (data) => {
        const message = data.message;
        console.log('New reminder broadcast: ', message);
        alert(message);
        refreshPage();
    })
}

export const handleListAlert = (list: IList, goToLists: Function) => {
    socket.emit('send_newlist', {
        message: `A new list called '${list.name}', has just been created`
    });
    socket.on('receive_alert', (data) => {
        const message = data.message;
        console.log('New list broadcast: ', message);
        alert(message);
        goToLists();
    })
}

export const handleDeleteAlert = (list: string, refreshPage: Function) => {
    socket.emit('send_deletelist', {
        message: `A list called '${list}', has just been deleted`
    });
    socket.on('receive_alert', (data) => {
        const message = data.message;
        console.log('Deleted list broadcast: ', message);
        alert(message);
        refreshPage();
    })
}

export const handleCompleteAlert = (reminder: string, refreshList: Function, status: boolean) => {
    if (status) {
        socket.emit('send_completed', {
            message: `A reminder called '${reminder}', has been marked as complete`
        });
        socket.on('receive_alert', (data) => {
            const message = data.message;
            console.log('Completed reminder broadcast: ', message);
            alert(message);
            refreshList();
        });
    } 
    if (!status) {
        socket.emit('send_incomplete', {
            message: `A reminder called '${reminder}', has been marked as incomplete`
        });
        socket.on('receive_alert', (data) => {
            const message = data.message;
            console.log('Incomplete reminder broadcast: ', message);
            alert(message);
            refreshList();
        });
    }
}

export const deleteReminderAlert = (reminder: string, refreshList: Function) => {
    socket.emit('send_deletereminder', {
        message: `A reminder called '${reminder}', has been deleted`
    });
    socket.on('receive_alert', (data) => {
        const message = data.message;
        console.log('Deleted reminder broadcast: ', message);
        alert(message);
        refreshList();
    })
}
