import React, {useState, useEffect} from 'react';
import {Box, Typography, Modal, Button} from '@mui/material';

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

function FaqModal({open, handleClose, faqId, faqList}) {
    const [faq, setFaq] = useState(null);

    useEffect(() => {
        if (faqId && faqList && faqList.length > 0) {
            const selectedFaq = faqList.find(item => item.faqId === faqId);
            setFaq(selectedFaq || null);
        }
    }, [faqId, faqList]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="faq-modal-title"
            aria-describedby="faq-modal-description"
        >
            <Box sx={FaqModalStyle}>
                {faq &&
                    <>
                        <Typography variant="h6" sx={{mt: 2}}>
                            FAQ
                        </Typography>
                        <hr/>
                        <Typography id="faq-modal-title" variant="h6" component="h2" sx={{mt: 2}}>
                            [{faq.faqType}] {faq.faqQuestion}
                        </Typography>
                        <hr/>
                        <Typography sx={{mt: 2, minHeight: 200}}>
                            {faq.faqAnswer}
                        </Typography>
                        <Button variant="contained" sx={{float: 'right'}}
                                onClick={handleClose}>확인</Button>
                    </>
                }
            </Box>
        </Modal>
    );
}

export default FaqModal;