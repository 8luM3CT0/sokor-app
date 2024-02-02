//front-end
import React, {useRef, useState} from 'react'
//back-end
import { creds, storage, store } from '../../../../backend/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection , useDocument } from 'react-firebase-hooks/firestore'
import firebase from 'firebase'

function RoomsInput({roomId}) {
  const [user] = useAuthState(creds)
  //for modal opening 
  const [roomsPoster, setRoomsPoster] = useState(false)
  //for new posts, along with media adding
  const [postTitle, setPostTitle] = useState('')
  const [postDesc, setPostDesc] = useState('')
  const filePickerRef = useRef(null)
  const [mediaRef, setMediaRef] = useState(null) 

  const addMedia = e => {
    e.preventDefault()
    //adding picture function here...
    const reader = new FileReader()
    if(e.target.files[0]){
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = readerEvent => {
      setMediaRef(readerEvent.target.result)
    }
  }

  const removeMedia = () => {
    setMediaRef(null)
  }

  const postArticle = e => {
    e.preventDefault()

    if(!postTitle){
      return
    } else if (postTitle && !postDesc && !mediaRef) {
      store.collection('rooms').doc(roomId).collection('roomArticles').add({
        postTitle,
        postedBy: user?.displayName,
        postedOn: firebase.firestore.FieldValue.serverTimestamp()
      })
      setPostTitle('')
      setRoomsPoster(false)
    } else if (postTitle && postDesc && !mediaRef){
      store.collection('rooms').doc(roomId).collection('roomArticles').add({
        postTitle,
        postDesc,
        postedBy: user?.displayName,
        postedOn: firebase.firestore.FieldValue.serverTimestamp()
      })
      setPostTitle('')
      setPostDesc('')
      setRoomsPoster(false)
    } else if (postTitle && !postDesc && mediaRef){
      store.collection('rooms').doc(roomId).collection('roomArticles').add({
        postTitle,
        postedBy: user?.displayName,
        postedOn: firebase.firestore.FieldValue.serverTimestamp()
      }).then(doc => {
        const uploadTask = storage
        .ref(`rooms/${doc?.id}`)
        .putString(mediaRef, 'data_url')

        removeMedia()

        uploadTask.on(
          'state_change',
          null,
          error => console.error(error),
          () => {
            storage
            .ref('hokkienWords')
            .child(doc.id)
            .getDownloadURL()
            .then(media => {
              store.collection('rooms').doc(doc.id).set({
                media: mediaRef
              },
              {merge: true})
            })
          }
        )
      })
      setPostTitle('')
      setRoomsPoster(false)
    } else if (postTitle && postDesc && mediaRef ){
      store.collection('rooms').doc(roomId).collection('roomArticles').add({
        postTitle,
        postedBy: user?.displayName,
        postedOn: firebase.firestore.FieldValue.serverTimestamp()
      }).then(doc => {
        const uploadTask = storage
        .ref(`rooms/${doc?.id}`)
        .putString(mediaRef, 'data_url')

        removeMedia()

        uploadTask.on(
          'state_change',
          null,
          error => console.error(error),
          () => {
            storage
            .ref('hokkienWords')
            .child(doc.id)
            .getDownloadURL()
            .then(media => {
              store.collection('rooms').doc(doc.id).set({
                media: mediaRef
              },
              {merge: true})
            })
          }
        )
      })
      setPostTitle('')
      setPostDesc('')
      setRoomsPoster(false)
    }
  }
    return (
    <>
    <button 
    onClick={() => setRoomsPoster(true)}
    className="roomsInpBtn
    group
    ">
      <h1 className="
      text-3xl
      text-amber-500
      font-montserr
      font-semibold
      group-hover:text-amber-700
      transform
      transition
      duration-300
      ease-in-out
      ">
        +
      </h1>
      <h1 className="
      text-xl
      text-amber-500
      font-path-ex
      font-semibold
      group-hover:text-amber-700
      transform
      transition
      duration-300
      ease-in-out
      ">
        Add post
      </h1>
    </button>
    {roomsPoster && (
      <div className="
      h-full
      w-full
      bg-slate-800
      bg-opacity-80
      fixed
      inset-0
      z-50
      grid
      place-items-center
      ">
        <div className="
        roomsInputModal
        ">
          <header className="
          flex
          items-center
          h-[60px]
          w-full
          justify-between
          px-4
          py-3
          border-b
          border-amber-700
          ">
            <h1 className="
            font-fira-sans
            font-semibold
            text-lg
            text-amber-700
            ">
              Add a post
            </h1>
            <button 
            onClick={() => setRoomsPoster(false)}
            className="
            rounded-full
            font-fira-sans
            font-bold
            px-3
            py-1
            grid
            place-items-center
            border
            border-amber-700
            text-lg
            text-amber-700
            hover:text-amber-900
            hover:border-amber-900
            focus:outline-none
            transform
            transition
            duration-300
            ease-in-out
            ">
              X
            </button>
          </header>
          <div className="
          h-[90%]
          w-full
          px-4
          py-3
          flex
          flex-col
          items-start
          space-y-7
          overflow-y-scroll
          scrollbar-hide
          ">
            <span className="roomsModalPostSpan">
            <h1 className="roomsModalPostTitle
            ">
              Image
            </h1>
            <button 
            className="roomsModalPostBtn w-[90%]">
              Add image
            </button>
            </span>
            <span className="roomsModalPostSpan">
            <h1 className="roomsModalPostTitle
            ">
              Title
            </h1>
            <input 
            placeholder='Title...'
            className="roomsModalPostInput h-[60px]">
            </input>
            <span className="
            w-full
            justify-between
            flex
            items-center
            ">
              <h1 className='
              w-[60%]
              '></h1>
              <button 
            className="roomsModalPostBtn w-[30%]">
              Add title
            </button>
            </span>
            </span>
            <span className="roomsModalPostSpan">
            <h1 className="roomsModalPostTitle
            ">
              Description
            </h1>
            <textarea
            placeholder='Description...' 
            className="
            roomsModalPostInput 
            h-[190px] 
            overflow-y-scroll 
            scrollbar-hide 
            ">
            </textarea>
            <span className="
            w-full
            justify-between
            flex
            items-center
            ">
              <h1 className='
              w-[60%]
              '></h1>
              <button 
            className="roomsModalPostBtn w-[30%]">
              Add description
            </button>
            </span>
            </span>
            
          </div>
        </div>
      </div>
    )}
    </>
  )
}

export default RoomsInput