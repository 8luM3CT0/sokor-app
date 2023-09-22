//front-end
import React from 'react'
import Head from 'next/head'
import { RoomsHeader } from '../components'
//back-end
import {useState, useEffect} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { creds, store } from '../backend/firebase'

function RoomsPage() {
  return (
    <div className='
    bg-slate-800
    h-screen
    overflow-hidden
    '>
    <Head>
        <title>This is the rooms page.</title>
    </Head>
    <RoomsHeader />
    <main className="
    h-full  
    w-[75%]
    mx-auto
    bg-slate-700
    bg-opacity-30
    scrollbar-hide
    "></main>
    </div>
  )
}

export default RoomsPage