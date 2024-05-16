import React from 'react'
import Image from '../components/layout/Image'
import error from '/public/images/error 404.jpg'

const Error = () => {
  return (
    <section className='h-[100dvh] w-full flex justify-center items-center'>
      <Image src={error} alt={"error image"} className={"w-[44%]"}/>
    </section>
  )
}

export default Error