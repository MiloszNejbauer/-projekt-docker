import React, {useCallback, useState} from 'react';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddUserForm = () => {
    const [userName, setUserName] = useState('');
    const [userAge, setUserAge] = useState('');
    const [lastAdd, setLastAdd] = useState('')
    const addUser = useCallback(async (name, age) => {
        const url = `http://localhost:8080/user?name=${encodeURIComponent(name)}&age=${encodeURIComponent(age)}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log(response)
    }, []); //

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userName && userAge) {
            addUser(userName, userAge);
            setLastAdd(userName)
            setUserAge('');
            setUserName('');
            toast.success("dodano uzytkownika")
        } else {
            alert('Wypełnij oba pola: Name i Age.');
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className={"long-form"}>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </label>
                </div>
                <div className={"long-form"}>
                    <label>
                        Age:
                        <input
                            type="number"
                            value={userAge}
                            onChange={(e) => setUserAge(e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <button type="submit">Dodaj użytkownika</button>
                </div>
            </form>
            <div>
                Dodany użytkownik: {lastAdd}
            </div>
        </>
    );
};

export default AddUserForm;
