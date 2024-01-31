import React, {useState, useEffect} from 'react';
import {Box, Typography, Modal, TextField, Button} from '@mui/material';
import {formatDate} from '../../../utils/Format';

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

function NoticeModal({open, handleClose, noticeId, noticeList}) {
    const [notice, setNotice] = useState(null);

    useEffect(() => {
        if (noticeId && noticeList && noticeList.length > 0) {
            const selectedNotice = noticeList.find(item => item.noticeId === noticeId);
            setNotice(selectedNotice || null);
        }
    }, [noticeId, noticeList]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="notice-modal-title"
            aria-describedby="notice-modal-description"
        >
            <Box sx={NoticeModalStyle}>
                {notice &&
                    <>
                        <Typography variant="h6" sx={{mt: 2}}>
                            공지사항
                        </Typography>
                        <hr/>
                        <Typography id="notice-modal-title" variant="h6" component="h2" sx={{mt: 2}}>
                            {notice.noticeTitle}
                        </Typography>
                        <Typography sx={{mt: 2}}>
                            관리자 {formatDate(notice.noticeCreatedDate)}
                        </Typography>
                        <hr/>
                        <Typography sx={{mt: 2, minHeight: 200}}>
                            {notice.noticeContents}
                        </Typography>
                        <Button variant="contained" sx={{float: 'right'}}
                                onClick={handleClose}>확인</Button>
                    </>
                }
            </Box>
        </Modal>
    );
}

export default NoticeModal;