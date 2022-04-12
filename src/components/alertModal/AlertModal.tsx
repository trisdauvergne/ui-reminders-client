import React from 'react';
import {
    useSelector,
    useDispatch
} from 'react-redux';
import {
    selectAlertMessage,
    changeAlertModalVisibility,

} from '../../redux/modalSlice';
import './alertmodal.scss';

const AlertModal = () => {
    const alertMessage = useSelector(selectAlertMessage);
    const dispatch = useDispatch()

    const closeAlert = () => {
        dispatch(changeAlertModalVisibility(false));
    }

    return (
        <div className='alert-modal'>
            <h1>{alertMessage}</h1>
            <button onClick={closeAlert}>Close</button>
        </div>
    )
}

export default AlertModal