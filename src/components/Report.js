import React from 'react'
import Modal from 'react-modal'

const Report = ({modalIsOpen, setOpen, reqClose}) => {
    return (
        <Modal isOpen={modalIsOpen} onRequestClose={reqClose}>
            <p>modal body</p>
            <button onClick={setOpen(false)}> close</button>
        </Modal>
    )
}

export default Report
