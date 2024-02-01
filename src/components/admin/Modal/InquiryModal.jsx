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

function InquiryModal({ open, handleClose, inquiryId, fetchInquirys }) {
    const [inquiry, setInquiry] = useState(null);
    const [inquiryReplyContents, setInquiryReplyContents] = useState('');

    /* 세션 스토리지에서 토큰 가져오기 */
    const token = sessionStorage.getItem('token');

    const handleReplyChange = (event) => {
        setInquiryReplyContents(event.target.value); // TextField의 값이 변경될 때마다 상태 업데이트
    };

    useEffect(() => {
        fetchData();
    }, [inquiryId]);
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://172.16.210.136:8080/api/admin/board/inquiry/${inquiryId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            });
            setInquiry(response.data.data);
        } catch (e) {
            console.error("Error fetching Inquiry data: ", e);
        }
    };



    const handleReplySubmit = async () => { // "등록" 버튼 클릭 시 실행할 함수
        try {

            const response = await axios.post(`http://172.16.210.136:8080/api/admin/board/inquiry/reply/${inquiryId}`, {
                inquiryReplyContents
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            });
            setInquiry(response.data.data); // 응답으로 받은 데이터로 inquiry 상태 갱신
        } catch (e) {
            console.error("Error sending Inquiry data: ", e);
        }
    };

    const onDeleteClick = async () => {
        try {
            /* 삭제 API 호출 */
            const inquiryReplyId = inquiry.inquiryReplyId;
            const response = await axios.delete(`http://172.16.210.136:8080/api/admin/board/inquiry/reply/${inquiryReplyId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            });
            alert("해당 문의를 삭제합니다.");
            fetchData();
            handleClose();
        } catch (error) {
            console.error('Delete API 호출 실패:', error);
        }
    }

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
                            {inquiry.inquiryWriter} {formatDate(inquiry.inquiryCreateDate)}
                        </Typography>
                        <hr />
                        <Typography sx={{ mt: 2, minHeight: 200 }}>
                            {inquiry.inquiryContents}
                        </Typography>
                        <hr />
                        {!inquiry.inquiryStatus ? (
                            <>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    placeholder="답변을 입력하세요."
                                    margin="normal"
                                    sx={{ mt: 2 }}
                                    value={inquiryReplyContents} // TextField의 값으로 inquiryReplyContents 상태를 지정
                                    onChange={handleReplyChange} // 값이 변경될 때마다 handleReplyChange 함수 실행
                                />
                                <Button variant="outlined" sx={{ mt: 2, float: "right" }} onClick={handleReplySubmit}>등록</Button>
                            </>
                        ) : (
                            <>
                                <Typography sx={{ mt: 2 }}>관리자 {formatDate(inquiry.inquiryReplyDate)}</Typography>
                                <Typography sx={{ mt: 2 }}>{inquiry.inquiryReplyContents}</Typography>
                                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button variant="outlined" color="error" sx={{ mr: 2 }} onClick={onDeleteClick}>답변 삭제</Button>
                                    <Button variant="outlined" onClick={handleClose} >확인</Button>
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