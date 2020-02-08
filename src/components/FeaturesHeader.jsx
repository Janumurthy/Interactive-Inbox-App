import React from 'react';
import AuthorFilter from './AuthorFilter';
import GroupFilter from './GroupFilter';
import SortButton from './SortButton';

function featuresHeader(props){
    return(
        <div className="features-header">
            <div className="filters">
                { props.authorFilter ? 
                    <AuthorFilter 
                        authorFilter ={props.authorFilter}
                        onAuthorChange = {props.onAuthorChange}
                        selectedAuthor={props.selectedAuthor}
                    /> : ''
                }
                { props.groupFilter ? 
                    <GroupFilter 
                        groupFilter ={props.groupFilter}
                        onGroupChange = {props.onGroupChange}
                        selectedGroup={props.selectedGroup}
                    /> : ''
                }
            </div>
            <div className="reset">
                <button value="Reset" onClick={props.resetFilters}>Reset</button>
            </div>
            <SortButton 
                sort={props.sort}
                sortOrder={props.sortOrder}
            />
        </div>
    )
}

export default featuresHeader;