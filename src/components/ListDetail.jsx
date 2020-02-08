import React from 'react';

/** The right section showing the detailed view of each list item */

function ListDetail(props){
    const bgImg='url('+props.data.urlToImage+')';
    return(
        <div className="detailed-pane">
            <div className="detail-header">
                <div className="detailed-image" style={{backgroundImage: bgImg}}>
                </div>
                <div className="detailed-desc">
                    <h2>{props.data.title}</h2>
                    <p><b>Author:</b> {props.data.author}</p>
                    <p><b>Published:</b> {props.data.publishedAt}</p>
                </div>
            </div>
            <div className="detail-body">
                <p>{props.data.content}</p>
            </div>
            <div className="favourite">
                <button onClick={props.setFavourite}>
                {props.data.favourite ? 
                    <i className="fa fa-heart"></i>
                    :
                   <i className="far fa-heart"></i>
                }
                </button>
            </div>
        </div>
    )
}

export default ListDetail;