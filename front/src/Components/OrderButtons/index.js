import React from 'react'

function OrderButtons({ oneButton, firstButtonGray,cancelBtn, onCancel, processBtn, onProcess }) {
  return (
    <div className="col-12 d-md-flex justify-content-around mb-3">
      {oneButton ?
        <>
          <div className="col-12 text-center">
            <button
              className="process-btn process-btn__gray"
              style={{ width: '80%' }}
              onClick={onProcess}
            >
              {processBtn}
            </button>
          </div>
        </>
        :
        <>
          <div className="col-sm-12 col-md-5">
            <button
              className={ firstButtonGray ? "process-btn process-btn__gray": "process-btn process-btn__red"}
              style={{ width: '100%' }}
              onClick={onCancel}
            >
              {cancelBtn}
            </button>
          </div>
          <div className="col-sm-12 col-md-5">
            <button
              className="process-btn process-btn__gray"
              style={{ width: '100%' }}
              onClick={onProcess}
            >
              {processBtn}
            </button>
          </div>
        </>
      }
    </div>
  )
}

export default OrderButtons
