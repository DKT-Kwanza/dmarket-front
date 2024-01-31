import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
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

export default function MileageReqTable({ headers, rows, fetchData }) {
    const navigate = useNavigate();
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const [isRefuseModalOpen, setIsRefuseModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    const token = sessionStorage.getItem('token');

    const openApproveModal = (request) => {
        setSelectedRequest(request);
        setIsApproveModalOpen(true);
    };
    
    const openRefuseModal = (request) => {
        setSelectedRequest(request);
        setIsRefuseModalOpen(true);
    };

    const handleApprove = async () => {
        const mileageReqId = selectedRequest.mileageReqId; 
    
        try {
            await axios.put(`http://172.16.210.136:8080/api/admin/users/mileage/approval/${mileageReqId}`, {}, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            alert("승인되었습니다!");
            closeApproveModal();
            fetchData();
        } catch (error) {
            console.error(error)
        }
    };

    const closeApproveModal = () => {
        setIsApproveModalOpen(false);
        fetchData(); 
    };

    const closeRefuseModal = () => {
        setIsRefuseModalOpen(false);
        fetchData();
    };

    const handleRefuse = async () => {
        const mileageReqId = selectedRequest.mileageReqId; 
    
        try {
            await axios.put(`http://172.16.210.136:8080/api/admin/users/mileage/refusal/${mileageReqId}`, {}, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            alert("거부되었습니다!");
            closeRefuseModal();
            fetchData(); 
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <TableContainer component={Paper} sx={{ mb: 2 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {headers.map((header, index) => (
                                <TableCell key={index}>{header}</TableCell>
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
