//front-end
import React from 'react'
//back-end
import { creds, store } from '../../../backend/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

function IdHeader({roomName}) {
  return (
    <>
        <header className="
        top-0
        z-50
        px-4
        sticky
        flex
        items-center
        justify-evenly
        h-[75px]
        w-full
        border-b
        border-amber-600
        bg-slate-800
        ">
            <h1 className="
            font-fira-sans
            font-bold
            text-amber-400
            text-lg
            ">
                {roomName}
            </h1>
        </header>
    </>
  )
}

export default IdHeader