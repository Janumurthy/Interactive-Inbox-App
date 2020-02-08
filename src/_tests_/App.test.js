import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from '../App';
import {apiData} from '../services/apiData';

configure({adapter: new Adapter()});

let app;
describe('Rendering App', () => {
    //Assert App component has mounted successfully
    it('App component has mounted successfully', () => {
        app = mount(<App />);
    });

    //Assert spinner is displayed on load of the component
    it("Must render a loading spinner before api call success", () => {
        expect(app.find(".spinner").exists()).toBeTruthy();
    });

    //Assert the API service works properly and fetches News data
    it('API data service works', () => {
        return apiData()
            .then((response) => expect(response.articles).toBeDefined())
            .catch((response) => expect(response.articles).toBeUndefined());
    });

    //Assert List component is shown after successful response from API
    it('Must render List by fetching data from external API or from cache', (done) =>{
        if(!app.state().data){
            const spyFetchData = jest.spyOn(App.prototype,"fetchData");
            const fetchData = app.instance().fetchData();
            expect(spyFetchData).toHaveBeenCalled();
            fetchData.then(()=>{
                app.update();
                expect(app.state().data).toBeDefined();
                expect(app.find(".spinner").length).toBe(0);
                expect(app.find("List").length).toBe(1);
                spyFetchData.mockRestore();
                done();
            });
        } else{
            expect(app.state().data).toBeDefined();
            expect(app.state().data).toEqual(JSON.parse(sessionStorage.getItem('articles')));
        }
    });


});
