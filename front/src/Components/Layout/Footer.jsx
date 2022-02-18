import React from 'react'
import moment from 'moment'
export const Footer = () => {
  return (
    <footer className="main-footer">
      <strong>
        Copyright &copy; {moment().format('YYYY')}{' '}
        <a href="https://google.com">DynamicSolutions</a>
      </strong>
      <div className="float-right d-none d-sm-inline-block">
        <b>Version</b> 1.0.0
      </div>
    </footer>
  )
}
export default Footer
