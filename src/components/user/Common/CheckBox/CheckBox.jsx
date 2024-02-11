import React from 'react';
import './CheckBox.css';

function CheckBox({ checked, onChange }) {
    return (
        <label className='label'>
            <input type="checkbox" checked={checked} onChange={onChange} />
            <span className="checkmark"></span>
        </label>
    );
}

export default CheckBox;