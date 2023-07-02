import React, { useEffect } from 'react'

const NotFound = () => {
    useEffect(()=> {
        console.error('NotFound')
    })
  return (
    <div>
      Page Not Found!
    </div>
  )
}

export default NotFound
