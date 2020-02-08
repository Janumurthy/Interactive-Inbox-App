## Interactive Inbox app
A ReactJS application which contains an inbox of news articles fetched using News API

### Creating a react app with a list and detailed view

#### Component Architecture and Logic
- Created a base container App component that contains the List component
- The List component comrpises of the 2 main sections of this app which is the list of items and their respective detailed view namely as ListItem and ListDetail components
- The mock data is being passed as props down to the List and iterating over the articles each ListItem component is rendered
- The default data to be shown is first initialised to the state variable as the first item in the list. 
- The ListDetail component is hence rendered with the default state
- Upon click of a list item, this state variable is updated to re-render the component
- The ListItem component gets re-rendered to show the list item in the active state
- The ListDetail component gets re-rendered to show the detailed view of the selected list item

#### Screenshot - Desktop View
<img src="list_detailed_view.png">

#### Responsive Layout
- Going by the usual 2 column desktop view changed to 1 column mobile 
- Making the List of Items sections as a vertically scrollable one
- This ensures the detailed view section is always visible to the user on landing on the page

#### Screenshot - Mobile View
<img src="list_detail_mobile_view.png">

### Testing
- List.test.jsx file covers basic unit testing of the List component
- Used enzyme and Jest for unit testing the component
- Assertions for the following
1. If the component renders properly
2. If the number of items rendered is equal to the number of items present in the mockdata
3. If the detailed view section shows the right data for that of the item selected

