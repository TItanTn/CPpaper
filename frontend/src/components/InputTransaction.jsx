import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Button, MenuItem, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import { useForm, Controller } from "react-hook-form";

const InputTransaction = ({ closeModal, snackResponse, user }) => {
    const { control, handleSubmit, formState, trigger } = useForm();
    const [AllUsersAndPasswords, setAllUsersAndPasswords] = useState([])
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { paperID } = useParams();

    const getCurrentTimestamp = () => {
        const date = new Date().toUTCString();
        return date
    }

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

    const onSubmit = async (data) => {
        const isValid = await trigger();
        if (isValid == false) {
            console.log("form is invalid")
        } else {
            if (!loading) {
                setSuccess(false);
                setLoading(true);

                if (isValid == true) {
                    const operator = AllUsersAndPasswords.find(User => User.username == user)
                    const newData = {
                        ...data,
                        timestamp: getCurrentTimestamp(),
                        paperId: Number(paperID),
                        employeeId: operator.id,
                        quantity: Number(data.Quantity),
                        transactionTypeId: Number(data.transactionTypeID)
                    }
                    const { Quantity: omitQuantity, transactionTypeID: omitTransactionTypeID, ...completeData } = newData
                    
                    try {
                        await fetch("https://localhost:7159/api/Transactions", {
                            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                            method: "POST",
                            body: JSON.stringify(completeData),
                        })
                            .then((response) => {
                                const statusCode = response.status
                                setLoading(false)
                                if (statusCode == 201) {
                                    setSuccess(true);
                                    window.setTimeout(() => {
                                        closeModal();
                                        snackResponse('success');
                                    }, 1000)
                                } else {
                                    window.setTimeout(() => {
                                        closeModal();
                                        //this snack response will be thrown when any error happens not just when they reserve more than the current quantity
                                        snackResponse('bottom out');
                                        console.log("an error has occured please try again")
                                    }, 1000)
                                }
                            })
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
        }
    }

    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    useEffect(() => {
        handleAllUsers()
    }, [])

    return (
        <section className='InputTransaction'>
            <h1>Transaction</h1>
            <form style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                height: "100%",
            }} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="Quantity"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Quantity is required' }}
                    render={({ field }) => (
                        <TextField
                            className='wide'
                            {...field}
                            id="outlined-brand"
                            label="Quantity"
                            type="number"
                            error={!!formState.errors?.Quantity}
                            helperText={formState.errors?.Quantity?.message}
                        />
                    )}
                />
                <FormControl component="fieldset">
                    <FormLabel component="legend">Transaction Type:</FormLabel>
                    <Controller
                        name="transactionTypeID"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Please select a type' }}
                        render={({ field }) => (
                            <RadioGroup {...field}>
                                <FormControlLabel value={1} control={<Radio />} label="Reserve" />
                                <FormControlLabel value={2} control={<Radio />} label="Receive" />
                            </RadioGroup>
                        )}
                    />
                    {formState.errors.transactionTypeID && (
                        <div
                            style={{
                                fontSize: "12px",
                                color: "#d32f2f",
                                paddingLeft: "14px",
                                paddingTop: "5px"
                            }}
                        >
                            {formState.errors.transactionTypeID.message}
                        </div>
                    )}
                </FormControl>
                <Box sx={{ m: 1, position: 'relative' }}>
                    <Button
                        className="wide"
                        type="submit"
                        variant="contained"
                        sx={buttonSx}
                        disabled={loading}
                    >
                        Complete
                    </Button>
                    {loading && (
                        <CircularProgress
                            size={24}
                            sx={{
                                color: green[500],
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                            }}
                        />
                    )}
                </Box>
            </form>
        </section>
    );
}

export default InputTransaction