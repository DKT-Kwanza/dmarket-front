import React from 'react';
import { ReactComponent as ChevronDown } from "../../../assets/icons/chevron-down.svg";
import { ReactComponent as ChevronUp } from "../../../assets/icons/chevron-up.svg";
import './CustomerCenterFAQItem.css';

function CustomerCenterFAQItem({ faqTitle, isExpanded, onToggle, children }) {
  return (
    <div>
      <div className='faq-main-menu-display' onClick={onToggle}>
        <div className='faq-main-menu-text'>{faqTitle}</div>
        <div className='faq-main-menu-button-faq'>
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </div>
      </div>
      {isExpanded && <div className='faq-main-menu-expanded-content'>{children}</div>}
      <div className='faq-main-menu-line'/>
    </div>
  );
}

export default CustomerCenterFAQItem;
