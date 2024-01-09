import { ThemeContext } from '@emotion/react'
import React from 'react'
import { ScalingSquaresSpinner } from 'react-epic-spinners'

function Loader({theme}) {
  return (
    <div className={`loader loader-${theme}`}>
        <ScalingSquaresSpinner color={'#a576f9'} />
    </div>
  )
}

export default Loader