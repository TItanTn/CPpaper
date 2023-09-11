import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import { Button, MenuItem, Box } from '@mui/material';
import x from "../assets/x.png";
import { useState } from "react";
import MyListSubheader from './MyListSubheader';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import { useForm, Controller } from "react-hook-form";

const PaperInputs = ({ closeModal, onSuccess }) => {
    const { control, handleSubmit, formState, trigger, getValues } = useForm();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const onSubmit = async (data) => {
        const isValid = await trigger();
        if (isValid == false) {
            console.log("form is invalid")
        } else {
            if (!loading) {
                setSuccess(false);
                setLoading(true);

                const width = getValues('width')
                const length = getValues('length')
                const size = `${length}x${width}`

                const newData = { ...data, size: size }
                const { width: omitWidth, length: omitLength, ...completeData } = newData;

                if (isValid == true) {
                    await fetch("https://localhost:7159/api/Papers", {
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
                                    onSuccess();
                                }, 1000)
                            } else {
                                window.setTimeout(() => {
                                    closeModal();
                                    console.log("an error has occured please try again")
                                }, 1000)
                            }
                        })
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

    return (
        <section
            style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                gap: "15px",
                height: "580px",
                width: "400px"
            }}
            className='InputPaper'
        >
            <h1>Paper</h1>
            <form style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                height: "100%",
            }} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="brand"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Brand is required' }}
                    render={({ field }) => (
                        <TextField
                            className='wide'
                            {...field}
                            id="outlined-brand"
                            label="Brand"
                            type="text"
                            error={!!formState.errors?.brand}
                            helperText={formState.errors?.brand?.message}
                        />
                    )}
                />
                <section className="flex-sb-aic">
                    <Controller
                        name="width"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Width is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Width"
                                type="number"
                                error={!!formState.errors?.width}
                                helperText={formState.errors?.width?.message}
                            />
                        )}
                    />
                    <img src={x} className="add-x" />
                    <Controller
                        name="length"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Length is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Length"
                                type="number"
                                error={!!formState.errors?.length}
                                helperText={formState.errors?.length?.message}
                            />
                        )}
                    />
                </section>
                <section className="flex-sb-aic">
                    <Controller
                        name="qoh"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Quantity is required' }}
                        render={({ field }) => (
                            <TextField
                                id="outlined-quantity"
                                {...field}
                                label="Quantity"
                                type="number"
                                error={!!formState.errors?.qoh}
                                helperText={formState.errors?.qoh?.message}
                            />
                        )}
                    />
                    <Controller
                        name="weight"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Weight is required' }}
                        render={({ field }) => (
                            <TextField
                                id="outlined-quantity"
                                {...field}
                                label="Weight"
                                type="number"
                                error={!!formState.errors?.weight}
                                helperText={formState.errors?.weight?.message}
                            />
                        )}
                    />
                </section>
                <Controller
                    name="finish"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'Finish is required' }}
                    render={({ field }) => (
                        <TextField
                            className='wide'
                            {...field}
                            id="outlined-finish"
                            label="Finish (ex. GLOSS, SILK, etc.)"
                            type="text"
                            error={!!formState.errors?.finish}
                            helperText={formState.errors?.finish?.message}
                        />
                    )}
                />
                <section className="flex-sb-aic">
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Select an option:</FormLabel>
                        <Controller
                            name="type"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Please select a type' }}
                            render={({ field }) => (
                                <RadioGroup {...field}>
                                    <FormControlLabel sx={{ paddingLeft: "10px" }} value="COVER" control={<Radio />} label="Cover" />
                                    <FormControlLabel sx={{ paddingLeft: "10px" }} value="TEXT" control={<Radio />} label="Text" />
                                </RadioGroup>
                            )}
                        />
                        {formState.errors.type && (
                            <div
                                style={{
                                    fontSize: "12px",
                                    color: "#d32f2f",
                                    paddingLeft: "14px",
                                    paddingTop: "5px"
                                }}
                            >
                                {formState.errors.type.message}
                            </div>
                        )}
                    </FormControl>
                    <Controller
                        name="locationId"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Location is required' }}
                        render={({ field }) => (
                            <FormControl sx={{ width: "50%" }} error={!!formState.errors?.locationId}>
                                <FormLabel component="legend">Location</FormLabel>
                                <Select {...field}>
                                    <MyListSubheader>Category 1</MyListSubheader>
                                    <MenuItem value={1}>Mailroom 1</MenuItem>
                                    <MenuItem value={2}>Mailroom 2</MenuItem>
                                    <MenuItem value={3}>Mailroom 3</MenuItem>
                                    <MenuItem value={4}>Mailroom 4</MenuItem>
                                    <MyListSubheader>Category 1</MyListSubheader>
                                    <MenuItem value={6}>CP Warehouse</MenuItem>
                                    <MenuItem value={7}>SAU Warehouse</MenuItem>
                                    <MyListSubheader>Category 1</MyListSubheader>
                                    <MenuItem value={5}>Hallway 1</MenuItem>
                                </Select>
                                {formState.errors?.location && (
                                    <div
                                        style={{
                                            fontSize: "12px",
                                            color: "#d32f2f",
                                            paddingLeft: "14px",
                                            paddingTop: "5px"
                                        }}
                                    >
                                        {formState.errors.locationId.message}
                                    </div>
                                )}
                            </FormControl>
                        )}
                    />
                </section>
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

export default PaperInputs