import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
export const HomePage  = () => {
  return (
    <div style={{ background: 'black', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div className=' items-center'>
      <Button  className=''>
        <Link href="/shorten">
            Get Started!
        </Link>
      </Button>
    </div>
  </div>
  )
}
