import React, {useState} from 'react';
import {Box, Typography, Modal, TextField, Button} from '@mui/material';

const NoticeModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '968px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function NoticeWriteModal({open, handleClose}) {
    const [notice, setNotice] = useState(null);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="notice-modal-title"
            aria-describedby="notice-modal-description"
        >
            <Box sx={NoticeModalStyle}>
                <>
                    <Typography variant="h6" sx={{mt: 2}}>
                        공지사항
                    </Typography>
                    <hr/>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Typography id="notice-modal-title" sx={{p: 2}}>
                            제목
                        </Typography>
                        <TextField
                            size="small"
                            multiline
                            rows={0}
                            placeholder="제목을 입력하세요."
                            margin="normal"
                            sx={{p: 0}}/>
                    </div>
                    <hr/>
                    <Typography sx={{mt: 2, minHeight: 200}}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            placeholder="내용을 입력하세요."
                            margin="normal"
                            sx={{mt: 2}}/>
                    </Typography>
                    <Button variant="contained" sx={{float: 'right'}}
                            onClick={handleClose}>등록</Button>
                </>
            </Box>
        </Modal>
    );
}

export default NoticeWriteModal;