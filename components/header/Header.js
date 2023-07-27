import React, { useState } from 'react'
import { AiFillMessage, AiOutlineCode, AiOutlineMenu, AiOutlineMenuFold} from 'react-icons/ai'
import { FaBlog } from 'react-icons/fa'
import Sidebar from './Sidebar'
//back-end
import { creds, store, provider } from '../../backend/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect } from 'react'

function Header() {
    const [user] = useAuthState(creds)
    const [openSidebar, setOpenSidebar] = useState(false)
    
    const signIn = () => {
        creds.signInWithPopup(provider).catch(alert)
    }
    
    const signOut = () => {
        creds.signOut()
    }

    useEffect(() => {
        if(user){
            store.collection('blog_users').add({
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
        <div className="headerDiv">
            {user ? (
                <h2 
                onClick={signOut}
                className="headerTitle">
                {user?.displayName}
            </h2>
            ): (
                <h2 
                onClick={signIn}
                className="headerTitle">
                Sign in
            </h2>
            )}
            <span className="headerTitleForChat flex items-center space-x-2">
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
        {openSidebar == false ? (
                    <div 
                    onClick={() => setOpenSidebar(true)}
                    className="
                    forMobile
                    cursor-pointer
                    hover:shadow-lg
                    hover:shadow-slate-900
                    transform
                    transition-all
                    duration-300
                    ease-in-out
                    rounded-lg
                    px-3
                    py-2
                    ">
                        <AiOutlineMenu
                        style={{
                            fontSize: '1.5em',
                            color: 'orange'
                        }}
                        />
                    </div>
        ): (
            <div 
            onClick={() => setOpenSidebar(false)}
            className="
            forMobile
            cursor-pointer
            hover:shadow-lg
            hover:shadow-slate-900
            transform
            transition-all
            duration-300
            ease-in-out
            rounded-lg
            px-3
            py-2
            ">
                <AiOutlineMenuFold
                style={{
                    fontSize: '1.5em',
                    color: 'orange'
                }}
                />
            </div>
        )}
    </header>
    {openSidebar == true && (
        <Sidebar />
    )}
    </>
  )
}

export default Header