//front-end
import React from 'react'
import { OptionsIcon } from '../../../'
//back-end
import { useAuthState } from 'react-firebase-hooks/auth'

function RoomMember({userEmail, doc}) {
  
    return (
    <div className='
    h-[60px]
    w-[95%]
    mx-auto
    px-3
    py-2
    my-2
    bg-slate-800
    flex
    items-center
    justify-between
    border
    rounded-md
    border-amber-400
    hover:border-2
    hover:border-amber-600
    transform
    transition
    delay-100
    ease-in-out
    group
    cursor-pointer
    '>
        <h1 className="
        font-fira-sans
        font-bold
        text-lg
        text-amber-500
        group-hover:text-amber-700
        group-hover:font-black
        ">
            {doc?.memberEmail}
        </h1>
        <button className="
        rounded-full
        p-3
        hover:border
        hover:border-amber-600
        transform
        transition
        duration-300
        ease-in-out
        ">
            <OptionsIcon 
            style={{
                color: 'orange',
                fontSize: '1.4em'
            }}
            />
        </button>
    </div>
  )
}

export default RoomMember