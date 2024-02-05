import React, { useState } from 'react';
import { Box, Typography, Modal, TextField, Button } from '@mui/material';
import axios from 'axios';

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

function NoticeWriteModal({ open, handleClose, fetchNotices }) {
    const [noticeTitle, setNoticeTitle] = useState('');
    const [noticeContents, setNoticeContents] = useState('');

    const handleNoticeSubmit = async () => {
        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('userId');

        if (!token || !userId) {
            console.error('Token or UserId is missing');
            return;
        }

        try {
            await axios.post('http://172.16.210.136:8080/api/admin/board/notice', {
                userId: parseInt(userId, 10),
                noticeTitle,
                noticeContents
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            alert('공지사항이 등록되었습니다.');
            handleClose();
            fetchNotices();
        } catch (error) {
            console.error('Error submitting notice:', error);
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="notice-modal-title"
            aria-describedby="notice-modal-description"
        >
            <Box sx={NoticeModalStyle}>
                <Typography variant="h6" sx={{ mt: 2 }}>
                    공지사항 작성
                </Typography>
                <hr />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography id="notice-modal-title" sx={{ p: 2 }}>
                        제목
                    </Typography>
                    <TextField
                        size="small"
                        multiline
                        rows={1}
                        placeholder="제목을 입력하세요."
                        margin="normal"
                        sx={{ p: 0, width: '90%' }}
                        value={noticeTitle}
                        onChange={(e) => setNoticeTitle(e.target.value)}
                    />
                </div>
                <hr />
                <Typography sx={{ mt: 2, minHeight: 200 }}>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        placeholder="내용을 입력하세요."
                        margin="normal"
                        sx={{ mt: 2 }}
                        value={noticeContents}
                        onChange={(e) => setNoticeContents(e.target.value)}
                    />
                </Typography>
                <Button variant="contained" sx={{ float: 'right' }} onClick={handleNoticeSubmit}>
                    등록
                </Button>
            </Box>
        </Modal>
    );
}

export default NoticeWriteModal;
