import React, { useState } from 'react';
import './CheckBox.css';

// function CheckBox() {
//     const [isPublicChecked, setIsPublicChecked] = useState(false);

//     const handleCheckboxChange = () => {
//         setIsPublicChecked((prev) => !prev);
//     };

//     return (
//         <label className='label'>
//             <input type="checkbox" checked={isPublicChecked} onChange={handleCheckboxChange} />
//             <span className="checkmark"></span>
//         </label>
//     )
// }

// export default CheckBox;

function CheckBox({ checked, onChange }) {
    return (
        <label className='label'>
            <input type="checkbox" checked={checked} onChange={onChange} />
            <span className="checkmark"></span>
        </label>
    );
}

export default CheckBox;