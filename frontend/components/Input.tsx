import styles from './Input.module.css'
import React, { Dispatch, SetStateAction } from 'react'
type InputComponentsPropsType = {
  placeholder: String | any,
  icon: React.ReactElement,
  onchange?:any,
  name:any,
  userInput?:object
}
export const Input = ({placeholder,icon,onchange,name,userInput}:InputComponentsPropsType) => {
  return (
  <div className="flex hover:border-blue-500 hover:border-2 focus justify-center items-center border-solid border-2 h-14 w-60 rounded-2xl">
     <input className='outline-none' onChange={(e) =>onchange({...userInput,[e.target.name]:e.target.value})}  name={name} placeholder={placeholder} />
     <span className='text-2xl'>
        {icon}
    </span>
  </div>)
}

