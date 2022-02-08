import React from "react";

const NewsItem = (props)=> {
 
    let { title, description, imageUrl, newsUrl, auther, date , source} = props;
    return (
      <div className="card my-2">
          <div className="card-header">
    {source}
  </div>
        <img className="card-img-top" src={imageUrl} alt="Card image cap" />
        <div className="card-body">
   
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-muted"> By {!auther? "Unknown": auther} Last updated on {new Date(date).toGMTString()}</small></p>
          <a href={newsUrl} target="_blank" className="btn btn-primary">
            Read More
          </a>
        </div>
      </div>
    );
  
}

export default NewsItem;
