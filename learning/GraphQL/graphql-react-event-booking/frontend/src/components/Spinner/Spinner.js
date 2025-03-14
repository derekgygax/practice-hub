import React from 'react'

import './Spinner.css';

export const Spinner = () => {
  return (
    <div className='spinner'>
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
