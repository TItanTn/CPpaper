import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import CollegePressLogo from '../assets/CollegePressLogo.png';
import { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'

const SignIn = () => {
    const [AllUsersAndPasswords, setAllUsersAndPasswords] = useState([])
    const [snackState, setSnackState] = useState({
        open: false,
        message: 'Unknown Error'
    });
    const navigate = useNavigate();
    const { register, handleSubmit, formState: {errors} } = useForm()

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert ref={ref} variant="filled" {...props} />;
    });

    const handleAllUsers = async () => {
        try {
            const rawUserInfo = await fetch("https://localhost:7159/api/Employees", {
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                method: "GET",
            })
            const jsonUserInfo = await rawUserInfo.json()
            setAllUsersAndPasswords(jsonUserInfo)

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        handleAllUsers()
    }, [])

    const handleWrongInfo = () => {
        setSnackState({
            open: true,
            message: 'Incorrect info',
        });
    };

    const handleClose = () => {
        setSnackState({
            ...snackState,
            open: false,
        });
    };

    return (
        <section className='sign-in-page'>
            <img src={CollegePressLogo} />
            <form className='sign-in-form' onSubmit={handleSubmit((data) => {
                const foundUsername = AllUsersAndPasswords.find(User => User.username == data.username.toLowerCase())
                const foundPassword = AllUsersAndPasswords.find(User => User.password == data.password.toLowerCase())
        
                if (!foundUsername || !foundPassword) {
                    handleWrongInfo()
                }
                else {
                    navigate(`/PaperInventory/${data.username}`)
                }
            })}>
                <TextField
                    required
                    id="filled-username-input-required"
                    label="Username"
                    type="Username"
                    autoComplete="current-password"
                    variant='filled'
                    {...register('username', { required: true })}
                />
                <TextField
                    required
                    id="filled-password-input-required"
                    label="Password"
                    type="Password"
                    autoComplete="current-password"
                    variant='filled'
                    {...register('password', { required: true })}
                />
                <Button type="sumbit" variant="contained">Sign In</Button>
            </form>
            <Snackbar
                open={snackState.open}
                onClose={handleClose}
                TransitionComponent={Slide}
                autoHideDuration={6000}
            >
                <Alert severity="error">{snackState.message}</Alert>
            </Snackbar>
        </section>
    )
}

export default SignIn