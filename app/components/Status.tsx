import React from 'react'
import  { IconType } from 'react-icons'

interface StatusProps{
    text:string,
    icon:IconType,
    bg:string,
    color:string,
    
}

export const Status:React.FC<StatusProps> = ({text,icon:Icon,bg,color}) => {
  return (
    <div className={`${bg} ${color} px-rounded flex items-center gap-1 p-1 pr-2 pl-2 w-[fit-content] justify-center`}>
        {text}<Icon size={15}/>
    </div>
  )
}
