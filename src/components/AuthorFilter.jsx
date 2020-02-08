import React from 'react';

function AuthorFilter(props){
    return(
        <div className="author-filter">
            <select 
                value={props.selectedAuthor}
                onChange={props.onAuthorChange}>
                <option value=''>Select an Author</option>
                {props.authorFilter.map((item)=>
                    <option key={item} value={item}>{item}</option>
                )}
            </select>
        </div>
    )
}

export default AuthorFilter;