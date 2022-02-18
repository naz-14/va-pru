import React from 'react';

function OrderCol({mediumColSize='3', title, content}) {
    return (
        <div className={`col-sm-12 col-md-${mediumColSize}`}>
            <h5 className="header-text-details">{title}</h5>
            <p className="content-text-details">{content}</p>
        </div>
    );
}

export default OrderCol;