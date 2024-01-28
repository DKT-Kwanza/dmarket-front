import React, {useState} from 'react';
import {Box, Typography, Modal, TextField, Button} from '@mui/material';
import SelectBox from "../../commmon/SelectBox/SelectBox";

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

function FaqWriteModal({open, handleClose}) {
    const [notice, setNotice] = useState(null);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="faq-modal-title"
            aria-describedby="faq-modal-description"
        >
            <Box sx={FaqModalStyle}>
                <>
                    <Typography variant="h6" sx={{mt: 2}}>
                        FAQ
                    </Typography>
                    <hr/>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Typography id="notice-modal-title" sx={{p: 2}}>
                            유형
                        </Typography>
                        <SelectBox text={'유형을 선택해 주세요'} options={['회원', '주문/결제', '반품/환불', '마일리지']}/>
                    </div>
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
                            sx={{p: 0, width: '90%'}}/>
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

export default FaqWriteModal;