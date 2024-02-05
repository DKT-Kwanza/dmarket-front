import React from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './NotificationModal.css'
import { formatDate } from '../../../../utils/Format';
import { notifyApi } from '../../../../Api';

const NotificationItem = ({ notification, setUnreadCount }) => {
    const navigate = useNavigate();
    const { content, url, isRead, notificationCreatedDate } = notification;
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');

    const handleClick = async () => {
        console.log(notification.notiId);
        if (!token || !userId) {
            console.error("No token or userId")
            return;
        }
        
        if (!notification.isRead) {
            try {
            await axios.put(notifyApi,{
                notiId : notification.notiId,
                receiver : userId
            },{
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            notification.isRead = true;
            setUnreadCount((prevCount) => prevCount - 1);
            navigate(url);
            }
            catch (e) {
                console.error("Error fetching data: ", e);
            }
        }
    };

    return (
        <li className={`notification-item ${isRead ? 'read' : 'unread'}`} onClick={handleClick}>
            <p className='notification-contents'>{content}</p>
            <span className='notification-date'>{formatDate(notificationCreatedDate)}</span>
        </li>
    );
};

export default NotificationItem;