import React from 'react';
import axios from 'axios';
import NotificationModalItem from './NotificationModalItem';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import './NotificationModal.css';
import { notifyApi } from '@api/Api';

const NotificationModal = ({ notifications, setNotifications, onClose, setUnreadCount }) => {
    const navigate = useNavigate();
    const userId = sessionStorage.getItem('userId');
    const token = sessionStorage.getItem('token');
    //const [notis, setNotis] = useState(notifications);
    
    // 전체 삭제 눌렀을 때
    const handleDeleteAll = async() => {
        if (token && userId) {
            axios.delete(`${notifyApi}/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            .then(() => {
                setNotifications([]);
                setUnreadCount(0);
            })
            .catch((error) => {
                console.error('Could not fetch notifications', error);
            });
        }
    }
    
    // 전체 읽음 버튼 눌렀을 때
    const handleReadeAll = async() => {
        if (token && userId) {
            axios.put(`${notifyApi}/${userId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                notifications.map((notification) => {
                    notification.isRead = true;
                });
                setUnreadCount(0);
            })
            .catch((error) => {
                console.error('Could not fetch notifications', error);
            });
        }
    }

    return (
        <div className="notification-modal cute-modal">
            <div className="notification-header">
                <div>
                    <button className='notification-button' onClick={handleDeleteAll}>전체 삭제</button>
                    <button className='notification-button' onClick={handleReadeAll}>전체 읽음</button>
                </div>
                <IoClose onClick={onClose} className="close-icon"/>
            </div>
            <ul className="notification-list">
                {notifications && notifications.map((notification) => (
                    <NotificationModalItem key={notification.notiId} notification={notification} setUnreadCount={setUnreadCount} />
                ))}
            </ul>
        </div>
    );
};

export default NotificationModal;
