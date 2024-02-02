import React from 'react';
import NotificationModalItem from './NotificationModalItem';
import { IoClose } from 'react-icons/io5';
import './NotificationModal.css';

const NotificationModal = ({ notifications, onClose }) => {
    return (
        <div className="notification-modal cute-modal">
            <div className="notification-header">
                <IoClose onClick={onClose} className="close-icon"/>
            </div>
            <ul className="notification-list">
                {notifications.map((notification) => (
                    <NotificationModalItem key={notification.notiId} notification={notification} />
                ))}
            </ul>
        </div>
    );
};

export default NotificationModal;
