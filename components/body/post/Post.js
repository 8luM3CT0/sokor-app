//front-end
import React, { useEffect, useState } from 'react'
import {GrSettingsOption} from 'react-icons/gr'
import {RxUpdate} from 'react-icons/rx'
import {Modal, ModalHeader, ModalBody, ModalFooter} from '../../'
//back-end


function Post({post}) {

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
    <div className="postText">
        {post?.data()?.text}
    </div>
    {/**button here for read more */}
    <div className="
    neutralPostFooter
    ">
        <button className="
        w-[90%]
        mx-auto
        font-path-ex
        font-normal
        text-lg
        text-slate-50
        bg-amber-500
        border-0
        outline-none
        hover:bg-slate-700
        hover:text-amber-600
        hover:-skew-x-12
        transform
        rounded-lg
        transition
        duration-200
        ease-in-out
        ">
            Read more
        </button>
    </div>
    </div>
    </>
  )
}

export default Post