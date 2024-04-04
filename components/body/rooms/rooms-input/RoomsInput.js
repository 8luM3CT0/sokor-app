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
    }

    if(postTitle && !postDesc && !mediaRef){
      //something here for adding to database
      store.collection('blogRooms').doc(roomId).collection('roomArticles').add({
        title: postTitle,
        postedBy: user?.displayName,
        posterPhoto: user?.photoURL,
        postedOn: firebase.firestore.FieldValue.serverTimestamp()
      })
      setPostTitle('')
      setRoomsPoster(false)
    } else if (postTitle && postDesc && !mediaRef){
      //something here adding to database with description
      store.collection('blogRooms').doc(roomId).collection('roomArticles').add({
        title: postTitle,
        description: postDesc,
        postedBy: user?.displayName,
        posterPhoto: user?.photoURL,
        postedOn: firebase.firestore.FieldValue.serverTimestamp()
      })
      setPostTitle('')
      setPostDesc('')
      setRoomsPoster(false)
    } else if (postTitle && mediaRef && !postDesc){
      store.collection('blogRooms').doc(roomId).collection('roomArticles').add({
        title: postTitle,
        image: mediaRef,
        postedBy: user?.displayName,
        posterPhoto: user?.photoURL,
        postedOn: firebase.firestore.FieldValue.serverTimestamp()
      })
      setPostDesc('')
      setPostTitle('')
      setMediaRef(null)
      setRoomsPoster(false)
    } else if (postTitle && mediaRef && postDesc){
      store.collection('blogRooms').doc(roomId).collection('roomArticles').add({
        title: postTitle,
        description: postDesc,
        image: mediaRef,
        postedBy: user?.displayName,
        posterPhoto: user?.photoURL,
        postedOn: firebase.firestore.FieldValue.serverTimestamp()
      })
      setPostDesc('')
      setPostTitle('')
      setMediaRef(null)
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
          flex
          flex-col
          items-start
          ">
          <div className="
          h-full
          w-full
          flex
          items-center
          px-3
          py-2
          ">
            {!mediaRef ? (
              <>
             <span className="
            w-[50%]
            flex
            flex-col
            items-start
            px-3
            py-2
            space-y-3
            ">
              <h1 className="
              font-fira-sans
              font-normal
              text-lg
              text-amber-600
              ">
                Image: 
              </h1>
              <button 
              onClick={() => filePickerRef.current.click()}
              className="
              w-full
              h-[45px]
              rounded
              border
              border-amber-600
              text-lg
              text-amber-600
              hover:border-amber-800
              hover:text-amber-800
              transform
              transition
              duration-300
              ease-in-out
              ">
                Add image
              </button>
              <input 
              type="file" 
              hidden 
              ref={mediaRef} 
              onChange={addMedia}
              />
            </span>
              </>
            ): (
              <>
              <span className="
            w-[50%]
           h-full
            flex
            flex-col
            items-center
            ">
              
              <img 
              src={mediaRef} 
              alt="" 
              className="
              w-[90%]
              h-full
              rounded
              border
              border-amber-600
              " />
              <span className="
              w-full
              flex
              items-center
              ">
                              <button 
              onClick={() => filePickerRef.current.click()}
              className="
              w-full
              h-[45px]
              rounded
              border
              border-amber-600
              text-lg
              text-amber-600
              hover:border-amber-800
              hover:text-amber-800
              transform
              transition
              duration-300
              ease-in-out
              ">
                Change
              </button>
              <button 
              onClick={removeMedia}
              className="
              w-full
              h-[45px]
              rounded
              border
              border-amber-600
              text-lg
              text-amber-600
              hover:border-amber-800
              hover:text-amber-800
              transform
              transition
              duration-300
              ease-in-out
              ">
                Remove
              </button>
              </span>
              <input 
              type="file" 
              hidden 
              ref={mediaRef} 
              onChange={addMedia}
              />
            </span>
              </>
            )}
          </div>
          </div>
        </div>
      </div>
    )}
    </>
  )
}

export default RoomsInput