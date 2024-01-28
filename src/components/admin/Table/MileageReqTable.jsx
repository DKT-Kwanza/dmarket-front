import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import { formatDate, formatPrice } from '../../../utils/Format';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ConfirmCancelModal from '../../commmon/Modal/ConfirmCancelModal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MileageReqTable({ headers, rows }) {
    const navigate = useNavigate();
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const [isRefuseModalOpen, setIsRefuseModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    const openApproveModal = (request) => {
        setSelectedRequest(request);
        setIsApproveModalOpen(true);
    };

    const closeApproveModal = () => {
        setIsApproveModalOpen(false);
    };

    const handleApprove = () => {
        // 승인 처리 API 추가
        console.log('Approving:', selectedRequest);
        closeApproveModal();
    };

    const openRefuseModal = (request) => {
        setSelectedRequest(request);
        setIsRefuseModalOpen(true);
    };

    const closeRefuseModal = () => {
        setIsRefuseModalOpen(false);
    };

    const handleRefuse = () => {
        // 거부 처리 API 추가
        console.log('Refusing:', selectedRequest);
        closeRefuseModal();
    };

    return (
        <div>
            <TableContainer component={Paper} sx={{ mb: 2 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {headers.map((header) => (
                                <TableCell>{header}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((item, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {formatDate(item.mileageReqDate)}
                                </TableCell>
                                <TableCell>{item.userName}</TableCell>
                                <TableCell>{item.userEmail}</TableCell>
                                <TableCell
                                    sx={{
                                        color: item.mileageReqReason === '충전' ? '#3377FF' : '#FF5D5D',
                                    }}
                                >
                                    {item.mileageReqReason}
                                </TableCell>
                                <TableCell>{formatPrice(item.mileageCharge)} P</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        sx={{ mr: '20px' }}
                                        onClick={() => openApproveModal(item)}
                                    >
                                        승인
                                    </Button>
                                    <Button 
                                        variant="outlined" 
                                        color="error"
                                        onClick={() => openRefuseModal(item)}
                                    >
                                        거부
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {isApproveModalOpen && (
                <ConfirmCancelModal
                    isOpen={isApproveModalOpen}
                    onClose={closeApproveModal}
                    onConfirm={handleApprove}
                >
                    마일리지 요청을 승인하시겠습니까?
                </ConfirmCancelModal>
            )}
            {isRefuseModalOpen && (
                <ConfirmCancelModal
                    isOpen={isRefuseModalOpen}
                    onClose={closeRefuseModal}
                    onConfirm={handleRefuse}
                >
                    마일리지 요청을 거부하시겠습니까?
                </ConfirmCancelModal>
            )}
        </div>
    );
}
