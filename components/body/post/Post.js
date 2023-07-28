//front-end
import React, { useEffect, useState } from 'react'
import {GrSettingsOption} from 'react-icons/gr'
import {RxUpdate} from 'react-icons/rx'
import {Modal, ModalHeader, ModalBody, ModalFooter} from '../../'
import { BsFillTrashFill } from 'react-icons/bs'
//back-end
import { creds,store} from '../../../backend/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'


function Post({post}) {
    const [user] = useAuthState(creds)

    const deletePost = e => {
        e.preventDefault()

        if(!user) return

        if(user?.displayName == 'Reaper Iff' || user?.email == 'rumlowb@gmail.com'){
            store.collection('neutral_posts').doc(post?.id).delete()
        }
    }

  return (
    <>
    <div 
    key={post?.id}
    className='postDiv group'
    >
    {/**title only for mobile; otherwise will show time */}
    <div className="neutralPostHeader">
        <h1 className="
        text-xl
        font-montserr
        font-normal
        text-slate-100
        group-hover:text-amber-300
        transform
        transition
        duration-150
        delay-100
        ease-in-out
        ">
            {post?.data()?.title}
        </h1>
    </div>
    {/**text of post here for desktop; otherwise hidden */}
    {post?.data()?.text && (
        <div className="postText">
        {post?.data()?.text}
    </div>
    )}
    {/**button here for read more */}
    <div className="
    neutralPostFooter
    ">
        <button 
        onClick={deletePost}
        className="forDesktop">
            <BsFillTrashFill
            style={{
                fontSize: '1.4em',
                color: 'orange'
            }}
            />
        </button>
        <button className="neutralPostButton
        ">
            Read more
        </button>
    </div>
    </div>
    </>
  )
}

export default Post