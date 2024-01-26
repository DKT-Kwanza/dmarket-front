import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Modal, TextField, Button } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { formatDate } from '../../../utils/Format';

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

function QnaModal({ open, handleClose, qnaId }) {
    const [qna, setQna] = useState(null);

    useEffect(() => {
        axios.get("/api/AdminQnaDetailData.json")
            .then((response) => {
                setQna(response.data);
            })
            .catch((error) => {
                console.error("Error fetching QnA data: ", error);
            });
    }, [qnaId]);

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
                        <Typography id="qna-modal-title" variant="h6" component="h2" sx={{ mt: 2 }}>
                            {qna.qnaTitle}
                            {qna.qnaIsSecret && (
                                <LockOutlinedIcon fontSize="small" sx={{ ml: 0.5 }} />
                            )}
                        </Typography>
                        <Typography sx={{ color: qna.qnaStatus === '답변 완료' ? '#3377FF' : '#FF5D5D', mt: 2 }}>
                            {qna.qnaStatus}
                        </Typography>
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
                                />
                                <Button variant="outlined" sx={{ mt: 2, float: "right" }}>등록</Button>
                            </>
                        ) : (
                            <>
                                <Typography sx={{ mt: 2 }}>관리자 {formatDate(qna.qnaReplyDate)}</Typography>
                                <Typography sx={{ mt: 2 }}>{qna.qnaReplyContents}</Typography>
                                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button variant="outlined" color="error" sx={{ mr: 2 }}>답변 삭제</Button>
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