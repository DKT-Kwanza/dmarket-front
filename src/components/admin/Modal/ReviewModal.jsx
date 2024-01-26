import React from 'react';
import { Box, Typography, Modal, Button } from '@mui/material';
import { formatDate } from '../../../utils/Format';

const ReviewModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '968px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function ReviewModal({ open, handleClose, reviewData }) {

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="review-modal-title"
            aria-describedby="review-modal-description"
        >
            <Box sx={ReviewModalStyle}>
            {reviewData && (
                    <>
                        <Typography id="review-modal-title" variant="h6" component="h2">
                            {reviewData.productName}
                        </Typography>
                        <Typography sx={{ mt: 2 }}>{reviewData.optionName} ★{reviewData.reviewRating}</Typography>
                        <Typography sx={{ mt: 2 }}>
                            {reviewData.reviewWriter} {formatDate(reviewData.reviewCreatedDate)}
                        </Typography>
                        <hr />
                        {reviewData.reviewImg && <Box component="img" src={reviewData.reviewImg} alt="Review" sx={{ mt: 2 }} />}
                        <Typography sx={{ mt: 2, minHeight: 100 }}>{reviewData.reviewContents}</Typography>
                        <hr />
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="outlined" onClick={handleClose}>확인</Button>
                        </Box>
                    </>
                )}
            </Box>
        </Modal>
    );
}

export default ReviewModal;
