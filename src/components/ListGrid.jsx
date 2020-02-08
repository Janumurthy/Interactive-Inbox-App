import React from 'react';
import ListItem from './ListItem';
import ListDetail from './ListDetail';
function ListGrid(props){
    return(
        <div className="grid">
        <ul className="left-pane">
            {props.list ?
                props.list.map((item,i)=> (
                    <ListItem 
                        key={item.title}
                        {...item}
                        selectedData={props.toShow}
                        showDetail={props.showDetail.bind(props,item)}
                        delay={i*0.25}
                    />                        
                    )
                ) :
                <p>No list data under props selection!</p>
            }
        </ul>
        <div className="right-pane">
            {props.toShow ? 
                <ListDetail 
                    data={props.toShow}
                    setFavourite={props.setFavourite.bind(props,props.toShow)}
                /> : <p>No detail data under props selection!</p>
            }
        </div>  
        </div>
    )
}
export default ListGrid;