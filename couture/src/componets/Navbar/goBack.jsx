import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MdOutlineKeyboardBackspace } from "react-icons/md";

function GoBack() {
    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1)
    }
  return (
    <div onClick={goBack}><MdOutlineKeyboardBackspace /></div>
  )
}

export default GoBack