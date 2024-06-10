import React from 'react'

interface ModalProps {
    children: React.ReactNode,
    modalId: string
}

const Modal: React.FC<ModalProps> = ({ children, modalId }) => {
    return (
        <dialog id={modalId} className='modal'>
            <div className='modal-box'>
                { children }
            </div>
            <form method='dialog' className='modal-backdrop'>
                <button>close</button>
            </form>
        </dialog>
    )
}

export default Modal
