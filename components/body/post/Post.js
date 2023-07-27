//front-end
import React, { useEffect, useState } from 'react'
import {GrSettingsOption} from 'react-icons/gr'
import {RxUpdate} from 'react-icons/rx'
import {Modal, ModalHeader, ModalBody, ModalFooter} from '../../'
//back-end


function Post({post}) {
    const [updatedTitle, setUpdatedTitle] = useState('')
    const [updatedDesc, setUpdatedDesc] = useState('') 

    const [updateForm, setUpdateForm] = useState(false)


  return (
    <>
    <div 
    key={post?.id}
    className='postDiv'>
        <span className="
        h-[20%]
        w-full
        px-4
        py-3
        flex
        items-center
        justify-between
        ">
            <h1 className="
            font-fira-sans
            font-semibold
            text-xl
            text-slate-100
            ">
                {post?.data()?.title}
            </h1>
            <p className="
            font-montserr
            font-normal
            text-base
            text-slate-100
            ">
              
            </p>

        </span>
        <div className="
        h-[60%]
        w-full
        rounded-lg
        bg-slate-600
        px-3
        py-2
        overflow-y-scroll
        scrollbar-thin
        scrollbar-track-slate-700
        scrollbar-thumb-amber-600
        text-slate-50
        ">
            {post?.data()?.text}
        </div>
        <span className="
        h-[2s0%]
        w-full
        px-4
        flex
        items-ceter
        justify-between
        ">
            <button
            onClick={() => setUpdateForm(true)}
            className='
            mx-5
            hover:shadow-xl
            hover:shadow-slate-800
            transform
            transition
            duration-200
            ease-linear
            '
            >
             <GrSettingsOption 
             style={{
                fontSize: '1.3em',
                color: 'orange'
            }}
             />   
            </button>
            <button 
            className="
            w-[50%]
            h-full
            font-montserr
            font-semibold
            text-lg
            text-slate-100
            bg-amber-600
            rounded-lg
            hover:border-2
            hover:border-amber-300
            active:bg-slate-100
            active:text-amber-700
            active:border-4
            active:border-amber-700
            transform
            transition-all
            duration-200
            ease-linear
            ">
                <h1>
                    Delete
                </h1>
            </button>
        </span>
    </div>
    <Modal
    size='regular'
    active={updateForm}
    toggler={() => setUpdateForm(false)}
    >
        <ModalHeader
        toggler={() => setUpdateForm(false)}
        >
            <h1 className="
            text-xl 
            font-path-ex 
            font-semibold 
            text-amber-600
            pl-3
            pr-6
            ">
                Update details on the post
            </h1>
        </ModalHeader>
        <ModalBody>
            <div
            className="
            lg:h-[70vh]
            md:h-[60vh]
            h-[50vh]
            lg:w-[30vw]
            md:w-[70vw]
            w-[80vw]
            overflow-y-scroll
            flex
            flex-col
            place-items-center
            scrollbar-thin
            scrollbar-track-slate-700
            scrollbar-thumb-amber-400
            px-5
            py-4
            rounded-lg
            bg-slate-800
            space-y-5
            ">
                <h1 className="
                font-fira-sans
                font-semibold
                text-amber-500
                text-xl
                place-self-start
                ">
                    Updated title
                </h1>
                <input 
                value={updatedTitle}
                onChange={e => setUpdatedTitle(e.target.value)}
                placeholder='Updated title here by anon...'
                type="text" 
                className="
                mx-auto
                border-0
                outline-none
                w-[98%]
                h-[10%]
                bg-slate-500
                text-amber-300
                font-montserr
                font-bold
                text-xl
                rounded-lg
                px-3
                active:border-x-2
                active:border-x-amber-600
                active:border-y
                active:border-y-amber-500
                " />
                <h1 
                className="
                font-fira-sans
                font-semibold
                text-amber-500
                text-xl
                place-self-start
                ">
                    Updated description
                </h1>
                <textarea 
                value={updatedDesc}
                onChange={(e) => setUpdatedDesc(e.target.value)}
                placeholder='Updated description here by anon...'
                type="text" 
                className="
                border-0
                mx-auto
                outline-none
                w-[98%]
                h-[60%]
                overflow-y-scroll
                scrollbar-thin
                scrollbar-track-amber-700
                scrollbar-thumb-slate-900
                bg-slate-500
                text-amber-300
                font-montserr
                font-semibold
                text-xl
                rounded-lg
                px-3
                py-4
                active:border-x-2
                active:border-x-amber-600
                active:border-y
                active:border-y-amber-500
                " />
                            <button
            className='
            w-[50%]
            h-[6%]
            rounded-lg
            bg-amber-800
            font-montserr
            font-normal
            text-lg
            text-white
            mx-auto
            flex
            items-center
            justify-evenly
            '
            >
                <RxUpdate 
                style={{
                    fontSize: '1.1em',
                    color: 'whitesmoke'
                }}
                />
                Update
            </button>
            </div>
        </ModalBody>
    </Modal>
    </>
  )
}

export default Post