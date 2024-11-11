//front-end
import Head from 'next/head'
import {
  Button,
  Icon,
  Header,
  Post,
  UserPost,
  MoodIcon,
  CommChatIcon,
  ResIcon,
  CrisisIcon,
  RightIcon,
  LeftIcon
} from '../components/'
import {BookOpenIcon, BriefcaseIcon, PhoneIcon, PresentationChartLineIcon, SearchIcon, SpeakerphoneIcon, UsersIcon} from '@heroicons/react/solid'
//back-end
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { creds, store } from '../backend/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollection} from 'react-firebase-hooks/firestore'

export default function Home ({testNews}) {

  const [user] = useAuthState(creds)
  //for display buttons
  const [moTrDis, setMotrDis] = useState(true)
  const [commChatDis, setCommChatDis] = useState(false)
  const [resSec, setResSec] = useState(false)
  const [criSupp, setCriSupp] = useState(false)
  const date = new Date().toLocaleDateString()


  const [isUserAnEditor, setIsUserAnEditor] = useState(false);

  // Function to check if the user is an editor
  const checkUserIsEditor = async () => {
    if (user) {
      try {
        const querySnapshot = await firestore
          .collection('diagnosed_users')
          .where('email', '==', user.email)
          .get();
        
        // Check if the user is found in the editors collection
        const isEditor = querySnapshot.size > 0;
        setIsUserAnEditor(isEditor);
      } catch (error) {
        console.error('Error checking editor status: ', error);
      }
    }
  };

  useEffect(() => {
    checkUserIsEditor();
  }, [user]); // Run the check when the user state changes


  const openMoodTracker = () => {
    {(commChatDis && setCommChatDis(false)) || (resSec && setResSec(false)) || (criSupp && setCriSupp(false))}
    setMotrDis(true)
  }

  const openCommChat = () => {
    {(moTrDis && setMotrDis(false)) || (resSec && setResSec(false)) || (criSupp && setCriSupp(false))}
    setCommChatDis(true)
  }

  const openResSec = () => {
    {(commChatDis && setCommChatDis(false)) || (moTrDis && setMotrDis(false)) || (criSupp && setCriSupp(false))}
    setResSec(true)
  }

  const openCriSupp = () => {
    {(commChatDis && setCommChatDis(false)) || (resSec && setResSec(false)) || (commChatDis && setCommChatDis(false))}
    setCriSupp(true)
  }
 

  return (
    <>
    <div
      className='
          h-screen 
    overflow-hidden
    bg-[#979f65]
    bg-opacity-60
    bg-no-repeat 
    bg-cover
    '
    >
      <Head>
        <title>BrightPath</title>
      </Head>
      <Header />
      <>
      <main className="desktopMainDiv
      ">
        <div className="
        h-[30%]
        w-[90%]
        mx-auto
        flex
        items-center
        ">
          <img 
          src={user?.photoURL} 
          className="
          lg:h-[240px]
          lg:w-[240px]
          md:h-[120px]
          md:w-[120px]
          mx-auto
          rounded-full
          border
          border-yellow-500
          hover:border-yellow-600
          transform
          transition
          duration-300
          ease-in-out
          bg-yellow-300
          " />
          <span className="
          h-[90%]
          w-[50%]
          mx-auto
          flex
          flex-col
          space-y-2
          ">
            <span className="
            h-[60%]
            w-[50%]
            mx-auto
            "></span>
            <button className="
            w-[50%]
            h-[30%]
            mx-auto
            rounded-full
            bg-yellow-600
            hover:bg-yellow-400
            font-montserr
            font-semibold
            text-slate-800
            hover:text-slate-600
            transform
            transition
            duration-300
            ease-in-out
            text-3xl
            ">
              User settings
            </button>
          </span>
        <div className="
        w-[30%]
        h-[90%]
        bg-yellow-700
        bg-opacity-20
        "></div>
        </div>
        {/**main div */}
        <div className="
        h-[40%]
        w-[90%]
        bg-yellow-700
        bg-opacity-20
        rounded
        flex
        items-center
        ">
          {/**
           * display buttons
           */}
           <div className="
           w-[40%]
           h-full
           flex
           flex-col
           items-center
           justify-center
           space-y-4
           bg-yellow-100
           bg-opacity-30
           py-4
           ">
            {moTrDis ? (
              <button className="
              displayBtnActive
              ">
                <span className="
                flex
                items-center
                space-x-2
                ">
                  <MoodIcon 
                style={{
                  fontSize: '1.8em',
                  color: 'yellow'
                }}
                />
              <h3>
                Mood Tracker
              </h3>
                </span>
                <LeftIcon 
                style={{
                  fontSize: '1.5em'
                }}
                />
              </button>
            ): (
              <button 
              onClick={openMoodTracker}
              className="
            displayBtn
            ">
              <span className="
              flex
              items-center
              space-x-2
              ">
                <MoodIcon 
              style={{
                fontSize: '1.8em',
                color: 'yellow'
              }}
              />
            <h3>
              Mood Tracker
            </h3>
              </span>
              <RightIcon 
              style={{
                fontSize: '1.5em'
              }}
              />
            </button>
            )}
            {commChatDis ? (
                          <button className="
                          displayBtnActive
                          ">
                                          <span className="
                            flex
                            items-center
                            space-x-2
                            ">
                           <CommChatIcon 
                            style={{
                              fontSize: '1.8em',
                              color: 'yellow'
                            }}
                            />
                          <h3>
                            Community Chat
                          </h3>
                            </span>
                            <LeftIcon 
                            style={{
                              fontSize: '1.5em'
                            }}
                            />
                          </button>
            ): (
              <button 
              onClick={openCommChat}
              className="
              displayBtn
              ">
                              <span className="
                flex
                items-center
                space-x-2
                ">
               <CommChatIcon 
                style={{
                  fontSize: '1.8em',
                  color: 'yellow'
                }}
                />
              <h3>
                Community Chat
              </h3>
                </span>
                <RightIcon 
                style={{
                  fontSize: '1.5em'
                }}
                />
              </button>
            )}
           {resSec ? (
             <button className="
             displayBtnActive
             ">
                             <span className="
               flex
               items-center
               space-x-2
               ">
                 <ResIcon 
               style={{
                 fontSize: '1.8em',
                 color: 'yellow'
               }}
               />
             <h3>
               Resoures Section
             </h3>
               </span>
               <LeftIcon 
               style={{
                 fontSize: '1.5em'
               }}
               />
             </button>
           ): (
            <button 
            onClick={openResSec}
            className="
            displayBtn
            ">
                            <span className="
              flex
              items-center
              space-x-2
              ">
                <ResIcon 
              style={{
                fontSize: '1.8em',
                color: 'yellow'
              }}
              />
            <h3>
              Resoures Section
            </h3>
              </span>
              <RightIcon 
              style={{
                fontSize: '1.5em'
              }}
              />
            </button>
           )}
            {criSupp ? (
              <button className="
              displayBtnActive
              ">
                              <span className="
                flex
                items-center
                space-x-2
                ">
                  <CrisisIcon 
                style={{
                  fontSize: '1.8em',
                  color: 'yellow'
                }}
                />
              <h3>
                Crisis Support
              </h3>
                </span>
                <LeftIcon 
                style={{
                  fontSize: '1.5em'
                }}
                />
              </button>
            ): (
              <button 
              onClick={openCriSupp}
              className="
            displayBtn
            ">
                            <span className="
              flex
              items-center
              space-x-2
              ">
                <CrisisIcon 
              style={{
                fontSize: '1.8em',
                color: 'yellow'
              }}
              />
            <h3>
              Crisis Support
            </h3>
              </span>
              <RightIcon 
              style={{
                fontSize: '1.5em'
              }}
              />
            </button>
            )}
           </div>
           {/**end of display buttons */}
          {/**display content */}
          <div className="
          w-[60%]
           h-full
           bg-yellow-700
           bg-opacity-5
           py-4
          "></div>
          {/**
           * 
           * end of display content
           */}
        </div>
        <div className="
        w-[90%]
        h-[25%]
        bg-yellow-300
        bg-opacity-20
        rounded-md
        "></div>
        {/**end of main div */}
      </main>
      <main className="mobileMainDiv"></main>
      </>
          </div>
            <div className="mobileHomeDiv"></div>
          </>
  )
}


export async function getServerSideProps(){
  //code 
  const testNews = await fetch(
    'https://newsapi.ai/api/v1/article/getArticles?query=%7B%22%24query%22%3A%7B%22conceptUri%22%3A%22http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FCanoga_Park%2C_Los_Angeles%22%7D%2C%22%24filter%22%3A%7B%22forceMaxDataTimeWindow%22%3A%2231%22%7D%7D&resultType=articles&articlesSortBy=date&apiKey=c579d06b-559e-4166-9a13-e770f3eec391'
  ).then(res => res.json())

  return{
    props: {
      testNews
    }
  }
}