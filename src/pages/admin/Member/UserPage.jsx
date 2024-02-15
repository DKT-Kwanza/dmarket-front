import * as React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import LeftNav from "@components/admin/Sidebar/LeftNav";
import Header from "@components/admin/Header/Header";
import SearchBar from "@components/admin/Common/SearchBar/SearchBar";
import UserTable from "@components/admin/Table/UserTable";
import {Paper, Box, Button} from "@mui/material";
import {indigo} from "@mui/material/colors";
import axios from "axios";
import {adminApi} from "@api/Api";

const primary = indigo[50];
const drawerWidth = 260;

function MemberList() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [isData, setIsData] = useState(false);
    const [search, setSearch] = useState('')

    const token = sessionStorage.getItem('token');

    const tableHeader = ['이름', '사번', '이메일', '사용자', '입사일', ''];

    const handleSearch = async () => {
        try {
            const url = `${adminApi}/admin-user?q=${search}`;
            const response = await axios.get(url, {
                headers: {'Authorization': `Bearer ${token}`}
            });
            setRows(response.data.data[0]);
            setIsData(true);
            console.log(response.data.data[0]);
        } catch (e) {
            console.error(e);
            setIsData(false);
        }
    };

    const handleSearchInputChange = (event) => {
        const searchText = event.target.value;
        setSearch(searchText);
    };

    const navigateToRegister = () => {
        navigate('../memberMng/addUser');
    }

    return (
        <Box>
            <LeftNav/>
            <Header title={'사용자 목록'}/>
            {/*컨텐츠 영역입니다.*/}
            <Box
                bgcolor={primary}
                component="main"
                sx={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    p: 3,
                    mt: 9,
                    ml: `${drawerWidth}px`
                }}>
                <SearchBar text={'사용자 검색 : 이메일을 입력하세요'} onChange={handleSearchInputChange} onSearch={handleSearch}/>
                {
                    <Paper square elevation={2} sx={{p: '20px 30px'}}>
                        {isData && rows && <UserTable headers={tableHeader} rows={rows}/>}
                        <Button
                            variant="outlined"
                            sx={{float: 'right'}}
                            onClick={navigateToRegister}>
                            새로운 사용자 등록
                        </Button>
                    </Paper>
                }
            </Box>
        </Box>

    );
}

export default MemberList;