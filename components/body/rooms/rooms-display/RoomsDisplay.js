//front-end
import React, { useState } from 'react'
import { MeetingIcon, OptionsIcon } from '../../..'
//back-end
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import { useCollection } from 'react-firebase-hooks/firestore'
import { creds, store } from '../../../../backend/firebase'


function RoomsDisplay({roomId, doc}) {
  const router = useRouter()
  const [roomModal, setRoomModal] = useState(false)
  return (
    <>
    <div 
    id={roomId}
    className='
    roomsDisplay
    group
    '>
      <div
      className="
      rounded-full
      p-3
      h-[60px]
      w-[70px]
      bg-techie
      bg-center
      bg-no-repeat
      border
      border-amber-500
      " />
      <span className="
      flex
      flex-col
      space-y-2
      w-full
      px-3
      py-2
      ">
        <h1 className="
        text-2xl
        text-amber-500
        font-fira-sans
        font-bold
        group-hover:text-amber-600
        group-hover:-skew-x-3
        transform
        transition
        delay-100
        ">
          {doc.roomName}
        </h1>
        <p className="
        roomsDisplayDesc
        ">
          {doc.roomDesc}
        </p>
      </span>
      <span className="
      w-[30%]
      flex
      items-center
      space-x-3
      px-2
      ">
        <button 
        onClick={() => setRoomModal(true)}
        className="
        rounded-3xl
        p-3
        border
        border-amber-500
        hover:border-2
        hover:border-amber-700
        transform
        transition
        duration-300
        focus:outline-none
       ">
        <MeetingIcon 
        style={{
          color: 'whitesmoke',
          fontSize: '1.4em'
        }}
        />
       </button>
       <button className="
        rounded-3xl
        p-3
        border
        border-amber-500
        hover:border-2
        hover:border-amber-700
        transform
        transition
        duration-300
        focus:outline-none
       ">
        <OptionsIcon 
        style={{
          color: 'whitesmoke',
          fontSize: '1.4em'
        }}
        />
       </button>
      </span>
    </div>
    {roomModal && (
      <div className="
      h-[100vh]
      w-screen
      bg-slate-800
      bg-opacity-80
      grid
      place-items-center
      inset-0
      z-50
      fixed
      ">
        <div className="
       h-[85vh] 
       lg:w-[60vw]
       w-[80vw]
       flex
       flex-col
       rounded
       bg-slate-700
       space-y-3
        ">
          <header className="
          h-[10%]
          top-0
          sticky
          z-50
          flex
          items-center
          justify-between
          px-4
          py-3
          border-b
          border-amber-600
          ">
            <h1 className="
            font-path-ex
            font-bold
            text-lg
            text-amber-500
            ">
              Info about {doc.roomName}
            </h1>
            <button 
            onClick={() => setRoomModal(false)}
            className="
            text-xl
            font-fira-sans
            font-black
            text-amber-600
            border
            rounded-full
            px-3
            py-1
            border-amber-600
            hover:text-amber-700
            hover:border-2
            hover:border-amber-700
            transform
            transition
            duration-300
            ease-in-out
            ">
              X
            </button>
          </header>
          <div className="
          h-[90%]
          w-full
          bg-slate-700
          bg-opacity-80
          flex
          flex-col
          items-start
          space-y-4
          ">
            <div className="
            roomsDisplayModalTop
            ">
              <span className="
            roomsDisplaySpan
            ">
              {/*room image here */}
            <h1 className="
            text-3xl
            text-amber-700
            font-montserr
            font-bold
            ">
              {doc.roomName}
            </h1>
            </span>
            <span className="
            roomsDisplaySpan
            ">
              <h1 className="
            text-lg
            text-amber-500
            font-fira-sans
            font-bold
            ">
              Room creator:
            </h1>
            <h1 className="
            text-xl
            text-amber-700
            font-montserr
            font-bold
            ">
              {doc.creator}
            </h1>
            </span>
              <span className="
              roomsDisplaySpan
              ">
                <h1 className="
                text-lg
                text-amber-500
                font-fira-sans
                font-bold
                ">
                  Created on:
                </h1>
                <h1 className="
                text-xl
                text-amber-700
                font-montserr
                font-bold
                ">
                  {new Date((doc.createdOn)?.toDate()).toLocaleString()}
                </h1>
              </span>
            </div>
          </div>
        </div>
      </div>
    )}
   </>
  )
}

export default RoomsDisplay