import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export const SortPanel = ({setProducts}) => {
    const [ sortType, setSortType ] = useState('');

    const fetchApi = async () => {
        const response = await axios.get(`http://localhost:8000/products${sortType}`);
        const productsList = response.data;
        setProducts(productsList);
    }

    useEffect(() => {
        fetchApi();
    }, [sortType])

    const handleSortChange = (event) => {
        setSortType(event.target.value);
    }

    return (
        <div className='sort'>
        <FormControl sx={{ m: 1, minWidth: 140 }} size="medium">
            <InputLabel id="demo-select-medium">Sort by</InputLabel>
            <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={''}
                label='Sort by'
                onChange={handleSortChange}
                >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={'?_sort=count&_order=asc'}>Count ascening</MenuItem>
                <MenuItem value={'?_sort=count&_order=desc'}>Count descening</MenuItem>
                <MenuItem value={'?_sort=name&_order=asc'}>Name A-z</MenuItem>
                <MenuItem value={'?_sort=name&_order=desc'}>Name Z-a</MenuItem>
            </Select>
        </FormControl>
    </div>
  )
}
