
import React from 'react'

function OrdersIssuesDetails({ 
    issues = '--', 
    user = '--', 
    timestap = '--' 
}) {
  return (
    <div className="col-12 overflow-auto">
      <div className="row">
        <div className={`col-sm-12 col-md-12 px-0`}>
          <p className="content-text-details px-2">
            <span>{ issues }</span>
            <br/>
            <small> {user} - {timestap} </small>
          </p>
        </div>
      </div>
    </div>
  )
}

export default OrdersIssuesDetails
