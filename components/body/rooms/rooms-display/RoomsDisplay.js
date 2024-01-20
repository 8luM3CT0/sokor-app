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
          "></header>
          <main className="
          h-[90%]
          w-full
          flex
          flex-col
          space-y-3
          px-3
          py-2
          ">
            {/**
             * 
             * roomsDisplay modal top with forms and details
             * 
             *  */}
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
          " ></footer>
        </div>
      </div>
    )}
   </>
  )
}

export default RoomsDisplay