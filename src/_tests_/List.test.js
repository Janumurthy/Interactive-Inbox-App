import React from 'react';
import { mount, configure, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import data from '../data/mockData.json';
import List from '../components/List';

configure({adapter: new Adapter()});

describe('List component renders successfully with the detailed view', () => {
    let list;
    it('List component has mounted successfully', () => {
        list = mount(<List 
            data={data.articles}/>);
    });

    it('Number of items rendered in the list is equal to the number of items present in the mock data', () => {
        const numOfItems = data.articles.length;
        expect(list.find('.each-item')).toHaveLength(numOfItems);
    });

    it('Clicking on an item in list shows its detailed view', ()=>{
        //Simulate click of any one of the items in the list
        list.find('.each-item').at(2).simulate('click');

        // Assert the item clicked has got a class active added to it and the detailed pane is shown
        expect(list.find('.each-item').at(2).hasClass('active')).toBe(true);
        expect(list.find('.detailed-pane').at(0).length).toBe(1);

        // Assert that the detailed pane shown is that of the item clicked in the list by comparing their titles
        const titleInList = list.find('.each-item.active').find('.item-desc h4');
        const titleInDetail = list.find('.detailed-pane').at(0).find('.detailed-desc h2');
        expect(titleInList.text()).toEqual(titleInDetail.text());
    });

    it('Clicking on an item marks it as read', ()=>{
        //Simulate click of any one of the items in the list
        list.find('.each-item').at(1).simulate('click');

        // Assert the item clicked has got a class read added to it and a check mark is added
        expect(list.state().list[1].read).toBeTruthy();
        expect(list.find('.each-item').at(1).hasClass('read')).toBe(true);
        expect(list.find('.each-item').at(1).find('.item-desc').find('.fa.fa-check').length).toBe(1);
    });


    it('Clicking on favourite button marks the item as favourite', ()=>{
        //Assert if the detailed pane is first visible with the favourite button
        expect(list.find('.detailed-pane').at(0).length).toBe(1);
        expect(list.find('.detailed-pane').at(0).find('.favourite').find('.far.fa-heart').length).toBe(1);

        //Simulate click of favourite button in the detailed pane
        list.find('.detailed-pane').at(0).find('.favourite').find('button').simulate('click');   

        // Assert if the list item has been favourited now
        expect(list.state().list[1].favourite).toBeTruthy();
        expect(list.find('.detailed-pane').at(0).find('.favourite').find('.far.fa-heart').length).toBe(0);
        expect(list.find('.detailed-pane').at(0).find('.favourite').find('.fa.fa-heart').length).toBe(1);
    });

    it('Filtering by author renders the appropriate list item', ()=>{
        //Assert if the filter by author dropdown is first visible with the options
        const authorDropdown = list.find('.author-filter').find('select').at(0);
        expect(authorDropdown.length).toBe(1);

        // Select an option from the author filter dropdown
        const randomOption = list.find('.author-filter').find('select').find('option').at(2);
        const randomOptionValue = list.find('.author-filter').find('select').find('option').at(2).text();
        randomOption.instance().selected = true;
        authorDropdown.simulate('change');

         // Assert if the list item has been filtered by the selected author now
         expect(list.state().selectedAuthor).toEqual(randomOptionValue);
         expect(list.find('.each-item').at(0).find('.text-small').text()).toContain(randomOptionValue);
         expect(list.find('.detailed-desc').at(0).find('p').at(0).text()).toContain(randomOptionValue);
    });

    it('Choosing Favourites in the group dropdown renders all favorites list items', ()=>{
        //Assert if the filter by group dropdown is first visible with the options
        const groupDropdown = list.find('.group-filter').find('select').at(0);
        expect(groupDropdown.length).toBe(1);

        // Select Favourite option from the author filter dropdown
        const favouriteOption = groupDropdown.find('option').at(1);
        const favouriteOptionValue = groupDropdown.find('option').at(1).text();
        favouriteOption.instance().selected = true;
        groupDropdown.simulate('change');

         // Assert if the list item has been filtered to show only favourites list items
         expect(list.state().selectedGroup).toEqual(favouriteOptionValue);
         list.state().list.map((item)=>{
            expect(item.favourite).toBeTruthy();
         })
         expect(list.find('.detailed-pane').at(0).find('.favourite').find('.far.fa-heart').length).toBe(0);
         expect(list.find('.detailed-pane').at(0).find('.favourite').find('.fa.fa-heart').length).toBe(1);
    });

    it('Choosing Unread in the group dropdown renders all unread list items', ()=>{
        //Assert if the filter by group dropdown is first visible with the options
        const groupDropdown = list.find('.group-filter').find('select').at(0);
        expect(groupDropdown.length).toBe(1);

        // Select Unread option from the author filter dropdown
        const unreadOption = groupDropdown.find('option').at(2);
        const unreadOptionValue = groupDropdown.find('option').at(2).text();
        unreadOption.instance().selected = true;
        groupDropdown.simulate('change');

        // Assert if the list item has been filtered to show only unread list items
         expect(list.state().selectedGroup).toEqual(unreadOptionValue);
         list.state().list.map((item)=>{
            expect(item.read).toBeFalsy();
         })
         expect(list.find('.each-item').at(1).hasClass('read')).toBe(false);
         expect(list.find('.each-item').at(1).find('.item-desc').find('.fa.fa-check').length).toBe(0);
    });


});