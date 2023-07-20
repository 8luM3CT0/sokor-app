//front-end
import React, { useEffect, useState } from 'react'
//back-end
import { supabase } from '../../../backend/supabase'

function Post({post}) {

    const deletePost = async (id) => {
        

        const {error} = await supabase.from('neutral_posts').delete().eq('id', id)

        if(error){
            console.error('Error in deleting >>', error)
        } else {
            console.log('Post deleted successfully !!')
        }
    }


  return (
    <div 
    key={post?.id}
    className='postDiv'>
        <span className="
        h-[20%]
        w-full
        px-4
        py-3
        flex
        items-center
        justify-between
        ">
            <h1 className="
            font-fira-sans
            font-semibold
            text-xl
            text-slate-100
            ">
                {post?.title}
            </h1>
            <p className="
            font-montserr
            font-normal
            text-base
            text-slate-100
            ">
                {post?.created_at}
            </p>
        </span>
        <div className="
        h-[60%]
        w-full
        rounded-lg
        bg-slate-600
        px-3
        py-2
        overflow-y-scroll
        scrollbar-thin
        scrollbar-track-slate-700
        scrollbar-thumb-amber-600
        text-slate-50
        ">
            {post?.post}
        </div>
        <span className="
        h-[2s0%]
        w-full
        px-4
        flex
        items-ceter
        justify-between
        ">
            <h1></h1>
            <button 
            onClick={() => deletePost(post.id)}
            className="
            w-[50%]
            h-full
            font-montserr
            font-semibold
            text-lg
            text-slate-100
            bg-amber-600
            rounded-lg
            hover:border-2
            hover:border-amber-300
            active:bg-slate-100
            active:text-amber-700
            active:border-4
            active:border-amber-700
            transform
            transition-all
            duration-200
            ease-linear
            ">
                <h1>
                    Delete
                </h1>
            </button>
        </span>
    </div>
  )
}

export default Post