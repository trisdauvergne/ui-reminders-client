import React, { useEffect } from 'react';
import axios from 'axios';
import { host } from '../../utils/config';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveListToState, selectSavedList } from '../../redux/listsSlice';
import {
    selectViewMoreModal,
    selectReminderModal,
    changeReminderModalVisibility,
    changeViewMoreModalVisibility } from '../../redux/modalSlice';
import ModalAddReminder from '../modalAddReminder/ModalAddReminder';

const NewListItem = () => {
    const { id } = useParams();
    const list = useSelector(selectSavedList);
    const viewMoreModal = useSelector(selectViewMoreModal);
    const addReminderModal = useSelector(selectReminderModal);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('in newlist item');
        axios.get(`${host}/lists/${id}`)
        .then(res => {
            const listData = res.data[0];
            dispatch(saveListToState(listData));
            console.log('in newlistitem', listData);
        })
    }, []);

    const showAddReminderModal = () => {
        console.log('in showaddremindermodal');
        dispatch(changeReminderModalVisibility(true));
    }

    if (list) {
        return (
            <div>
                {addReminderModal && <ModalAddReminder />}

                <h1>{list.name}</h1>
                <p>Description: {list.description}</p>
                <p>ID: {list.id}</p>
                {list.reminders && list.reminders.length > 0 && <p>There are reminders</p>}
                <button onClick={showAddReminderModal}>Add a reminder</button>
                <button>Delete list</button>
                <button>View more</button>
            </div>
        )
    } else {
        return (
            <div>
                <h3>Loading...</h3>
            </div>
        )
    }
}

export default NewListItem