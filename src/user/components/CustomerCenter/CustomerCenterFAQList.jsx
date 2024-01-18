import React, { useState } from 'react';
import CustomerCenterFAQListItem from './CustomerCenterFAQItem';

function CustomerCenterFAQList({ items }) {
  const [expandedItem, setExpandedItem] = useState(null);

  const handleToggle = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  return (
    <div>
      {items.map((item, index) => (
        <CustomerCenterFAQListItem 
          key={index}
          question={item.question}
          isExpanded={expandedItem === index}
          onToggle={() => handleToggle(index)}
        >
          {item.content}
        </CustomerCenterFAQListItem>
      ))}
    </div>
  );
}

export default CustomerCenterFAQList;
