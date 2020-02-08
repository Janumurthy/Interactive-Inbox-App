import React from 'react';

function ListItem(props){
    const bgImg='url('+props.urlToImage+')';
    const date = new Date(props.publishedAt).toDateString();
    const delay = props.delay+'s';
    const active = props.selectedData.title === props.title;
    const read = props.read;
    return(
        <li className={ active && read ? 'read active each-item' 
            : read ? 'read each-item' 
            : active ? 'active each-item' 
            : 'each-item'} 
            onClick={props.showDetail}
            style={{animationDelay:delay}}
        >
            <div className="item-image" style={{backgroundImage: bgImg}}>
            </div>
            <div className="item-desc">
                {props.read ? <i className='fa fa-check'></i> : ''}
                <h4>{props.title}</h4>
                <div className="text-small">
                    <span><b>Author:</b> {props.author} </span>
                    <span><b>Published:</b>  {date}</span>
                </div>
            </div>
        </li>
    )
}

export default ListItem;