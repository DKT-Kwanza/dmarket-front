import {Toolbar, List, Divider, ListItemButton, ListSubheader} from '@mui/material';
import {Container, Drawer, CssBaseline, ListItemIcon, ListItemText, Collapse} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CampaignIcon from '@mui/icons-material/Campaign';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {createTheme} from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 260;

export const LeftNav = () => {

    const [openIndex, setOpenIndex] = useState(null);
    const navigate = useNavigate();
    const location = useLocation(); // 현재 페이지의 위치
    const [activePage, setActivePage] = useState('');

    useEffect(() => {
        const path = location.pathname.split('/admin/')[1];
        setActivePage(path);
    }, [location]);

    /* 해당 페이지일 경우 해당 버튼 black */
    const getButtonStyle = (buttonPath) => {
        return activePage === buttonPath ? { color: 'black' } : { color: '#A9AFB3' };
    }

    // onClick 발생 시 각각의 page 로 navigate
    const navigateToPage = (path) => {
        navigate(`/admin/${path}`);
    }

    // 메뉴를 클릭할 때 호출되는 함수
    const handleClick = (index) => {
        // 클릭된 메뉴의 인덱스와 현재 열려 있는 메뉴의 인덱스를 비교하여 상태 업데이트
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const MENU_LIST = [
        {title: '관리자 관리', list: ['관리자 목록']},
        {title: '사용자 관리', list: ['사용자 목록', '사용자 마일리지']},
        {title: '상품 관리', list: ['상품', '상품 Q&A', '상품리뷰', '재고/입고']},
        {title: '주문/배송 관리', list: ['배송상태 관리', '취소 요청', '반품 요청', '환불 요청']},
        {title: '고객센터 관리', list: ['문의 게시판', '공지사항', 'FAQ']},
    ];

    return (
        <Container>
            <CssBaseline/>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar>
                    <img
                        style={{width: '210px'}}
                        src={require('../../../../src/assets/images/logo.png')}/>
                </Toolbar>
                <Divider/>
                <List
                    sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Dmarket Administrator
                        </ListSubheader>
                    }
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <DashboardIcon/>
                        </ListItemIcon>
                        <ListItemText primary="대시보드"/>
                    </ListItemButton>
                    {
                        MENU_LIST.map((object, index) => (
                            <div key={object.title}>
                                <ListItemButton
                                    onClick={() => handleClick(index)}>
                                    <ListItemIcon>
                                        {[<SettingsIcon/>, <PersonOutlineIcon/>, <InventoryIcon/>,
                                            <LocalShippingIcon/>, <CampaignIcon/>][index]}
                                    </ListItemIcon>
                                    <ListItemText primary={object.title}/>
                                    {openIndex === index ? <ExpandLess/> : <ExpandMore/>}
                                </ListItemButton>
                                <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {
                                            object.list.map((list, listIndex) => (
                                                <ListItemButton
                                                    key={listIndex}
                                                    // onClick={navigateToPage('productMng/product')}
                                                    sx={{
                                                        '&:hover, &:focus': {color: 'text.primary'}
                                                    }}>
                                                    <ListItemText inset secondary={list}/>
                                                </ListItemButton>
                                            ))
                                        }
                                    </List>
                                </Collapse>
                            </div>
                        ))
                    }
                </List>
            </Drawer>
        </Container>
    );
}
export default LeftNav;