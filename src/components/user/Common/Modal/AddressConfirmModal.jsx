import React from 'react';
import './AddressConfirmModal.css';

const AddressConfirmModal = ({ isOpen, close, children }) => {
    if (!isOpen) return null;

    return (
        <div className="AddressConfirmModal-overlay">
            <div className="AddressConfirmModal-container">
                <div className="AddressConfirmModal-content">{children}</div>
                <button className="AddressConfirmModal-close-button" onClick={close}>등록하기</button>
            </div>
        </div>
    );
};

export default AddressConfirmModal;
