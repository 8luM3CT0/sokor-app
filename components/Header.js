import React from 'react'
import { AiFillMessage, AiOutlineCode } from 'react-icons/ai'
import { FaBlog } from 'react-icons/fa'

function Header() {
  return (
    <header className='
    top-0
    sticky
    z-50
    w-full
    h-[60px]
    bg-slate-800
    border-b-2
    border-amber-600
    py-3
    px-5
    flex
    items-center
    justify-evenly
    '>
        <FaBlog 
        style={{
            fontSize: '1.9em',
            color: 'orange'
        }}
        />
        <div className="
        flex
        items-center
        space-x-7
        ">
            <h2 className="headerTitle">
                About
            </h2>
            <span className="headerTitle flex items-center space-x-2">
                <AiFillMessage 
                style={{
                    fontSize: '1.5em',
                    color: 'orange'
                }}
                />
                <h1>Chat</h1>
            </span>
            <span className="headerTitleForDev flex space-x-2 items-center">
                <AiOutlineCode 
                style={{
                    fontSize: '1.5em',
                    color: 'orange'
                }}
                />
                <h1>Developer</h1>
            </span>
        </div>
    </header>
  )
}

export default Header