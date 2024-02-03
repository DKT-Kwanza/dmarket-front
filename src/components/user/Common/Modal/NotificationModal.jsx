import React from 'react';
import NotificationModalItem from './NotificationModalItem';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import './NotificationModal.css';

const NotificationModal = ({ notifications, onClose }) => {
    const navigate = useNavigate();
    const userId = sessionStorage.getItem('userId');

    const handleMoveToPage = () =>{
        navigate(`/mydkt/${userId}/mileageInfo`);
    }

    return (
        <div className="notification-modal cute-modal">
            <div className="notification-header">
                <IoClose onClick={onClose} className="close-icon"/>
            </div>
            <ul className="notification-list">
                {notifications.map((notification) => (
                    <NotificationModalItem key={notification.notiId} notification={notification} onClick={handleMoveToPage} />
                ))}
            </ul>
        </div>
    );
};

export default NotificationModal;
