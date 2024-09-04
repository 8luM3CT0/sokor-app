//front-end
import Head from 'next/head'
import {
  Button,
  Icon,
  Header,
  Post,
  UserPost
} from '../components/'
//back-end
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { creds, store } from '../backend/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollection} from 'react-firebase-hooks/firestore'
import firebase from 'firebase'

export default function Home () {

  const [postText, setPostText] = useState('')
  const [postTitle, setPostTitle] = useState('')
  const [user] = useAuthState(creds)

  const addPostToDb = e => {
    e.preventDefault()

    if(!postTitle) return

    if(!user){
      store.collection('neutral_posts').add({
        title: postTitle,
        text: postText,
        addedOn: firebase.firestore.FieldValue.serverTimestamp()
      })
      setPostTitle('')
    if(postText) setPostText('')
    } else if(user){
      store.collection('user_posts').add({
        title: postTitle,
        text: postText,
        addedBy: user?.displayName,
        addedPic: user?.photoURL,
        addedOn: firebase.firestore.FieldValue.serverTimestamp()
      })
      setPostTitle('')
    if(postText) setPostText('')
    }

  }


  const [userPosts] = useCollection(
    store.collection('user_posts').orderBy('addedOn', 'asc')
  )


  return (
    <div
      className='
    h-screen 
    overflow-hidden
    bg-purple-700
    bg-opacity-5
    bg-no-repeat 
    bg-cover
    '
    >
      <Head>
        <title>Mobilizing Action with Key Information</title>
      </Head>
      <Header />
      <main className="
      w-[90%]
      mx-auto
      bg-opacity-5
      h-full
      overflow-hidden
      flex
      flex-col
      place-items-center
      space-y-4
      ">
        <div className="
        w-full
        mx-auto
        min-h-[360px]
        max-h-[420px]
        bg-cover
        bg-no-repeat
        bg-placeholder
        flex
        items-center
        rounded-b-md
        ">
          <div className="
          w-[50%]
          bg-purple-50
          bg-opacity-25
          h-full
          flex
          flex-col
          items-start
          ">
            <span className="
            h-[50%]
            w-full
            items-center
            ">
              <h1 className="
              font-fredoka
              font-semibold
              text-xl
              text-purple-300
              ">
                Homepage
              </h1>
            </span>
                        <span className="
            h-[50%]
            w-full
            items-center
            ">
              <h4 className="
              font-fira-sans
              font-normal
              text-base
              text-purple-50
              ">
                Dummy text to highlight something
              </h4>
            </span>
          </div>
          <div className="
          w-[50%]
          h-full
          "></div>
        </div>
      </main>
          </div>
  )
}
