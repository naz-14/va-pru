import React from 'react'

export const BoxCollapsible = ({
  title = 'Title',
  icon = 'fas fa-user',
  content = '',
  nestedContent = false,
  header = false,
}) => {
  return nestedContent ? (
    <div className="card collapsed-card">
      <div className="card-header border-0 permissions-cardH">
        <h3 className="card-title">
          <i className={`${icon} mr-1`}></i>
          {title}
        </h3>
        <div className="card-tools">
          <button
            type="button"
            className="btn btn-accept btn-sm"
            data-card-widget="collapse"
            title="Abrir"
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>
      <div className="card-body">
        {header && header}
        {content}
      </div>
    </div>
  ) : (
    <div className="card">
      <div className="card-header border-0 permissions-cardH">
        <h3 className="card-title">
          <i className={`${icon} mr-1`}></i>
          {title}
        </h3>
        <div className="card-tools">{content}</div>
      </div>
    </div>
  )
}

export default BoxCollapsible
