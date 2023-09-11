import { FormControl, FormLabel, RadioGroup, FormControlLabel } from '@mui/material';
import Radio from '@mui/material/Radio';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

const FilterBox = () => {
    const [query, setQuery] = useState("")
    const [col, setCol] = useState()

    const handleQueryChange = (event) => {
        const { value } = event.target
        console.log(value)
        setQuery(value)
    }

    const handleColChange = (event) => {
        const { value } = event.target
        console.log(value)
        setCol(value)
    }

    return (
        <section className="filter-box">
            <h1>Filter</h1>
            <FormControl>
                <RadioGroup
                    name="FilterOptions"
                    value={col}
                    onChange={handleColChange}
                >
                    <FormControlLabel value="brand" control={<Radio />} label="Brand" />
                    <FormControlLabel value="size" control={<Radio />} label="Size" />
                    <FormControlLabel value="weight" control={<Radio />} label="Weight" />
                    <FormControlLabel value="finish" control={<Radio />} label="Finish" />
                    <FormControlLabel value="type" control={<Radio />} label="Type" />
                    <FormControlLabel value="qoh" control={<Radio />} label="QOH" />
                </RadioGroup>
            </FormControl>
            <TextField
                id="filter"
                label="Filter"
                type='search'
                variant='filled'
                onChange={handleQueryChange}
                value={query}
            />
        </section>
    )
}

export default FilterBox