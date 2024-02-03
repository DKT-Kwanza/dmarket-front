import React, { useState } from 'react';
import CustomerCenterFAQListItem from '../Item/CustomerCenterFAQItem';

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
          faqId={item.faqId}
          faqTitle={item.faqQuestion}
          isExpanded={expandedItem === index}
          onToggle={() => handleToggle(index)}
        >
          {item.faqAnswer}
        </CustomerCenterFAQListItem>
      ))}
    </div>
  );
}

export default CustomerCenterFAQList;
