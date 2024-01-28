//front-end
import React, {useRef, useState} from 'react'
//back-end
import { creds, store, storage } from '../../../../backend/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import firebase from 'firebase'

function RoomArticle({articleId, roomId}) {
    //use for snapshot/ return of data for the article
    const [snapshot, loadingSnapshot, error] = useDocument(
        store.doc(`/rooms/${roomId}`).collection('articles').doc(articleId)
    )
    //to be used for updating any details over the article
    const [user] = useAuthState(creds)
    //to be used also for updating any of the details
    const [updatedTitle, setUpdatedTitle] = useState('')
    const [updatedDesc, setUpdatedDesc] = useState('')
    const filePickerRef = useRef(null)
    const [updatedMedia, setUpdatedMedia] = useState(null)

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
            store.doc(`/rooms/${roomId}/roomArticles/${articleId}`).set({
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
            store.doc(`/rooms/${roomId}/roomArticles/${articleId}`).set({
                postDesc: updatedDesc
            },{merge: true})
        }
        setUpdatedDesc('')
    }

  return (
    <>
    <div>RoomArticle</div>
    </>
  )
}

export default RoomArticle