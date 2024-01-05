import React from 'react'
import { PixelSpinner } from 'react-epic-spinners'

function Loader() {
  return (
    <div className='loader'>
        <PixelSpinner color={'#a576f9'} />
    </div>
  )
}

export default Loader