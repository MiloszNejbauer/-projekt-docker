import React, {useCallback, useState} from 'react';

const deleteUser = async (userId) => {
    try {
        const url = `http://localhost:8080/user/${userId}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            // Usuń użytkownika z lokalnej tablicy users
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        } else {
            console.error('Error deleting user:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting user:', error.message);
    }
};