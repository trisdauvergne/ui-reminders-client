import React from 'react';
import './modal.scss';

const Modal: React.FC = ({children}) => {
    return (
        <section className="modal">
            {children}
        </section>
    )
}

export default Modal;
