import * as React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button, IconButton, TablePagination, Typography,} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
   
    const [editMode, setEditMode] = useState(false);
   


   const deleteUser = async (userId) => {
    
        try {
            const url = `http://localhost:8080/user?id=${userId}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response)
            if (response.ok) {
                toast.success('Użytkownik został usuniety!')
                setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
            } else {
                console.error('Error deleting user:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting user:', error.message);
        }
    };
    
    

    const fetchUsers = useCallback(async () => {
        try {
            const url = 'http://localhost:8080/user';
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                console.error('Error fetching users:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching users:', error.message);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    function Row(props) {

        const { row } = props;
        const [editedName, setEditedName] = useState(row.name);
        const [editedAge, setEditedAge] = useState(row.age);
        const userId = props.userId

        const editUser = useCallback(async (newName, newAge) => {
            console.log(editedName)
            try {
                const url = `http://localhost:8080/user?id=${userId}&newName=${newName}&age=${newAge}`;
                const response = await fetch(url, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
               
                if (response.ok) {
                    const currentUsers = [...users];
        
                    const userIndex = currentUsers.findIndex((user) => user.id === userId);
        
                    const updatedUser = { ...currentUsers[userIndex] };
        
                    updatedUser.name = newName;
                    updatedUser.age = newAge;

                    currentUsers[userIndex] = updatedUser;

                    setUsers(currentUsers);
                    
                } else {
                    console.error('Error fetching users:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching users:', error.message);
            }
        }, [users]);

        
        const handleDeleteClick = () => {
            props.onClick();
        }

          const handleEditClick = () => {
            setEditMode(true);
          }
        
          const handleSaveClick = () => {
            editUser(editedName, editedAge)
            setEditMode(false);
          }
        
          const handleCancelClick = () => {
            setEditedName(row.name);
            setEditedAge(row.age);
            setEditMode(false);
          }
        
          return (
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
              <TableCell>
                {editMode ? (
                  <>
                    <Button variant="contained" color="primary" onClick={handleSaveClick}>
                      Zapisz
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={handleCancelClick}>
                      Anuluj
                    </Button>
                  </>
                ) : (
                  <Button variant="contained" color="primary" onClick={handleEditClick}>
                    Edytuj
                  </Button>
                )}
                <IconButton aria-label="delete" onClick={handleDeleteClick}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
              <TableCell align='left' component="th" scope="row" colSpan={2}>
                {editMode ? (
                  <>
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                    />
                    <input
                      type="text"
                      value={editedAge}
                      onChange={(e) => setEditedAge(e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    {row.name}
                    <br />
                    {row.age}
                  </>
                )}
              </TableCell>
            </TableRow>
          );
        }
    
    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Imię</TableCell>
                            <TableCell />
                            <TableCell>Wiek</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                                ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : users
                        ).map((user) => (
                            <Row key={user.id} 
                            userId = {user.id}
                            row={user} 
                            onClick={() => deleteUser(user.id)}
                            />
                            ))}
                    </TableBody>
                </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
        </div>
    );
};

//USUWANIE UZYTKOWNIKA

