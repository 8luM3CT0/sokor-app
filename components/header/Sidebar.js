import { useRouter } from 'next/router'
import React from 'react'
import { AiFillMessage, AiFillHome, AiOutlineCode } from 'react-icons/ai'

function Sidebar() {
  const router = useRouter()

  return (
    <div className='
    forMobile
    w-[300px]
    h-full
    transition
    transform
    duration-[0.3s]
    z-20
    sticky
    top-16
    ease-in-out
    bg-slate-700
    rounded-r-lg
    '>
        <ul className="
        py-2 
        flex 
        flex-col 
        gap-4 
        space-y-5 
        place-items-center 
        w-full">    
            <li className="
            headerTitleForChat 
            w-[40%]
            justify-evenly 
            flex 
            items-center 
            space-x-2">
            <AiFillMessage 
                style={{
                    fontSize: '1.5em',
                    color: 'orange'
                }}
                />
                <h1>Chat</h1>
            </li>
            <li className="
            headerTitleForDev 
            w-[40%]
            justify-evenly
            flex 
            space-x-2 
            items-center
            ">
                  <AiOutlineCode
                style={{
                    fontSize: '1.5em',
                    color: 'orange'
                }}
                />
                <h1>Developer</h1>
            </li>
        </ul>
    </div>
  )
}

export default Sidebar