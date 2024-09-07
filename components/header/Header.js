import React, { useState } from 'react'
import {Dropdown, DropdownItem, DropdownLink, MenuIcon, Modal, ModalBody, MoneyIcon, RoomIcon} from '../'
import { AiFillMessage, AiOutlineCode, AiOutlineMenu, AiOutlineMenuFold} from 'react-icons/ai'
import { FaBlog } from 'react-icons/fa'
import {UserIcon, CameraIcon, ChatAltIcon, VideoCameraIcon} from '@heroicons/react/solid'
//back-end
import { creds, store, provider } from '../../backend/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function Header() {
    const [user] = useAuthState(creds)
    const [openSidebar, setOpenSidebar] = useState(false)
    const [signOutModal, setSOModal] = useState(false)
    const router = useRouter()
    
    const signIn = () => {
        creds.signInWithPopup(provider).catch(alert)
    }

    
    const signOut = () => {
        creds.signOut()

        if(signOutModal){
            setSOModal(false)
        }
    }

    useEffect(() => {
        if(user){
            store.collection('maki_users').add({
                displayName: user?.displayName,
                email: user?.email,
                photoURL: user?.photoURL
            })
        }
      }, [user])

  return (
    <>
    <header className='
    top-0
    sticky
    z-50
    w-full
    h-[60px]
    bg-[#6025be]
    border-b-2
    border-purple-600
    py-3
    px-5
    flex
    items-center
    justify-evenly
    '>
        <span className="
        w-[20%]
        h-full
        flex
        items-center
        justify-evenly
        ">
            <button className="
            text-slate-100
            text-base
            rounded-lg
            font-montserr
            focus:outline-none
            ">
                Logo
            </button>
            <button 
            onClick={() => setOpenSidebar(true)}
            className="
            text-slate-100
            text-base
            rounded-lg
            font-montserr
            focus:outline-none
            bg-transparent
            hover:bg-[#714eaa]
            transform
            transition
            duration-300
            ease-in-out
            px-3
            py-2
            ">
              <MenuIcon 
              style={{
                color: 'violet',
                fontSize:'1.5em'
              }}
              />
            </button>
        </span>
        <span className="
        w-[55%]
        h-full
        flex
        items-center
        bg-[#38166e]
        rounded-md
        ">
        <input 
        type="text" 
        placeholder='Search bar...'
        className="
        w-full
        bg-transparent
        focus:outline-none
        border-0
        text-slate-100
        font-fredoka
        font-normal
        text-base
        px-3
        " />
            <button className="
            text-lg
            rounded-full
            font-montserr
            font-semibold
            text-[#7f50ca]
            hover:text-[#a682df]
            focus:outline-none
            transform
            transition
            duration-300
            ease-in-out
            grid
            place-items-center
            px-3
            py-1
            ">
                <CameraIcon className='
                h-[20px]
                ' />
            </button>
        </span>
        <span className="
        w-[20%]
        h-full
        flex
        items-center
        justify-evenly
        ">
        {user ? (
            <img 
            src={user?.photoURL} 
            alt="" 
            className="
            rounded-full
            h-[45px]
            border
            border-violet-500
            " />
        ): (
            <button 
            onClick={signIn}
            className="
            text-slate-100
            hover:text-purple-50
            w-[60%]
            mx-auto
            h-[80%]
            text-base
            rounded-lg
            font-montserr
            font-semibold
            bg-purple-500
            focus:outline-none
            hover:bg-purple-700
            transform
            transition
            duration-300
            ease-in-out
            ">
                Log in
            </button>
        )}
        </span>
    </header>
    {openSidebar && (
        <div className="
        h-full
        w-full
        inset-0
        z-50
        fixed
        flex
        bg-purple-800
        bg-opacity-90
        ">
            <div className="
            lg:w-[15%]
            md:w-[35%]
            w-[50%]
            h-full
            rounded-md
            bg-purple-50
            bg-opacity-90
            flex
            flex-col
            items-start
            py-3
            ">
            {user ? (
                <span className="
                flex
                flex-col
                mx-auto
                items-center
                space-y-2
                h-[140px]
                ">
                    <img 
                    src={user?.photoURL} 
                    alt={user?.displayName?.[0]} 
                    className="
                    rounded-full
            h-[45px]
            border
            border-violet-500
                    " />
                <h3 className="
                font-fredoka
                font-semibold
                text-violet-500
                text-lg
                ">
                    {user?.displayName}
                </h3>
                <h4 className="
                font-fredoka
                font-normal
                text-sm
                text-violet-600
                ">
                    {user?.email}
                </h4>
                </span>
            ): (
                <button 
                onClick={signIn}
                className="
                text-slate-100
                hover:text-purple-50
                w-full
                px-5
                py-4
                text-base
                rounded-lg
                font-montserr
                font-semibold
                bg-purple-500
                focus:outline-none
                hover:bg-purple-700
                transform
                transition
                duration-300
                ease-in-out
                ">
                    Log in
                </button>
            )}
            <span className="
            headerMenuSpan
            ">
                <UserIcon 
                className='
                h-[30px]
                '
                />
                <p>
                    Members
                </p>
                </span>
                <span className="
            headerMenuSpan
            ">
                <ChatAltIcon 
                className='
                h-[30px]
                '
                />
                <p>
                    Forum
                </p>
            </span>
            <span className="
            headerMenuSpan
            ">
                <VideoCameraIcon 
                className='
                h-[30px]
                '
                />
                <p>
                    Livestreams
                </p>
            </span>
            </div>
            <div 
            onClick={() => setOpenSidebar(false)}
            className="lg:w-[60%] md:w-[40%] w-[20%] h-full"></div>
        </div>
    )}
    </>
  )
}

export default Header