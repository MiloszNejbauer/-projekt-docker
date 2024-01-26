import React from 'react';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const PlayGameButton = () => {
    const navigate = useNavigate();

    const handlePlayGameClick = () => {
        // Użyj funkcji navigate do przejścia do "/game"
        navigate('/game');
    };

    return (
        <div className="centered-container" style={{ marginTop: '20vh' }}>
            {/* Dodaj obsługę kliknięcia przy użyciu nowo utworzonej funkcji */}
            <Button variant="contained" color="primary" onClick={handlePlayGameClick}>
                Play Game
            </Button>
        </div>
    );
}