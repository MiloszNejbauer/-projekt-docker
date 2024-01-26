import React, { useState, useEffect } from 'react';
import { Modal, Button, Box, Typography } from '@mui/material';

export const DogApiButton = () => {
    const [openModal, setOpenModal] = useState(false);
    const [dogData, setDogData] = useState(null);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    useEffect(() => {
        const fetchRandomDogData = async () => {
            try {
                const response = await fetch('https://dog.ceo/api/breeds/image/random');
                const data = await response.json();
                setDogData(data);
            } catch (error) {
                console.error('Error fetching dog data:', error);
            }
        };

        if (openModal) {
            fetchRandomDogData();
        }
    }, [openModal]);

    return (
        <div className="centered-container" style={{ marginTop: '20vh' }}>
            <Button variant="contained" color="primary" onClick={handleOpenModal}>
                Random doggo
            </Button>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    {dogData && (
                        <>
                            <img src={dogData.message} alt="Random Dog" style={{ maxWidth: '100%', marginBottom: '16px' }} />
                            <Typography>{dogData.status === 'success' ? 'Here is a random dog!' : 'Failed to fetch dog data.'}</Typography>
                        </>
                    )}
                </Box>
            </Modal>
        </div>
    );
};
