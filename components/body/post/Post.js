//front-end
import React, { useEffect, useState } from 'react'
import {GrSettingsOption} from 'react-icons/gr'
import {RxUpdate} from 'react-icons/rx'
import {Modal, ModalHeader, ModalBody, ModalFooter} from '../../'
import { BsFillTrashFill } from 'react-icons/bs'
import { AiFillRead } from 'react-icons/ai'
//back-end
import { creds,store} from '../../../backend/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { GiCancel } from 'react-icons/gi'


function Post({post}) {
    const [user] = useAuthState(creds)
    const [deleteModal, setDeleteModal] = useState(false)
    const [readMore, setReadMore] = useState(false)
    const [comment, setComment] = useState('')

    const deletePost = e => {
        e.preventDefault()

        if(!user) return

        if(user?.displayName == 'Reaper Iff' || user?.email == 'rumlowb@gmail.com'){
            store.collection('neutral_posts').doc(post?.id).delete()
        }

        setDeleteModal(false)
    }

    const addComment = e => {
        e.preventDefault()

        {!comment && (alert('Add a comment!'))}

            if(user?.displayName){
                store.collection('neutral_posts').doc(post?.id).collection('comments').add({
                    comment,    
                    commenter: user?.displayName
                },
                {
                    merge: true
                })
                setComment('')
            } else {
                store.collection('neutral_posts').doc(post?.id).collection('comments').add({
                    comment  
                },
                {
                    merge: true
                })
                setComment('')
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
        <button 
        onClick={() => setReadMore(true)}
        className="neutralPostButton
        ">
            Read more
        </button>
        <button className="neutralPostMobBtn">
            <AiFillRead 
            style={{
                color: 'white',
                fontSize: '1.2em'
            }}
            Read
            />
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
    {readMore && (
        <div className="readMoreDiv">
            <div className="rmCenterDiv">
                <header className="
                top-0
                sticky
                z-50
                flex
                items-center
                justify-between
                bg-transparent
                border-b-2
                border-amber-400
                h-[45px]
                py-3
                px-4
                ">
                    <h1 className="
                    font-path-ex
                    text-xl
                    text-amber-600
                    font-semibold
                    ">
                        Post by an anonymous person
                    </h1>
                    <button 
                    onClick={() => setReadMore(false)}
                    className="
                    p-3
                    rounded-3xl
                    hover:shadow-lg
                    transform
                    transition
                    delay-150
                    ease-in-out
                    ">
                        <GiCancel 
                        style={{
                            fontSize: "1.2em",
                            color: "orange"
                        }}
                        />
                        </button>
                </header>
                <div className="
                h-[50%]
                rounded-md
                bg-slate-800
                bg-opacity-20
                w-full
                flex
                flex-col
                space-y-3
                ">
                    <h1 className="font-montserr
                    font-bold
                    text-amber-400
                    text-2xl
                    place-self-start
                    px-4
                    ">
                        {post?.data()?.title}
                    </h1>
                <div className="
                readMoreTextDiv
                ">
                    {post?.data()?.text}
                </div>
                </div>
                {/**comment section */}
                <div className="
                h-[50%]
                w-full
                flex
                flex-col
                px-2
                py-1
                ">
                    {/**comment form */}
                    <div className="
                    h-[60%]
                    w-full
                    rounded-lg
                    transform
                    transition
                    duration-300
                    ease-in-out
                    space-y-2
                    flex
                    flex-col
                    ">
                        <textarea 
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        placeholder='Comment your thoughts...'
                        className='
                        h-[75%]
                        w-[90%]
                        px-4
                        py-3
                        mx-auto
                        bg-slate-900
                        text-amber-500
                        bg-opacity-75
                        placeholder-slate-600
                        font-fira-sans
                        font-normal
                        text-lg
                        ' />
                        <button 
                        onClick={addComment}
                        className="
                        h-[25%]
                        place-self-end
                        mx-3
                        w-[20%]
                        rounded-lg
                        bg-orange-600
                        text-slate-50
                        text-lg
                        font-path-ex
                        font-semibold
                        outline-none
                        hover:bg-orange-700
                        hover:text-slate-100
                        focus:bg-slate-900
                        focus:text-orange-500
                        focus:outline-none
                        transform
                        transition
                        duration-200
                        ease-in-out
                        ">
                            Comment
                        </button>
                    </div>
                    {/**end of comment forn */}
                    {/**comments */}
                    <div className="
                    h-full 
                    w-full 
                    bg-slate-800
                    bg-opacity-20
                    overflow-y-scroll
                    scrollbar-thin
                    scrollbar-track-slate-800
                    scrollbar-thumb-amber-600
                    rounded-md
                    "></div>
                    {/**end of comments */}
                </div>
                {/**comment section end */}
            </div>
        </div>
    )}
    </>
  )
}

export default Post