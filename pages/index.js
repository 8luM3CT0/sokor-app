//front-end
import Head from 'next/head'
import {
  Button,
  Icon,
  Header,
  Post
} from '../components/'
//back-end
import { supabase } from '../backend/supabase'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'


export default function Home () {

  const [postText, setPostText] = useState('')
  const [postTitle, setPostTitle] = useState('')

  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  const addToPost = async(data) => {
    const {data: insertedData, error} = await supabase
    .from('neutral_posts')
    .insert(data)

    if(error){
      console.error('Error in adding data to table >>>', error?.message)
      return null
    }
    return insertedData
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    const postData = {title: postTitle, post: postText}

    const insertedData = await addToPost(postData)

    if(insertedData){
      console.log('Post added successfully >>', insertedData)

    }

    setPostTitle('')
    setPostText('')
  }

  const revalidate = 0;
  
  useEffect(() => {
    const fetchPosts = async () => {
      const {data} = await supabase.from('neutral_posts').select();
      setPosts(data)
      setIsLoading(false)
    }
    fetchPosts()
  }, [])


  return (
    <div
      className='
    h-screen 
    overflow-hidden
    bg-slate-900
    bg-no-repeat 
    bg-cover
    '
    >
      <Head>
        <title>A blog for random thoughts</title>
      </Head>
      <Header />
      <main className="
      w-[90%]
      mx-auto
      border-x-2
      border-amber-400
      h-full
      overflow-hidden
      flex
      flex-col
      place-items-center
      space-y-4
      py-4
      ">
        <form onSubmit={handleSubmit} className="
        w-[90%]
        h-[30%]
        bg-slate-800
        mx-auto
        shadow-lg
        rounded-lg
        flex
        flex-col
        py-2
        place-items-stretch
        space-y-2
        ">
          <input 
          type="text" 
          placeholder={`What's the title for this, friend ?`}
          value={postTitle}
          onChange={e => setPostTitle(e.target.value)}
          className="
          h-[10%]
          rounded-lg
          w-[95%]
          mx-auto
          border-0
          bg-slate-600
          px-4
          py-2
          font-montserr
          font-semibold
          text-xl
          text-amber-200
          outline-none
          " />
          <textarea 
          type="text"
          value={postText}
          onChange={e => setPostText(e.target.value)}
          placeholder={`What's on your mind, stranger ?`}
          className="
          h-[70%]
          w-[95%]
          text-lg
          font-montserr
          font-normal
          px-4
          py-3
          text-amber-300
          mx-auto
          overflow-y-scroll
          scrollbar-thin
          scrollbar-track-slate-700
          scrollbar-thumb-amber-400
          rounded-md
          bg-slate-600
          outline-none
          "></textarea>
          <button
          type='submit'
          className='
          w-[60%]
          mx-auto
          h-[10%]
          rounded-lg
          bg-amber-700
          font-fira-sans
          font-semibold
          text-slate-50
          hover:shadow-xl
          hover:shadow-slate-800
          hover:-skew-x-12
          hover:border-slate-300
          hover:border-x-2
          hover:border-b-2
          active:border-x-4
          active:border-b-4
          active:shadow-amber-500
          active:shadow-md
          transform
          transition-all
          duration-300
          ease-in-out
          '
          >
            Post
          </button>
        </form>
        <div className="
        h-[60%]
        overflow-y-scroll
        scrollbar-thin
        scrollbar-track-amber-600
        scrollbar-thumb-slate-600
        bg-slate-800
        w-full
        space-y-12
        ">
          {isLoading ? (
            <p className="
            text-xl
            place-self-center
            text-slate-300
            font-montserr
            font-semibold
            -skew-x-8
            ">
              Loading...
            </p>
          ): (posts?.map(post => (
            <Post
            post={post}
            />
          )))}
        </div>
      </main>
          </div>
  )
}
