import React from 'react';
import { ReactComponent as ChevronDown } from "../../../assets/icons/chevron-down.svg";
import { ReactComponent as ChevronUp } from "../../../assets/icons/chevron-up.svg";
import './CustomerCenterNoticeItem.css'

function CustomerCenterNoticeItem({ noticeTitle, isExpanded, onToggle, noticeCreatedDate, children }) {
    return (
        <div>
            <div className='notice-main-menu-display'>
                <div onClick={onToggle} className='notice-main-menu-text'>
                    {noticeTitle}
                </div>
                <div className='notice-main-menu-date'>
                    {noticeCreatedDate}
                </div>
                <div className='notice-main-menu-button'>
                    {isExpanded ? <ChevronUp /> : <ChevronDown />}
                </div>
            </div>
            {isExpanded && (
                <div className='notice-main-menu-expanded-content'>
                    {children}
                </div>
            )}
            <div className='notice-main-menu-line'/>
        </div>
    );
}

export default CustomerCenterNoticeItem;

