import React from 'react'

export const Loader = () => {
  return (
    <div style={{ paddingBottom: '24px' }}>
      <div
        className="spinner-border"
        style={{ width: '5rem', height: '5rem' }}
        role="status"
      >
        <span className="sr-only"></span>
      </div>
    </div>
  )
}
export default Loader
