const MsgDropDown = ({ value, setMsgIdentify, setIsOpen, isOpen }) => {
    const ValueClick = () => {
        setMsgIdentify(value)
        setIsOpen(!isOpen)
    }
    return(
        <li onClick={ValueClick}><span>{value}</span></li>
    )
}

export default MsgDropDown;