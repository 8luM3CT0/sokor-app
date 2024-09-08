//front-end
import Head from 'next/head'
import {
  Button,
  Icon,
  Header,
  Post,
  UserPost
} from '../components/'
import {BookOpenIcon} from '@heroicons/react/solid'
//back-end
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { creds, store } from '../backend/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollection} from 'react-firebase-hooks/firestore'
import firebase from 'firebase'

export default function Home ({testNews}) {

  const [postText, setPostText] = useState('')
  const [postTitle, setPostTitle] = useState('')
  const [user] = useAuthState(creds)
  //for posts
  const [postModal, setPostModal] = useState(false)
  const date = new Date().toLocaleDateString()

  const checkUserIfEditor = () => {
    if(user){
      const [editorSnapshot] = useCollection(
        store.collection('maki_users').where('email', '==', user?.email)
      )
      const userIsAnEditor = editorSnapshot?.size > 0
    }
  }

  const addPostToDb = e => {
    e.preventDefault()

    if(!postText || !postTitle){
      alert(`Lacking in one of the fields!! Please recheck`)
    } else {
      store.collection('maki_posts').add({
        postText,
        postTitle,
        addedBy: user?.email,
        adderName: user?.displayName,
        adderUrl: user?.photoURL,
        addedOn: date
      })
      setPostText('')
      setPostTitle('')
    }

  }


  const [makiPosts] = useCollection(
    store.collection('maki_posts').orderBy('addedOn', 'asc')
  )

 
  console.log('Test news api >>>>>>>>>>>>>>>>>>>>>>>>>>', testNews?.articles?.results)

  return (
    <>
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
      items-center
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
          {/**banner */}
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
            </span>
          </div>

          <div className="
          w-[50%]
          h-full
          "></div>
        </div>
        {/**banner */}
        {/**div with news headlines, input field && inputs by members*/}
        <div className="
        h-[90%]
        w-full
        lg:flex
        items-center
        space-x-2
        px-3
        py-2
        ">
          {/**news headlines */}
          <div className="
          h-[80%]
          lg:w-[40%]
          md:w-[50%]
          w-[90%]
          rounded-md
          flex
          flex-col
          items-center
          overflow-hidden
          ">
            <span className="
            font-fredoka
            font-semibold
            text-purple-100
            text-lg
            px-3
            bg-purple-800
            bg-opacity-80
            w-full
            rounded-t-md
            h-[40px]
            flex
            items-center
            ">
              News
            </span>
            <div className="
             bg-purple-600
            bg-opacity-40
            h-[50%]
            pb-12
            w-full
            rounded
            overflow-y-scroll
            scrollbar-thin
            scrollbar-track-purple-900
            scrollbar-thumb-violet-100
            space-y-8
            flex
            flex-col
            items-center
            ">
              {testNews && testNews?.articles?.results.map(news => (
                <span 
                className="
                flex
                flex-col
                w-[85%]
                space-y-4
                py-3
                bg-purple-800
                rounded-md
                border
                border-purple-50
                ">
                  <header className="
                  flex
                  items-center
                  w-full
                  justify-between
                  px-3
                  py-2
                  border-b
                  border-purple-50
                  ">
                    <span></span>
                    <button className="
                    rounded-full
                    p-2
                    text-purple-400
                    border
                    border-purple-400
                    hover:text-purple-500
                    hover:border-purple-500
                    focus:outline-none
                    transform
                    transition
                    duration-300
                    ease-in-out
                    ">
                      <BookOpenIcon 
                        className='
                        h-[15px]
                        '
                      />
                    </button>
                  </header>
                  <h2 className="
                  font-fredoka
                  font-semibold
                  text-lg
                  text-purple-50
                  px-2
                  ">
                    {news?.title}
                  </h2>
                </span>
              ))}
            </div>
          </div>
          {/**news headlines */}
          {/**input field && inputs by members */}
          <div className="
          h-[80%]
          lg:w-[60%]
          md:w-[50%]
          w-[90%]
          rounded-md
          flex
          flex-col
          items-center
          overflow-hidden
          ">
            {(user?.email == 'rumlowb@gmail.com' || checkUserIfEditor) ? (
                          <span 
                          onClick={() => setPostModal(true)}
                          className="
                          grid
                          place-items-center
                          w-full
                          bg-purple-400
                          hover:bg-purple-600
                          border
                          border-purple-100
                          rounded-md
                          px-3
                          py-2
                          group
                          transform
                          transition
                          duration-300
                          ease-in-out
                          ">
                            <h2 className="
                            font-fira-sans
                            font-semibold
                            text-lg
                            text-purple-50
                            group-hover:text-purple-200
                            transform
                          transition
                          duration-300
                          ease-in-out
                            ">
                              Post
                            </h2>
                          </span>
            ): (user && !checkUserIfEditor) ? (
              <>
              <span className="
                          grid
                          place-items-center
                          w-full
                          bg-purple-400
                          hover:bg-purple-600
                          border
                          border-purple-100
                          rounded-md
                          px-3
                          py-2
                          group
                          transform
                          transition
                          duration-300
                          ease-in-out
                          ">
                            <h2 className="
                            font-fira-sans
                            font-semibold
                            text-lg
                            text-purple-50
                            group-hover:text-purple-200
                            transform
                          transition
                          duration-300
                          ease-in-out
                            ">
                              Ask permission to add
                            </h2>
                          </span>
              </>
            ): (
              <>
                              <span className="
                          grid
                          place-items-center
                          w-full
                          bg-purple-400
                          hover:bg-purple-600
                          border
                          border-purple-100
                          rounded-md
                          px-3
                          py-2
                          group
                          transform
                          transition
                          duration-300
                          ease-in-out
                          ">
                            <h2 className="
                            font-fira-sans
                            font-semibold
                            text-lg
                            text-purple-50
                            group-hover:text-purple-200
                            transform
                          transition
                          duration-300
                          ease-in-out
                            ">
                              Log in
                            </h2>
                          </span>
              </>
            )}
            {/**end of span for posting */}
            <div className="
            bg-purple-600
            bg-opacity-40
            h-[50%]
            pb-12
            w-full
            rounded
            overflow-y-scroll
            scrollbar-hide
            space-y-8
            flex
            flex-col
            items-center
            ">
              {makiPosts && makiPosts?.docs.map(post => (
                <span className="
                max-h-[210px]
                min-h-[180px]
                w-[80%]
                bg-purple-50
                border
                border-purple-800
                rounded-md
                ">
                  <header className="
                  flex
                  items-center
                  justify-between
                  px-3
                  py-2
                  border-b
                  border-purple-800
                  ">
                    <h2 className="
                    font-fredoka
                    font-bold
                    text-purple-900
                    text-xl
                    ">
                      {post?.data()?.postTitle}
                    </h2>
                  </header>
                  <div className="
                  h-[70%]
                  w-full
                  px-3
                  py-2
                  text-base
                  text-purple-800
                  font-montserr
                  font-normal
                  overflow-y-scroll
                  scrollbar-thin
                  scrollbar-track-purple-800
                  scrollbar-thumb-violet-200
                  ">
                    {post?.data()?.postText}
                  </div>
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
          </div>
          {postModal && (
            <div className="
            h-full
            w-full
            fixed
            z-50
            inset-0
            flex
            items-center
            bg-purple-800
            bg-opacity-70
            overflow-hidden
            ">
              <div 
              onClick={() => setPostModal(false)}
              className="
              w-[25%]
              h-full
              "></div>
              <div className="
              w-[50%]
              h-full
              flex
              flex-col
              ">
                <div 
                onClick={() => setPostModal(false)}
                className="
                h-[15%]
                w-full
                "></div>
                <div className="
                bg-purple-900
                rounded-md
                h-[70%]
                w-full
                border
                border-slate-50
                ">
                  <header className="
                  flex
                  items-center
                  justify-between
                  h-[60px]
                  border-b
                  border-slate-50
                  px-3
                  py-2
                  ">
                    <h2 className="
                    font-montserr
                    font-semibold
                    text-lg
                    text-purple-50
                    ">
                      Post something, {user?.displayName}
                    </h2>
                  </header>
                  <div className="
                  h-full
                  w-full
                  px-3
                  py-2
                  flex
                  flex-col
                  items-center
                  space-y-2
                  ">
                    <input 
                    placeholder={`Title...`}
                    value={postTitle}
                    onChange={e => setPostTitle(e.target.value)}
                    type="text" 
                    className="
                    w-[90%]
                    bg-purple-700
                    rounded-md
                    text-purple-200
                    text-lg
                    font-fredoka
                    font-semibold
                    outline-none
                    border-0
                    focus:outline-none
                    px-3
                    py-2
                    " />
                    <textarea 
                    placeholder='Text...'
                    value={postText}
                    onChange={e => setPostText(e.target.value)}
                    className="
                    h-[70%]
                    w-[90%]
                    mx-auto
                    bg-purple-700
                    rounded-md
                    text-purple-200
                    text-lg
                    font-montserr
                    font-normal
                    outline-none
                    border-0
                    focus:outline-none
                    px-3
                    py-2
                    overflow-y-scroll
                    scrollbar-hide
                    "></textarea>
                    <span className="
                    w-full
                    flex
                    items-center
                    justify-between
                    px-3
                    py-2
                    ">
                      <span className='
                      w-[45%]
                      '></span>
                      <button 
                      disabled={!postTitle || !postText}
                      onClick={addPostToDb}
                      className="
                      focus:outline-none
                      bg-violet-600
                      rounded-md
                      text-purple-50
                      font-montserr
                      font-semibold
                      hover:bg-violet-800
                      hover:text-purple-100
                      transform
                      transition
                      duration-300
                      ease-in-out
                      w-[45%]
                      ">
                        Post
                      </button>
                    </span>
                  </div>
                </div>
                <div 
                onClick={() => setPostModal(false)}
                className="
                h-[15%]
                w-full
                "></div>
              </div>
                            <div 
              onClick={() => setPostModal(false)}
              className="
              w-[25%]
              h-full
              "></div>

            </div>
          )}
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