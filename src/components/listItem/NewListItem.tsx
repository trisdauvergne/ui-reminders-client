import React, { useEffect } from 'react';
import axios from 'axios';
import { host } from '../../utils/config';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    saveListToState,
    selectSavedList,
    // selectLists,
    // addListsToState
} from '../../redux/listsSlice';
import {
    selectViewMoreModal,
    selectReminderModal,
    changeReminderModalVisibility,
    changeViewMoreModalVisibility } from '../../redux/modalSlice';
import ModalAddReminder from '../modalAddReminder/ModalAddReminder';
import ModalViewMore from '../modalViewMore/ModalViewMore';

const NewListItem = () => {
    const { id } = useParams();
    const list = useSelector(selectSavedList);
    const viewMoreModal = useSelector(selectViewMoreModal);
    const addReminderModal = useSelector(selectReminderModal);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`${host}/lists/${id}`)
        .then(res => {
            const listData = res.data[0];
            dispatch(saveListToState(listData));
        });
    }, [addReminderModal]);

    const showAddReminderModal = () => {
        dispatch(changeReminderModalVisibility(true));
    };

    const showViewMoreModal = () => {
        dispatch(changeViewMoreModalVisibility(true));
    };

    if (list) {
        return (
            <div>
                {addReminderModal && <ModalAddReminder />}
                {viewMoreModal && <ModalViewMore />}
                <h1>{list.name}</h1>
                <p>Description: {list.description}</p>
                <p>ID: {list.id}</p>
                {list.reminders && list.reminders.length > 0 && <p>There are {list.reminders.length} reminders</p>}
                <button onClick={showAddReminderModal}>Add a reminder</button>
                <button>Delete list</button>
                <button onClick={showViewMoreModal}>View more</button>
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