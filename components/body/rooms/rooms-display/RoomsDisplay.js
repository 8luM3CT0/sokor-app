//front-end
import React, { useState } from 'react'
import { MeetingIcon, RoomMember, TrashIcon } from '../../..'
//back-end
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import { useCollection } from 'react-firebase-hooks/firestore'
import { creds, store } from '../../../../backend/firebase'
import firebase from 'firebase'


function RoomsDisplay({roomId, doc}) {
  const router = useRouter()
  const [user] = useAuthState(creds)
  const [roomModal, setRoomModal] = useState(false)
  //for adding members
  const [memberEmail, setMemberEmail] = useState('')

  const addMember= e => {
    e.preventDefault()

    {!memberEmail && alert(`You forgot the email, ${user?.displayName}`)}

    store.collection('rooms').doc(roomId).collection('members').add({
      memberEmail,
      addedBy: user?.displayName,
      addedOn: firebase.firestore.FieldValue.serverTimestamp()
    })

    setMemberEmail('')
  }

  //return members list with code below
  const [membersList] = useCollection(
    store.collection('rooms').doc(roomId).collection('members').orderBy('addedOn', 'asc')
  )

  //a way to check if the member exists and can access the room

  return (
    <>
    <div 
    id={roomId}
    className='
    roomsDisplay
    group
    '>
      <div
      className="roomsDisplayImg" />
      <span className="
      flex
      flex-col
      space-y-2
      w-full
      px-3
      py-2
      ">
        <h1 className="roomsDisplayName">
          {doc.roomName}
        </h1>
        <p className="
        roomsDisplayDesc
        ">
          {doc.roomDesc}
        </p>
      </span>
      <span className="
      roomsDisplayBtns
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
      </span>
    </div>
    {roomModal && (
      <div className="
      h-screen
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
        roomsDisplayModal
        ">
          <header className="
          h-[50px]
          top-0
          flex
          items-center
          justify-between
          border-b
          border-amber-600
          px-3
          py-2
          bg-inherit
          ">
            <h1 className="
            roomsDisplayName
            ">
              Room details
            </h1>
            <button 
            onClick={() => setRoomModal(false)}
            className="
            rounded-full
            px-3
            py-1
            border
            text-lg
            text-amber-500
            border-amber-500
            grid
            place-items-center
            font-montserr
            font-semibold
            hover:text-amber-700
            hover:border-amber-700
            hover:-skew-x-6
            focus:outline-none
            -inset-full
            transform
            transition
            delay-100
            ease-in-out
            ">
              X
            </button>
          </header>
          <main className="
          h-[90%]
          w-full
          flex
          flex-col
          items-center
          space-y-3
          px-3
          py-2
          ">
            {/**
             * 
             * roomsDisplay modal top with forms and details
             * 
             *  */}
             <h1 className="
             roomsDisplayName
             ">
              {doc?.roomName}
             </h1>
             <div className="roomsDisplayModalTop">
              <span className="
              roomsDisplayModalSpan
              ">
                <h4 className="roomsDisplayModalDetail">
                  Created by :
                </h4>
                <h2 className="roomsDisplayModalDetail">
                  {doc?.creator}
                </h2>
              </span>
              <span className="
              roomsDisplayModalSpan
              ">
                <h4 className="roomsDisplayModalDetail">
                  Created on :
                </h4>
                <h2 className="roomsDisplayModalDetail">
                  ({new Date(doc?.createdOn?.seconds).toString()})
                </h2>
              </span>
             </div>
             <div className="
              roomsDisplayModalDesc
              ">
                <h1 className="
                text-lg
                font-fira-sans
                font-semibold
                text-amber-500
                ">
                  Description: 
                </h1>
                <span className="
                h-[90%]
                w-full
                bg-slate-800
                bg-opacity-70
                px-3
                py-2
                overflow-y-scroll
                scrollbar-thin
                scrollbar-track-slate-900
                scrollbar-thumb-amber-700
                text-amber-500
                font-fira-sans
                font-semibold
                ">
                  {doc?.roomDesc}
                </span>
              </div>
            {/**
             * 
             * end of roomsDisplay modal
             * 
             *  */}
                         {/**
             * 
             * roomsDisplay modal bottom with members
             * 
             *  */}
            {/**
             * 
             * end of roomsDisplay modal with members
             * 
             *  */}
          </main>
          <footer className="
          h-[50px]
          bottom-0
          z-50
          sticky
          flex
          items-center
          justify-between
          px-3
          py-2
          border-t
          border-amber-600
          bg-inherit
          " ></footer>
        </div>
      </div>
    )}
   </>
  )
}

export default RoomsDisplay