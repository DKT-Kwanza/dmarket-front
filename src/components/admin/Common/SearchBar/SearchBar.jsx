import * as React from 'react';
import {useState} from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar({ text, onChange, onSearch, search }) {

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(search);
    };

    return (
        <Paper
            elevation={3}
            component="form"
            sx={{p: '2px 4px', mb: 4, display: 'flex', alignItems: 'center', width: '100%'}}
            onSubmit={handleSubmit}
        >
            <IconButton sx={{p: '10px'}} aria-label="menu">
                <MenuIcon/>
            </IconButton>
            <InputBase
                sx={{ml: 1, flex: 1}}
                placeholder={text ? text : "상품명 검색"}
                inputProps={{'aria-label': '상품명 검색'}}
                onChange={onChange}
            />
            <IconButton type="button" sx={{p: '10px'}} aria-label="search">
                <SearchIcon/>
            </IconButton>
        </Paper>
    );
}
