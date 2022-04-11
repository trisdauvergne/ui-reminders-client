import React from 'react';

const Modal: React.FC = ({children}) => {
    return (
        <section className="modal">
            {children}
        </section>
    )
}

export default Modal;
