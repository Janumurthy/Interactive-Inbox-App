import React from 'react';

function GroupFilter(props){
    return(
        <div className="group-filter">
            <select 
                value={props.selectedGroup}
                onChange={props.onGroupChange}>
                <option value=''>Select a Group</option>
                {props.groupFilter.map((item)=>
                    <option key={item} value={item}>{item}</option>
                )}
            </select>
        </div>
    )
}

export default GroupFilter;