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
       w-[95vw]
       flex
       flex-col
       rounded
       bg-slate-700
       space-y-3
        ">
          <header className="
          h-[60px]
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
          h-[85%]
          w-full
          bg-slate-700
          bg-opacity-80
          flex
          flex-col
          items-start
          space-y-4
          ">
                
              {/*room image here */}
            <h1 className="
            text-3xl
            mx-auto
            text-amber-700
            font-montserr
            font-bold
            ">
              {doc.roomName}
            </h1>
        
            <div className="
            roomsDisplayModalTop
            ">
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
            {/**end of roomsDisplayTop */}
            {/**roomsDisplay description */}
            <span className="roomsDisplayDescSpan
            ">
              <h2 className="
              font-montserr
              font-normal
              text-xl
              text-amber-400
              underline
              ">
                Room description
              </h2>
              <h4 className="
              font-montserr
              font-bold
              text-base
              text-amber-600
              ">
                {doc?.roomDesc}
              </h4>
            </span>
            {/**roomsDisplay desc end */}
            {/**members add form */}
            {(user?.displayName == doc?.creator || user?.email == 'rumlowb@gmail.com') && (
              <>
              <div className="
              w-full
              rounded-md
              border
              border-amber-500
              bg-slate-800
              space-y-2
              ">
                <input
                value={memberEmail}
                onChange={e => setMemberEmail(e.target.value)} 
                placeholder={`Add a member here, ${user?.displayName}`}
                className='
                px-3
                py-4
                my-2
                w-full
                bg-inherit
                text-amber-600
                font-path-ex
                font-semibold
                placeholder-amber-500
                placeholder-opacity-60
                focus:outline-none
                '></input>
                <span className="
                h-[35%]
                flex
                items-center
                justify-between
                px-3
                py-3
                my-2
                w-full
                border-t-2
                border-amber-500
                ">
                  <h1></h1>
                  <button 
                  onClick={addMember}
                  className="
                  bg-slate-800
                  border
                  border-amber-500
                  text-amber-500
                  font-path-ex
                  font-semibold
                  text-lg
                  px-4
                  py-2
                  my-2
                  hover:border-amber-700
                  hover:text-amber-700
                  hover:font-bold
                  transform
                  transition
                  ease-in-out
                  delay-100
                  hover:-skew-x-6
                  ">
                    Add member
                  </button>
                </span>
              </div>
              {/**membersList */}
              <div className="
              h-full
              w-full
              flex
              flex-col
              items-start
              bg-slate-900
              rounded
              ">
                <header className="
                top-0
                z-50
                sticky
                px-3
                py-2
                mb-3
                bg-slate-700
                border-b-2
                border-amber-500
                h-[10%]
                w-full
                ">
                  <h3 className="
                  font-path-ex
                  font-semibold
                  text-amber-500
                  text-lg
                  ">
                    Members of {doc?.roomName}
                  </h3>
                </header>
                <div className="
                h-full
                w-full
                overflow-y-scroll
                scrollbar-thin
                scrollbar-track-slate-700
                scrollbar-thumb-amber-500
                ">
                  {membersList && membersList?.docs.map(doc => (
                    <RoomMember 
                    userEmail={doc?.data()?.memberEmail}
                    doc={doc?.data()}
                    />
                  ))}
                </div>
              </div>
              {/**end of membersList */}
              </>
            )}
            {/**members add form end */}
          </div>
          {/**footer */}
          <footer className="
          h-[60px]
          w-full
          bottom-0
          sticky
          z-50
          border-t-2
          border-amber-600
          flex
          items-center
          justify-between
          ">
            <span className='
            w-[50%]
            '></span>
            <span className="
            px-4
            py-3
            w-[50%]
            ">
              <button 
              onClick={() => router.push(`/rooms/${roomId}`)}
              className="
              bg-slate-900
              font-montserr
              font-semibold
              text-lg
              h-[90%]
              px-3
              py-2
              rounded
              w-[70%]
              text-amber-500
              hover:bg-opacity-90
              hover:text-amber-600
              hover:border-x-4
              hover:border-y
              hover:border-amber-600
              -inset-full
              transform
              transition
              delay-100
              ease-in-out
              ">
                To room
              </button>
            </span>
          </footer>
          {/**end of footer */}
        </div>
      </div>
    )}
   </>
  )
}

export default RoomsDisplay