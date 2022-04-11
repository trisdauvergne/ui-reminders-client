import React from 'react';
import {
    useDispatch,
    useSelector
} from 'react-redux';
import {
    changeViewMoreModalVisibility
} from '../../redux/modalSlice';
import {
    selectSavedList
} from '../../redux/listsSlice';
import { IReminder } from '../../interfaces/Reminder';
import Reminder from '../reminder/Reminder';

const ModalViewMore = () => {
    const dispatch = useDispatch();
    
    const list = useSelector(selectSavedList);
    
    const closeViewMoreModal = () => {
        dispatch(changeViewMoreModalVisibility(false));
    };

    return (
        <div className="modal">
            <button onClick={closeViewMoreModal}>Close modal</button>
            <h1>{list.name}</h1>
            <p>Description: {list.description}</p>
            {list.reminders && list.reminders.length > 0 && list.reminders.map((reminder: IReminder, i: number) => 
                <Reminder key={i} {...reminder} />
            )}
        </div>
    )
}

export default ModalViewMore;