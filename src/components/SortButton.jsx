import React from 'react';

function SortButton(props){
    return(
        <div className="sort">
            {props.sortOrder==='asc' ? 
                <button onClick={props.sort}><span>Newest First </span><i className='fas fa-sort-amount-down'></i></button>
                :
                <button onClick={props.sort}><span>Oldest First </span> <i className='fas fa-sort-amount-up'></i></button>
            }
        </div>
    )
}

export default SortButton;