//front-end
import React from 'react'
import Head from 'next/head'
import { IdHeader } from '../../components'
//back-end
import { creds, store, storage } from '../../backend/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { 
  useDocument, 
  useCollection, 
  useDocumentOnce, 
  useCollectionOnce } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/router'

function RoomsPage() {
  const router = useRouter()
  const {id} = router.query
  const [user] = useAuthState(creds)
  const [snapshot, loadingSnapshot, error] = useDocument(
    store.doc(`rooms/${id}`)
  )

  return (
    <div className='
    h-screen
    w-full
    overflow-hidden
    bg-slate-900
    '>
      <Head>
        <title>Room with the title of: {snapshot?.data()?.roomName}</title>
      </Head>
      <IdHeader 
      roomName={snapshot?.data()?.roomName}
      />
      <main className="
      h-full
      lg:w-[75%]
      w-[85%]
      mx-auto
      bg-slate-700
      "></main>
    </div>
  )
}

export default RoomsPage