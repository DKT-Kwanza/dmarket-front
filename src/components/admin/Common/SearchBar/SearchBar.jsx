import * as React from 'react';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SearchBar({text, handleSearchInput}) {

    const navigate = useNavigate();
    //const location = useLocation();

    const [input, setInput] = useState();

    // const handleSearch = (e) => {
    //     if (e.key === 'Enter') {
    //         const query = e.target.value;
    //         navigate(`/memberMng/user?q=${encodeURIComponent(query)}`);
    //         setSearchInput("");
    //     }
    // };
    
    return (
        <Paper
            elevation={3}
            component="form"
            sx={{ p: '2px 4px', mb: 4, display: 'flex', alignItems: 'center', width: '100%' }}
        >
            <IconButton sx={{ p: '10px' }} aria-label="menu">
                <MenuIcon />
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={text ? text : "상품명 검색"}
                inputProps={{ 'aria-label': '상품명 검색' }}
                //onKeyPress={handleSearch}
                value={input}
                onChange={(e) => handleSearchInput(e.target.value)}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" >
                <SearchIcon/>
            </IconButton>
        </Paper>
    );
}
