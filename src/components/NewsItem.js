import React, { Component } from 'react'
import PropTypes from 'prop-types'

const NewsItem =(props)=> {
    let {title, description, imageUrl, newsUrl, author, date} = props;
    return (
      <div className="my-3">
        <div className="card">
        <img src={!imageUrl?"https://w7.pngwing.com/pngs/200/214/png-transparent-utf-8-empty-set-unicode-null-set-symbol-miscellaneous-logo-data.png":imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text"><small className="text-muted">By {!author?"unknown":author} on {new Date(date).toGMTString()}</small></p>
          <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
        </div>
        </div>
      </div>
    )
}

export default NewsItem