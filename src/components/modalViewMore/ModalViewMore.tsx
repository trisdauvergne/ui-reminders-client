import React from 'react';
import '../modal/modal.scss';
import {
    useDispatch,
    useSelector
} from 'react-redux';
import {
    selectViewMoreModal,
    selectReminderModal,
    changeViewMoreModalVisibility
} from '../../redux/modalSlice';

const ModalViewMore = () => {
    const dispatch = useDispatch();

    const closeViewMoreModal = () => {
        dispatch(changeViewMoreModalVisibility(false));
    }
  return (
    <div className="modal">
        <h1>View moreeeee</h1>
        <button onClick={closeViewMoreModal}>Close modal</button>
    </div>
  )
}

export default ModalViewMore