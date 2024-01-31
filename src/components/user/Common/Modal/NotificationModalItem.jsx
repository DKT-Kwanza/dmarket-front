import React from 'react';
import {useNavigate} from 'react-router-dom';
import './NotificationModal.css'
import { formatDate } from '../../../../utils/Format';

const NotificationItem = ({ notification }) => {
    const navigate = useNavigate();
    const { content, url, isRead, notificationCreatedDate } = notification;

    const handleClick = () => {
        navigate(url);
    };

    return (
        <li className={`notification-item ${isRead ? 'read' : 'unread'}`} onClick={handleClick}>
            <p className='notification-contents'>{content}</p>
            <span className='notification-date'>{formatDate(notificationCreatedDate)}</span>
        </li>
    );
};

export default NotificationItem;