import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectModal, changeModalVisibility } from '../../redux/modalSlice';


const Modal = () => {
    const modalVisible = useSelector(selectModal);
    const dispatch = useDispatch();

    const hideModal = () => {
        dispatch(changeModalVisibility(false));
    }

    if (modalVisible) {
        return (
            <section>
                <h1>Modal</h1>
                <button onClick={hideModal}>Hide modal</button>
            </section>
        )
    } else {
        return (
            <section></section>
        )
    }
}

export default Modal;

// export const Modal: React.FC = ({
//     children,
// }) => (
//     <section>
//         {children}
//     </section>
// );