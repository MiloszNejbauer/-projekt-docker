import React, { useState } from 'react';
import { Modal, Button } from '@mui/material';
import AddUserForm from "./AddUserForm";

export const AddUserModal = () => {
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <>
            <Button variant="contained" color="primary" onClick={handleOpenModal}>
                Dodaj użytkownika
            </Button>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <AddUserForm />
                    <Button onClick={handleCloseModal} color="primary">
                        Zamknij
                    </Button>
                </div>
            </Modal>
        </>
    );
};
