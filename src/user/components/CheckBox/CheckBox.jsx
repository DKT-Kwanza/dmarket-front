import './CheckBox.css';

function CheckBox() {

    return (
        <button type='button' className='custom-checkbox-after' checked='true'>
            <svg width="22" height="22" viewBox="1.5 1.5 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="Vector" d="M11.0757 17.8036L7.17573 13.4453C6.94142 13.1835 6.94142 12.759 7.17573 12.4971L8.02424 11.5489C8.25854 11.287 8.63846 11.287 8.87277 11.5489L11.5 14.4848L17.1272 8.19638C17.3615 7.93454 17.7415 7.93454 17.9758 8.19638L18.8243 9.14461C19.0586 9.40645 19.0586 9.83098 18.8243 10.0928L11.9243 17.8036C11.6899 18.0655 11.31 18.0655 11.0757 17.8036Z" fill="#363A3C"/>
            </svg>
        </button>
    )
}

export default CheckBox;