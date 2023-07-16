//front-end
import '../styles/globals.css'
import '@material-tailwind/react/tailwind.css'
import {GoogleFonts} from 'next-google-fonts'
//back-end
import Router from 'next/router'
import ProgressBar from '@badrap/bar-of-progress'
import {supabase} from '../backend/supabase'
import { useState } from 'react'
import { useEffect } from 'react'

const progress = new ProgressBar({
  size: 3,
  color: 'indigo',
  className: 'z-50',
  delay: 100
})

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)

export default function App ({ Component, pageProps }) {
  const [currentSession, setCurrentSession] = useState(null)

  useEffect(() => {
    setCurrentSession(supabase.auth.getSession());
    supabase.auth.onAuthStateChange((_event, currentSession) => {
      setCurrentSession(currentSession)
    })
  }, [])
  
  return (
    <>
      <link
        href='https://fonts.googleapis.com/icon?family=Material+Icons'
        rel='stylesheet'
      />
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@500&family=Montserrat+Subrayada&family=Montserrat:wght@300&family=Pathway+Extreme:wght@300&display=swap" />
      <Component {...pageProps} />
    </>
  )
}
