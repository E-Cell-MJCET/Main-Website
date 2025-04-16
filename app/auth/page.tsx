import React from 'react'

function Page() {
  return (
    <div className='flex h-screen flex-col items-center justify-center gap-4'>
      <h1 className='text-4xl font-bold'>Not Authenticated</h1>
      <form action="">
        <button>Sign in with Google</button>
      </form>
    </div>
  )
}

export default Page
