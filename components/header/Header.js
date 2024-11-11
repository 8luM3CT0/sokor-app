import React, { useState } from 'react'
import {Dropdown, DropdownItem, DropdownLink, LogoIcon, MenuIcon, Modal, ModalBody, MoneyIcon, RoomIcon} from '../'
import { AiFillMessage, AiOutlineCode, AiOutlineMenu, AiOutlineMenuFold} from 'react-icons/ai'
import { FaBlog } from 'react-icons/fa'
import {UserIcon, CameraIcon, ChatAltIcon, VideoCameraIcon, SearchIcon} from '@heroicons/react/solid'
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
    bg-[#a59b57]
    border-b-2
    border-yellow-600-600
    py-3
    px-5
    flex
    items-center
    justify-between
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
            text-xl
            rounded-lg
            font-semibold
            font-montserr
            focus:outline-none
            flex
            items-center
            space-x-4
            ">
                <LogoIcon 
                style={{
                    fontSize: '1.5em',
                    color: 'whitesmoke'
                }}
                />
                BrightPath
            </button>
        </span>
        <span className="
        w-[20%]
        h-full
        flex
        items-center
        justify-evenly
        ">
        </span>
    </header>

    </>
  )
}

export default Header