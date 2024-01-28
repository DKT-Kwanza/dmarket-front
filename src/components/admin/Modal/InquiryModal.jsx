import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Modal, TextField, Button } from '@mui/material';
import { formatDate } from '../../../utils/Format';

const InquiryModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '968px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function InquiryModal({ open, handleClose, inquiryId }) {
    const [inquiry, setInquiry] = useState(null);

    useEffect(() => {
        axios.get("/api/AdminInquiryDetailData.json")
            .then((response) => {
                setInquiry(response.data);
            })
            .catch((error) => {
                console.error("Error fetching Inquiry data: ", error);
            });
    }, [inquiryId]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="inquiry-modal-title"
            aria-describedby="inquiry-modal-description"
        >
            <Box sx={InquiryModalStyle}>
                {inquiry && (
                    <>
                        <Typography id="qna-modal-title" variant="h6" component="h2" sx={{ mt: 2 }}>
                            {inquiry.inquiryTitle}
                        </Typography>
                        <Typography sx={{ color: inquiry.inquiryStatus ? '#3377FF' : '#FF5D5D', mt: 2 }}>
                            {inquiry.inquiryStatus}
                        </Typography>
                        <Typography sx={{ mt: 2 }}>{inquiry.productName}</Typography>
                        <Typography sx={{ mt: 2 }}>
                            {inquiry.inquiryWriter} {formatDate(inquiry.inquiryCreatedDate)}
                        </Typography>
                        <hr />
                        <Typography sx={{ mt: 2, minHeight: 200 }}>
                            {inquiry.inquiryContents}
                        </Typography>
                        <hr />
                        {inquiry.inquiryStatus === '답변 대기'? (
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
                                <Typography sx={{ mt: 2 }}>관리자 {formatDate(inquiry.inquiryReplyDate)}</Typography>
                                <Typography sx={{ mt: 2 }}>{inquiry.inquiryReplyContents}</Typography>
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

export default InquiryModal;