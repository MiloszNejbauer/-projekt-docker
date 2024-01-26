import React, {useState} from "react";
import {Button, Modal} from "@mui/material";
import AddUserForm from "./AddUserForm";
import {UsersList} from "./UsersList";

export const ViewUserModal = () => {
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return(
        <>
            <Button variant="contained" color="primary" onClick={handleOpenModal}>
                Wyświetl użytkowników
            </Button>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <UsersList />
                    <Button onClick={handleCloseModal} color="primary">
                        Zamknij
                    </Button>
                </div>
            </Modal>
        </>
    )
}