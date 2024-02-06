import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Modal, TextField, Button } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { formatDate } from '../../../utils/Format';
import {adminApi} from "../../../Api";

const QnaModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '968px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function QnaModal({ open, handleClose, qnaId, fetchQnaList }) {
    const [qna, setQna] = useState(null);
    const [replyContent, setReplyContent] = useState('');
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        fetchQnaDetail();
    }, [qnaId, token]);

    const fetchQnaDetail = async () => {
        try {
            const response = await axios.get(`${adminApi}/products/qna/${qnaId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setQna(response.data.data);
        } catch (error) {
            console.error("Error fetching QnA data: ", error);
        }
    };

    const handleReplySubmit = async () => {
        try {
            await axios.post(`${adminApi}/products/qna/${qnaId}`, {
                qnaReplyContents: replyContent
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            alert("답변이 등록되었습니다.");
            fetchQnaDetail();
            fetchQnaList();
            setReplyContent('');
        } catch (error) {
            console.error("Error submitting reply: ", error);
        }
    };

    const handleReplyDelete = async () => {
        try {
            await axios.delete(`${adminApi}/products/qna/reply/${qna.qnaReplyId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            alert("답변이 삭제되었습니다.");
            fetchQnaDetail();
            fetchQnaList();
            setReplyContent('');
        } catch (error) {
            console.error("Error deleting reply: ", error);
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="qna-modal-title"
            aria-describedby="qna-modal-description"
        >
            <Box sx={QnaModalStyle}>
            {qna && (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            <Typography id="qna-modal-title" variant="h6" component="h2">
                                {qna.qnaTitle}
                            </Typography>
                            {qna.qnaIsSecret && (
                                <LockOutlinedIcon fontSize="small" sx={{ ml: 0.5 }} />
                            )}
                            <Typography sx={{ color: qna.qnaStatus === '답변 완료' ? '#3377FF' : '#FF5D5D', ml: 2 }}>
                                {qna.qnaStatus}
                            </Typography>
                        </Box>
                        <Typography sx={{ mt: 2 }}>{qna.productName}</Typography>
                        <Typography sx={{ mt: 2 }}>
                            {qna.qnaWriter} {formatDate(qna.qnaCreatedDate)}
                        </Typography>
                        <hr />
                        <Typography sx={{ mt: 2, minHeight: 200 }}>
                            {qna.qnaContents}
                        </Typography>
                        <hr />
                        {qna.qnaStatus === '답변 대기' ? (
                            <>
                                <TextField
                                fullWidth
                                multiline
                                rows={4}
                                placeholder="답변을 입력하세요."
                                margin="normal"
                                sx={{ mt: 2 }}
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                            />
                            <Button variant="outlined" sx={{ mt: 2, float: "right" }} onClick={handleReplySubmit}>
                                등록
                            </Button>
                            </>
                        ) : (
                            <>
                                <Typography sx={{ mt: 2 }}>관리자 {formatDate(qna.qnaReplyDate)}</Typography>
                                <Typography sx={{ mt: 2 }}>{qna.qnaReplyContents}</Typography>
                                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button variant="outlined" color="error" sx={{ mr: 2 }} onClick={handleReplyDelete}>
                                        답변 삭제
                                    </Button>
                                    <Button variant="outlined" onClick={handleClose}>확인</Button>
                                </Box>
                            </>
                        )}
                    </>
                )}
            </Box>
        </Modal>
    );
}

export default QnaModal;