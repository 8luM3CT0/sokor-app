//front-end
import React, {useRef, useState} from 'react'
//back-end
import { creds, store, storage } from '../../../../backend/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import firebase from 'firebase'
import { CommentIcon, OptionsIcon, ReadIcon } from '../../..'

function RoomArticle({articleId, roomId}) {
    //use for snapshot/ return of data for the article
    const [snapshot, loadingSnapshot, error] = useDocument(
        store.doc(`/blogRooms/${roomId}`).collection('roomArticles').doc(articleId)
    )
    //to be used for updating any details over the article
    const [user] = useAuthState(creds)
    //for reading more info on an article
    const [readArticle, setReadArticle] = useState(false)
    //to be used also for updating any of the details
    const [updateArticle, setUpdateArticle] = useState(false)
    const [updatedTitle, setUpdatedTitle] = useState('')
    const [updatedDesc, setUpdatedDesc] = useState('')
    const filePickerRef = useRef(null)
    const [updatedMedia, setUpdatedMedia] = useState(null)
    //for comment section
    const [commentOnArticle, setCommentOnArticle] = useState(false)
    const [comment, setComment] = useState('')

    const addUpdatedMedia = e => {
        e.preventDefault()
        //adding picture function here...
        const reader = new FileReader()
        if(e.target.files[0]){
          reader.readAsDataURL(e.target.files[0])
        }
        reader.onload = readerEvent => {
          setUpdatedMedia(readerEvent.target.result)
        }
    }

    const removeMedia = () => {
        setUpdatedMedia(null)
    }

    const updateTitle = e => {
        e.preventDefault()

        if(!updatedTitle){
            alert(`No title there present, ${user?.displayName}`)
        } else if (updatedTitle){
            store.doc(`/blogRooms/${roomId}/roomArticles/${articleId}`).set({
                postTitle: updatedTitle
            },{merge: true})
        }
        setUpdatedTitle('')
    }

    const updateDesc = e => {
        e.preventDefault()

        if(!updatedDesc){
            alert(`No description there present, ${user?.displayName}`)
        } else if (updatedDesc){
            store.doc(`/blogRooms/${roomId}/roomArticles/${articleId}`).set({
                postDesc: updatedDesc
            },{merge: true})
        }
        setUpdatedDesc('')
    }

    const openRead = e => {
        e.preventDefault()
        {commentOnArticle == true && (
            setCommentOnArticle(false)
        )}
        setReadArticle(true)
    }

    const openComments = e => {
        e.preventDefault()
        {readArticle == true && (
            setReadArticle(false)
        )}
        setCommentOnArticle(true)
    }
  return (
    <>
    <div 
    key={snapshot?.id}
    className='
    max-h-[640px]
    min-h-[600px]
    my-7
    w-[95%]
    mx-auto
    bg-slate-800
    border
    border-amber-500
    flex
    flex-col
    rounded
    hover:border-amber-700
    -inset-full
    transform
    transition
    delay-100
    ease-in-out
    cursor-pointer
    group
    '
    >
                <header className="
        flex
        items-center
        w-full
        justify-between
        border-b
        border-amber-500
        group-hover:border-amber-700
        transform
        transition
        delay-100
        px-3
        py-2
        ">
            <h3 className="
            font-path-ex
            font-bold
            text-lg
            text-amber-500
            ">
                {snapshot?.data()?.postedBy}
            </h3>
        </header>
     {snapshot?.data()?.image ? (
      <>
        <body className="
        h-[80%]
        w-full
        flex
        flex-col
        space-y-3
        px-3
        py-2
        ">
        <img 
        src={snapshot?.data()?.image} 
        alt="" 
        className="
        h-[65%]
        rounded-md
        mx-auto
        my-auto
        " />
        </body>
      </>  
     ): (
        <>
        <body className="
        h-[80%]
        w-full
        flex
        flex-col
        space-y-3
        px-3
        py-2
        ">
            
        </body>
        </>
     )}  
             <footer className="
        border-t
        z-50
        border-amber-500
        flex
        items-center
        justify-between
        w-full
        px-3
        py-2
        group-hover:border-amber-700
        transform
        transition
        delay-100
        ">
            <h1 className="
            font-fira-sans
            font-bold
            text-lg
            text-amber-500
            group-hover:text-amber-700
            transform
            transition
            durtion-300
            ease-in-out
            ">
                {snapshot?.data()?.title}
            </h1>
            <span className="
            w-[35%]
            flex
            items-center
            justify-evenly
            ">
                                  <button 
                                  onClick={openRead}
                                  className="
roomArticleBtns
        ">
            <ReadIcon 
            style={{
                fontSize: '1.4em',
                color: 'orange'
            }}
            />
        </button>
        {(snapshot?.data()?.postedBy == user?.displayName || 
        user?.email == 'rumlowb@gmail.com') && (
            <button className="
            roomArticleBtns
                    ">
                        <OptionsIcon 
                        style={{
                            fontSize: '1.4em',
                            color: 'orange'
                        }}
                        />
                    </button>
        )}
        <button
        onClick={openComments}
        className="
roomArticleBtns
        ">
            <CommentIcon 
            style={{
                fontSize: '1.4em',
                color: 'orange'
            }}
            />
        </button>
            </span>
        </footer>
    </div>
    {readArticle && (
        <div className="
        h-full
        w-full
        bg-slate-800
        bg-opacity-80
        grid
        place-items-center
        fixed
        inset-0
        z-50
        ">
            <div className="roomArticleRead"></div>
        </div>
    )}
    {commentOnArticle && (
        <div className="
        h-full
        w-full
        bg-slate-800
        bg-opacity-80
        grid
        place-items-center
        fixed
        inset-0
        z-50
        ">
            <div className="roomArticleComment"></div>
        </div>
    )}
    
    </>
  )
}

export default RoomArticle