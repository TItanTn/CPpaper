import TextField from '@mui/material/TextField';
import { useState } from 'react';

const Filters = () => {
    const [brand, setBrand] = useState("")
    const [size, setSize] = useState("")
    const [weight, setWeight] = useState("")
    const [finish, setFinish] = useState("")
    const [type, setType] = useState("")
    const [qoh, setQoh] = useState("")

    const handleBrandChange = (event) => {
        const { value } = event.target
        console.log(value)
        setBrand(value)
    }

    const handleSizeChange = (event) => {
        const { value } = event.target
        console.log(value)
        setSize(value)
    }

    const handleWeightChange = (event) => {
        const { value } = event.target
        console.log(value)
        setWeight(value)
    }

    const handleFinishChange = (event) => {
        const { value } = event.target
        console.log(value)
        setFinish(value)
    }

    const handleTypeChange = (event) => {
        const { value } = event.target
        console.log(value)
        setType(value)
    }

    const handleQohChange = (event) => {
        const { value } = event.target
        console.log(value)
        setQoh(value)
    }

    return (
        <div className="filters">
            <TextField
                    id="brand-filter"
                    label="Brand"
                    type='search'
                    variant='filled'
                    onChange={handleBrandChange}
                    value={brand}
                />
            <TextField
                    id="size-filter"
                    label="Size"
                    type='search'
                    variant='filled'
                    onChange={handleSizeChange}
                    value={size}
                />
            <TextField
                    id="weight-filter"
                    label="Weight"
                    type='search'
                    variant='filled'
                    onChange={handleWeightChange}
                    value={weight}
                />
            <TextField
                    id="finish-filter"
                    label="Finish"
                    type='search'
                    variant='filled'
                    onChange={handleFinishChange}
                    value={finish}
                />
            <TextField
                    id="type-filter"
                    label="Type"
                    type='search'
                    variant='filled'
                    onChange={handleTypeChange}
                    value={type}
                />
            <TextField
                    id="qoh-filter"
                    label="QOH"
                    type='search'
                    variant='filled'
                    onChange={handleQohChange}
                    value={qoh}
                />
            
        </div>
    )
}

export default Filters