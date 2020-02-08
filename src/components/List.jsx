import React, {Component} from 'react';
import ListGrid from './ListGrid';
import FeaturesHeader from './FeaturesHeader';

class List extends Component{
    constructor(props){
        super(props);
        // Filter options for the 2 filters
        this.authorFilter = [];
        this.groupFilter = ['Favourites', 'Unread'];
        // Initial state
        this.state={
            list: props.data,
            toShow: props.data[0],
            selectedAuthor: '',
            selectedGroup:'',
            sortOrder:'desc',
        }
        // Bind all the necessary handlers
        this.getAuthors = this.getAuthors.bind(this);
        this.getAuthors();
        this.onAuthorChange = this.onAuthorChange.bind(this);
        this.onGroupChange = this.onGroupChange.bind(this);
        this.resetFilters = this.resetFilters.bind(this);
        this.showDetail = this.showDetail.bind(this);
        this.setFavourite = this.setFavourite.bind(this);
        this.sort = this.sort.bind(this);
    }

    // Get data for the author filter dropdown
    getAuthors(){
        this.props.data.map((item)=>{
            if(this.authorFilter.indexOf(item.author)<0){
                this.authorFilter.push(item.author)
            }
        })
    }

    // Handle Author Filter selection
    onAuthorChange(e){
        const newState = this.props.data.slice();
        const selectedList = newState.filter((item)=> item.author ===  e.target.value);
        this.setState({
            selectedAuthor: e.target.value,
            selectedGroup: '',
            list: selectedList.length ? selectedList : '',
            toShow: selectedList.length ? selectedList[0] : ''
        })
    }

    // Handle Group Filter selection
    onGroupChange(e){
        const newState = this.props.data.slice();
        let selectedList = this.props.data;
        if(e.target.value === 'Favourites'){
            selectedList = newState.filter((item)=> item.favourite === true) 
        } else if(e.target.value === 'Unread'){
            selectedList = newState.filter((item)=> item.read !== true) 
        }
        this.setState({
            selectedGroup: e.target.value,
            selectedAuthor: '',
            list: selectedList.length ? selectedList : '',
            toShow: selectedList.length ? selectedList[0] : ''
        })
    }

    // Handle resetting of filters
    resetFilters(){
        this.setState({
            list: this.props.data,
            toShow: this.props.data[0],
            selectedAuthor:'',
            selectedGroup:''
        });
    }

    // Handle sorting of list items in Newest first / Oldest first orders
    sort(){
        // Sorting by the published date of the article in ascending or descending
       if(this.state.sortOrder === 'asc') {
            this.state.list.sort((a,b)=> new Date(b.publishedAt) - new Date(a.publishedAt));
            this.setState({
                sortOrder: 'desc',
                toShow: this.state.list[0]
            });
        } else{
            this.state.list.sort((a,b)=> new Date(a.publishedAt) - new Date(b.publishedAt));
            this.setState({
                sortOrder: 'asc',
                toShow: this.state.list[0]
            });
        }
    }

    // Handle click of each list item to "Mark as Read" and "To Show Detail"
    showDetail(item){
        // Adding a property 'read' to the list object for the selected item and setting the selected item to be shown
        let newList = this.state.list.slice();
        let selectedItem = newList.find((i)=> i.title === item.title);
        newList.map((i)=> {
            if(i.title === item.title){
                i.read = true;
            }
        });        
        this.setState({
            toShow: selectedItem,
            list: newList
        })
    }

    // Handle click of 'Like button' on the Detailed section to set it as 'Favourite'
    setFavourite(item){
        // Adding a property 'favourite' to the list object for the selected item
        let newList = this.state.list.slice();
        newList.map((i)=> {
            if(i.title === item.title){
                i.favourite = i.favourite ? !i.favourite : true;
            }
        }); 
        this.setState({
            list: newList
        })   
    }

    render(){
        return(
            <div>
                <FeaturesHeader 
                    authorFilter ={this.authorFilter}
                    onAuthorChange = {this.onAuthorChange}
                    selectedAuthor={this.state.selectedAuthor}
                    groupFilter ={this.groupFilter}
                    onGroupChange = {this.onGroupChange}
                    selectedGroup={this.state.selectedGroup}
                    sort={this.sort}
                    sortOrder={this.state.sortOrder}
                    resetFilters={this.resetFilters}
                />
               <ListGrid 
                    list={this.state.list}
                    toShow={this.state.toShow}
                    showDetail={this.showDetail}
                    setFavourite={this.setFavourite}
               />
            </div>
        )
    }
}

export default List;