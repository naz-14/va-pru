import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export const ContentHeader = ({
  title = 'Title',
  breadcrumb = 'breadcrumb',
  windowTitle = 'Window Title',
}) => {
  const _title = JSON.parse(localStorage.getItem('configSys'))

  useEffect(() => {
    document.title = `${_title?.project_name} | ${windowTitle}`
  }, [title, windowTitle, _title?.project_name])

  return (
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="header-title">{title}</h1>
          </div>
          {breadcrumb !== '' && (
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">{breadcrumb}</li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ContentHeader
