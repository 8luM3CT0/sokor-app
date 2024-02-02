//front-end
import React, { useState } from 'react'
import { OptionsIcon } from '../../../'
//back-end
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocument } from 'react-firebase-hooks/firestore'
import { creds, store } from '../../../../backend/firebase'

function RoomMember({doc, roomId}) {
    const [user] = useAuthState(creds)
    
    const [snapshot, loadingSnapshot, error] = useDocument(
        store.collection('rooms').doc(roomId).collection('members').doc(doc?.id)
    )
    //for member options
    const [optionsModal, setOptionsModal] = useState(false)
    
    return (
    <>
    <div 
    key={snapshot?.id}
    className='
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
    rounded-md
    hover:border-x-3
    hover:border-y-2
    hover:border-amber-600
    -inset-full
    transform
    transition
    duration-100
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
        {(user?.email== 'rumlowb@gmail.com' || user?.displayName == doc?.addedBy && user) && (
                    <button 
                    onClick={() => setOptionsModal(true)}
                    className="
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
        )}
    </div>
    {optionsModal && (
        <div className="
        h-[100vh]
        w-[100vw]
        bg-slate-800
        bg-opacity-80
        fixed
        z-50
        inset-0
        flex
        flex-col
        items-center
        ">
            <div className="
            h-[75%]
            w-[80%]
            bg-slate-900
            border
            border-amber-500
            rounded-md
            flex
            flx-col
            ">
                <header className="
                flex
                items-center
                justify-between
                top-0
                h-[60px]
                w-full
                border-b
                border-amber-600
                px-4
                py-3
                ">
                    <h1 className="
                    font-path-ex
                    font-semibold
                    text-amber-500
                    text-lg
                    ">
                        Options for user
                    </h1>
                    <button 
                    onClick={() => setOptionsModal(false)}
                    className="
                    rounded-full
                    grid
                    place-items-center
                    px-3
                    py-1
                    border
                    border-amber-500
                    text-lg
                    text-amber-500
                    hover:border-amber-700
                    hover:text-amber-700
                    focus:outline-none
                    transform
                    transition
                    duration-300
                    ease-in-out
                    ">
                        X
                    </button>
                </header>
            </div>
        </div>
    )}
    </>
  )
}

export default RoomMember