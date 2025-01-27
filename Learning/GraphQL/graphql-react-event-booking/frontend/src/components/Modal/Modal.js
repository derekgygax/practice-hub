import React from 'react'

import './Modal.css';

export const Modal = (props) => {
  return (
    <div className='modal'>
      <header className='modal_header'>
        <h1>
          {props.title}
        </h1>
      </header>
      <section className='modal_content'>
        {props.children}
      </section>
      <section className='modal_actions'>
        {props.canCancel && <button className='btn' onClick={props.onCancel}>Cancel</button>}
        {props.canConfirm && <button className='btn' onClick={props.onConfirm}>{props.confirmText}</button>}
      </section>
    </div>
  )
}
