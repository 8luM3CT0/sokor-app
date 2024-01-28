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
      <button className="
      roomsInpBtn
      group
      ">
        <p className="
        text-xl
        font-fira-sans
        font-bold
        text-amber-500
        group-hover:text-amber-700
        transform
        transition
        duration-200
        ">+</p>
        <p className="
        text-xl
        font-path-ex
        font-bold
        text-amber-500
        group-hover:text-amber-700
        transform
        transition
        duration-200
        ">Post</p>  
      </button>  
      {roomsPoster && (
        <div className="
        h-full
        w-full
        bg-slate-800
        inset-0
        z-50
        fixed
        grid
        place-items-center
        ">
          <div className="
          roomsInputModal
          ">
            <header className="
            h-[60px]
            w-full
            border-b
            border-amber-500
            flex
            items-center
            justify-between
            px-4
            py-3
            ">
              <h1 className="
              text-xl
              font-fira-sans
              font-semibold
              text-amber-500
              ">
                Add a post
              </h1>
              <button className="
              rounded-full
              px-3
              py-1
              grid
              place-items-center
              text-xl
              text-amber-500
              border
              border-amber-500
              hover:text-amber-700
              hover:border-amber-700
              hover:-skew-x-6
              -inset-full
              transform
              transition
              delay-100
              ease-in-out
              ">
                X
              </button>
            </header>
            <div className="
            h-[85%]
            w-full
            flex
            flex-col
            items-start
            space-y-5
            ">
              <h1 className="
              text-lg
              text-amber-500
              font-fira-sans
              font-semibold
              ">
                Post title
              </h1>
              <input 
              placeholder={`What do you want to post, ${user?.displayName}`}
              value={postTitle}
              onChange={e => setPostTitle(e.target.value)}
              type="text" 
              className="
              w-full
              h-[55px]
              rounded-md
              bg-slate-800
              shadow-slate-900
              shadow-lg
              border-0
              outline-none
              font-fira-sans
              font-normal
              text-lg
              text-amber-500
              placeholder-slate-700
              px-3
              py-2
              " />
              <h1 className="
              text-lg
              text-amber-500
              font-fira-sans
              font-semibold
              ">
                Post description
              </h1>
              <textarea 
              value={postDesc}
              onChange={e => setPostDesc(e.target.value)}
              placeholder='Post description (optional)...'
              className='
              h-[80%]
              w-full
              rounded-md
              bg-slate-800
              shadow-lg
              shadow-slate-800
              placeholder-slate-700
              border-0
              outline-none
              text-lg
              text-amber-500
              px-3
              py-2
              '></textarea>
              <span className="
              w-full
              flex
              items-center
              space-x-3
              ">
                <span className="
                w-[50%]
                "></span>
                <button 
                onClick={postArticle}
                className="
                w-[50%]
                h-[50px]
                text-xl
                text-amber-500
                border
                border-amber-500
                hover:text-amber-700
                hover:border-amber-700
                focus:outline-none
                hover:-inset-full
                transform
                transition
                delay-100
                ease-in-out
                ">
                  Add
                </button>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default RoomsInput