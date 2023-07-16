//front-end
import Head from 'next/head'
import {
  Button,
  Icon,
  Header
} from '../components/'
//back-end


export default function Home () {
  

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
        <div className="
        w-[90%]
        h-[30%]
        bg-slate-800
        mx-auto
        shadow-lg
        rounded-lg
        "></div>
        <div className="
        h-[60%]
        overflow-y-scroll
        scrollbar-thin
        scrollbar-track-amber-600
        scrollbar-thumb-slate-600
        bg-slate-800
        w-full

        "></div>
      </main>
          </div>
  )
}

