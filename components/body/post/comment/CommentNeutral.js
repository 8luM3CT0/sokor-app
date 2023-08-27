//front-end
import React from 'react'
//back-end
import { creds, store } from '../../../../backend/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useState } from 'react'

function Comment({doc, parentId}) {
  const [user] = useAuthState(creds)
  const [deleteModal, setDeleteModal] = useState(false)

  const deleteComment = e => {
    store
    .collection('neutral_posts')
    .doc(parentId)
    .collection('comments')
    .doc(doc?.id)
    .delete()

    setDeleteModal(false)
  }
  
    return (
    <div 
    key={doc?.id}
    className='
    h-[45px]
    w-full
    bg-slate-600
    px-4
    py-3
    justify-between
    flex
    items-center
    hover:border-2
    hover:-skew-x-3
    hover:border-amber-700
    transform
    transition
    duration-200
    ease-in-out
    '>
            <h1 className="commenterName">
                Anon
            </h1>
        <p className="
        font-normal
        text-lg
        font-fira-sans
        text-amber-600
        ">
            {doc?.data()?.comment}
        </p>
    </div>
  )
}

export default Comment