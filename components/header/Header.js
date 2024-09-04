import React, { useState } from 'react'
import {Dropdown, DropdownItem, DropdownLink, Modal, ModalBody, MoneyIcon, RoomIcon} from '../'
import { AiFillMessage, AiOutlineCode, AiOutlineMenu, AiOutlineMenuFold} from 'react-icons/ai'
import { FaBlog } from 'react-icons/fa'
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
            font-fira-sans
            focus:outline-none
            ">
                Logo
            </button>
            <button className="
            text-slate-100
            text-base
            rounded-lg
            font-fira-sans
            focus:outline-none
            ">
                Menu button
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
            font-fira-sans
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
                =
            </button>
        </span>
        <span className="
        w-[20%]
        h-full
        flex
        items-center
        justify-evenly
        ">
                        <button className="
            text-slate-100
            hover:text-purple-50
            w-full
            h-[80%]
            text-base
            rounded-lg
            font-fira-sans
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
        </span>
    </header>
    </>
  )
}

export default Header