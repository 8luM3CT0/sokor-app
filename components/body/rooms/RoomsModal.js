//front-end
import React from 'react'
//back-end
import { creds, store } from '../../../backend/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'

function RoomsModal({buttonAction}) {
    const [user] = useAuthState(creds)
    return (
    <div 
    onClick={buttonAction}
    className='
    h-screen
    w-screen
    fixed
    inset-0
    overflow-hidden
    grid
    place-items-center
    bg-slate-800
    bg-opacity-75
    '>
        <div className="
        h-[50%]
        lg:w-[60%]
        w-[80%]
        bg-slate-700
        bg-opacity-80
        rounded-md
        flex
        flex-col
        ">
            <header className="
            top-0
            sticky
            z-50
            h-[10%]
            w-full
            px-4
            py-3
            flex
            items-center
            justify-between
            border-b
            border-amber-700
            ">
                <h1 className="
                font-path-ex
                font-bold
                text-lg
                text-amber-600
                ">
                    A new room
                </h1>
                <button 
                onClick={buttonAction}
                className="
                font-fira-sans
                font-black
                text-amber-600
                px-3
                py-1
                rounded-3xl
                ">
                    X
                </button>
            </header>
            <div className="
            h-[80%]
            w-full
            px-4
            py-3
            grid
            place-items-center
            space-y-4
            "></div>
            <footer className="
            bottom-0
            sticky
            z-50
            h-[10%]
            w-full
            px-4
            py-3
            flex
            items-center
            justify-evenly
            border-t
            border-amber-700
            ">

            </footer>
        </div>
    </div>
  )
}

export default RoomsModal