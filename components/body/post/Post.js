//front-end
import React, { useEffect, useState } from 'react'
import {GrSettingsOption} from 'react-icons/gr'
import {RxUpdate} from 'react-icons/rx'
import {Modal, ModalHeader, ModalBody, ModalFooter} from '../../'
import { BsFillTrashFill } from 'react-icons/bs'
//back-end
import { creds,store} from '../../../backend/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { GiCancel } from 'react-icons/gi'


function Post({post}) {
    const [user] = useAuthState(creds)
    const [deleteModal, setDeleteModal] = useState(false)

    const deletePost = e => {
        e.preventDefault()

        if(!user) return

        if(user?.displayName == 'Reaper Iff' || user?.email == 'rumlowb@gmail.com'){
            store.collection('neutral_posts').doc(post?.id).delete()
        }

        setDeleteModal(false)
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
        {user && (
            <button 
            onClick={() => setDeleteModal(true)}
            className="forDesktop
            outline-none
            border-0
            ">
                <BsFillTrashFill
                style={{
                    fontSize: '1.4em',
                    color: 'orange'
                }}
                />
            </button>
        )}
        <button className="neutralPostButton
        ">
            Read more
        </button>
    </div>
    </div>
    <Modal
    size='regular'
    active={deleteModal}
    toggler={() => setDeleteModal(false)}
    >
        <ModalHeader
        toggler={() => setDeleteModal(false)}
        >
            <h1 className="
            text-lg
            font-fira-sans
            font-semibold
            text-amber-600
            underline
            pl-4
            pr-7
            ">
                Are you sure about this, {user?.displayName}
            </h1>
        </ModalHeader>
        <ModalBody>
            <div className="
            lg:h-[450px]
            md:h-[390px]
            h-[320px]
            lg:w-[420px]
            md:w-[360px]
            w-[290px]
            mx-auto
            rounded-lg
            shadow-lg
            px-6
            py-5
            grid
            overflow-y-scroll
            scrollbar-hide
            place-items-center
            ">
                <h2 className="
                text-base
                font-normal
                text-slate-700
                w-[70%]
                mx-auto
                h-full
                ">
                    This act is irreversible. If you proceed,
                    the assumption is you have informed whoever posted this.
           
                </h2>
                <h1 className="
                text-xl
                font-semibold
                text-amber-600
                animate-pulse
                mx-auto
                ">
                             Do you want to proceed ?
                </h1>
                <span className="
                flex
                items-center
                space-x-3
                ">
                                        <button
                    onClick={() => setDeleteModal(false)}
                    className='
                    bg-amber-600
                    p-3
                    border-0
                    outline-none
                    rounded-lg
                    shadow-lg
                    '
                    >
                        <GiCancel 
                        style={{
                            fontSize: '1.5em',
                            color: 'whitesmoke'
                        }}
                        />
                    </button>
                    <button
                    onClick={deletePost}
                    className='
                    bg-red-600
                    p-3
                    border-0
                    outline-none
                    rounded-lg
                    shadow-lg
                    '
                    >
                        <BsFillTrashFill 
                        style={{
                            fontSize: '1.5em',
                            color: 'whitesmoke'
                        }}
                        />
                    </button>
                </span>
            </div>
        </ModalBody>
    </Modal>
    </>
  )
}

export default Post