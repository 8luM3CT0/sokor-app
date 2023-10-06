//front-end
import React from 'react'
//back-end
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import { useCollection } from 'react-firebase-hooks/firestore'
import { creds, store } from '../../../../backend/firebase'

function RoomsDisplay({roomId, doc}) {
  return (
    <div 
    id={roomId}
    className='
    h-[40vh]
    w-full
    rounded-md
    bg-slate-800
    border
    border-amber-600
    hover:border-2
    hover:border-amber-500
    transform
    transition
    duration-300
    ease-in-out
    flex
    items-center
    justify-between
    space-x-4
    px-3
    py-2
    group
    '>
      <div
      className="
      rounded-full
      px-3
      py-1
      h-[72px]
      w-[72px]
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
        w-full
        text-lg
        text-amber-600
        font-path-ex
        font-semibold
        group-hover:text-amber-700
        group-hover:-skew-x-3
        transform
        transition
        delay-100
        ">
          {doc.roomDesc}
        </p>
      </span>
    </div>
  )
}

export default RoomsDisplay