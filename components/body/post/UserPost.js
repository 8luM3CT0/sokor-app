//front-end
import React, { useEffect, useState } from 'react'
import {GrSettingsOption} from 'react-icons/gr'
import {RxUpdate} from 'react-icons/rx'
import {Modal, ModalHeader, ModalBody, ModalFooter, AiOutlineClose} from '../../'
import { BsFillTrashFill } from 'react-icons/bs'
import {MdAutoFixNormal} from 'react-icons/md'
import {GiCancel} from 'react-icons/gi'
//back-end
import { creds,store} from '../../../backend/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'


function UserPost({post}) {
    const [user] = useAuthState(creds)
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    //for editting text && title
    const [edittedText, setEdittedText] = useState('')
    const [edittedTitle, setEdittedTitle] = useState('')

    const cancelEdit = () => {
        setEditModal(false)
        {edittedText || edittedTitle && 
            setEdittedText('');
            setEdittedTitle('')
        }
    }

    const editPost = e => {
        e.preventDefault()

        if(!edittedText || !edittedTitle) return

        if(edittedText && edittedTitle){
            store.collection('user_posts').doc(post?.id).set({
                text: edittedText,
                title: edittedTitle
            },
            {merge: true})
        } else if(edittedTitle && !edittedText){
            store.collection('user_posts').doc(post?.id).set({
                title: edittedTitle
            },
            {merge: true})
        }
        setEdittedTitle('')
        if(edittedText){
            setEdittedText('')
        }
        setEditModal(false)
    }

    const deletePost = e => {
        e.preventDefault()

        if(!user) return

        if(user?.displayName == 'Reaper Iff' || user?.email == 'rumlowb@gmail.com' || user?.email == post?.data()?.addedBy){
            store.collection('user_posts').doc(post?.id).delete()
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
        <h1 className="
        text-lg
        font-fira-sans
        font-normal
        text-slate-100
        group-hover:font-semibold
        group-hover:text-amber-400
        transform
        transition
        duration-150
        delay-100
        ease-in-out
        ">
            {post?.data()?.addedBy}
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
        <span className="
        flex items-center justify-between
        w-[15%]
        ">
        {user?.displayName == post?.data()?.addedBy && (
               <button 
               onClick={() => setEditModal(true)}
   className="
   outline-none
   border-0
   ">
       <MdAutoFixNormal
       style={{
           fontSize: '1.4em',
           color: 'orange'
       }}
       />
   </button>
        )}
          {user?.displayName == post?.data()?.addedBy && (
                      <button 
                      onClick={() => setDeleteModal(true)}
                      className="
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
        </span>
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
                    the assumption is you have informed {post?.data()?.addedBy}.
           
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
    {editModal && (
               <div className="flex h-[1080px] justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
               <div className="relative h-[680px] w-[40vw] my-6 mx-auto max-w-3xl">
                 <div className="h-full border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-600 outline-none focus:outline-none">
                   <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                     <h3 className="text-3xl font=semibold text-amber-400">Edit text</h3>
                     <button
                       className="
                       bg-transparent 
                       border-0 
                       rounded-3xl 
                       float-right
                       hover:shadow-lg
                       hover:shadow-slate-800
                       px-3
                       py-3
                       transform
                       transition
                       duration-250
                       ease-in-out
                       "
                       onClick={() => setEditModal(false)}
                     >
                        <AiOutlineClose 
                        style={{
                            fontSize: '1.3em',
                            color: 'lightgoldenrodyellow'
                        }}
                        />
                     </button>
                   </div>
                   <div className="relative p-6 flex-auto">
                     <div className="bg-slate-800 shadow-md rounded-lg px-8 pt-6 pb-8 h-full space-y-2 w-full">
                       <label className="block text-amber-600 text-base font-bold font-fira-sans mb-1">
                         Title
                       </label>
                       <input value={edittedTitle} onChange={e => setEdittedTitle(e.target.value)} type='text' className="shadow bg-slate-700 appearance-none border rounded w-full py-2 px-1 text-amber-700" />
                       <label className="block text-amber-600 text-base font-bold font-fira-sans mb-1">
                         Text
                       </label>
                       <textarea 
                       value={edittedText}
                       onChange={e => setEdittedText(e.target.value)}
                       type='text' className="shadow bg-slate-700 appearance-none border rounded w-full h-[70%] py-3a px-4 text-amber-700" />
                      </div>
                   </div>
                   <div className="flex items-center justify-end space-x-5 py-3 px-6 border-t border-slate-400 rounded-b">
                     <button
                       className="
                       text-slate-50
                       bg-red-500 
                       font-montserr 
                       font-bold 
                       px-3
                       py-2 
                       text-sm 
                       outline-none
                       hover:shadow-md
                       transform
                       transition
                       duration-150
                       delay-150
                       ease-linear
                       rounded-lg
                       flex
                       items-center
                       space-x-2
                       "
                       type="button"
                       onClick={cancelEdit}
                     >
                        <GiCancel 
                        style={{
                            color: 'white',
                            fontSize: '1.2em'
                        }}
                        
                        />
                       <h1>
                        Close
                       </h1>
                     </button>
                     <button
                     onClick={editPost}
                       className="
                       text-slate-50
                       bg-orange-500 
                       active:bg-yellow-700 
                       font-bold
                       font-montserr 
                       text-sm 
                       px-3
                       py-2
                       rounded-lg 
                       shadow 
                       hover:shadow-lg 
                       outline-none 
                       focus:outline-none 
                       mr-1 
                       mb-1
                       transform
                       transition
                       duration-150
                       delay-150
                       ease-linear
                       flex
                       items-center
                       "
                       type="button"
                     >
                        
                       <h1>
                        Edit
                       </h1>
                     </button>
                   </div>
                 </div>
               </div>
             </div>
    )}
    </>
  )
}

export default UserPost