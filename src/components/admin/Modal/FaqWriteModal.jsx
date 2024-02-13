import React, { useState } from 'react';
import { Box, Typography, Modal, TextField, Button } from '@mui/material';
import SelectBox from "../../common/SelectBox/SelectBox";
import axios from 'axios';
import {adminApi} from "@api/Api";

const FaqModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '968px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function FaqWriteModal({ open, handleClose }) {
    const [faqData, setFaqData] = useState({
        faqType: '',
        faqTitle: '',
        faqContents: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFaqData({ ...faqData, [name]: value });
    };

    const handleFaqTypeChange = (selectedType) => {
        setFaqData({ ...faqData, faqType: selectedType });
    };    

    const handleFaqSubmit = async () => {
        try {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.error('Token is missing');
                return;
            }

            const updatedFaqData = { ...faqData, faqType: faqData.faqType.toLowerCase() };

            const response = await axios.post(
                `${adminApi}/board/faq`,
                updatedFaqData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log(response.data);

            handleClose();
        } catch (error) {
            console.error('Error submitting FAQ:', error);
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="faq-modal-title"
            aria-describedby="faq-modal-description"
        >
            <Box sx={FaqModalStyle}>
                <>
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        FAQ
                    </Typography>
                    <hr />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography id="notice-modal-title" sx={{ p: 2 }}>
                            유형
                        </Typography>
                        <SelectBox
                            text={'유형을 선택해 주세요'}
                            options={['회원', '주문/결제', '반품/환불', '마일리지']}
                            onChange={handleFaqTypeChange}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography id="notice-modal-title" sx={{ p: 2 }}>
                            제목
                        </Typography>
                        <TextField
                            size="small"
                            multiline
                            rows={0}
                            placeholder="제목을 입력하세요."
                            margin="normal"
                            sx={{ p: 0, width: '90%' }}
                            name="faqTitle"
                            value={faqData.faqTitle}
                            onChange={handleChange}
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
                            name="faqContents"
                            value={faqData.faqContents}
                            onChange={handleChange}
                        />
                    </Typography>
                    <Button variant="contained" sx={{ float: 'right' }} onClick={handleFaqSubmit}>
                        등록
                    </Button>
                </>
            </Box>
        </Modal>
    );
}

export default FaqWriteModal;
