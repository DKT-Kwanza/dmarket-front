import React, {useState, useEffect} from 'react';
import {Box, Typography, Modal, Button} from '@mui/material';

const UserInfoModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '968px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function UserInfoModal({open, handleClose, userInfo}) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="faq-modal-title"
            aria-describedby="faq-modal-description"
        >
            <Box sx={UserInfoModalStyle}>
                <Typography variant="h6" sx={{mt: 2}}>
                    주문자 정보
                </Typography>
                <hr/>
                <Typography sx={{mt: 2}}>
                    {userInfo.userName}
                </Typography>
                <Typography sx={{mt: 2}}>
                    {userInfo.userPhoneNum}
                </Typography>
                <Typography variant="h6" sx={{mt: 2}}>
                    주소
                </Typography>
                <hr/>
                <Typography sx={{mt: 2}}>
                    {userInfo.userPostalCode}
                </Typography>
                <Typography sx={{mt: 2}}>
                    {userInfo.userAddress} {userInfo.userDetailedAddress}
                </Typography>
                <Button variant="contained" sx={{float: 'right'}}
                        onClick={handleClose}>확인</Button>
            </Box>
        </Modal>
    );
}

export default UserInfoModal;