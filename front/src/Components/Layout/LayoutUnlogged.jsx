import React from 'react'

export const LayoutUnlogged = ({ children }) => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="content-fade-login">{children}</div>
      </div>
    </div>
  )
}

export default LayoutUnlogged
