import React from 'react';
import App from './App';
import { shallow } from 'enzyme';
import api from './Api';

test('should display a text input to fill question', () => {
  const wrapper = shallow(<App/>);
  expect(wrapper.find('input[type="text"]').length).toBe(1);
} );

test('should display a submit button to send question',() => {

  const wrapper = shallow(<App/>);
  expect(wrapper.find('button[type="submit"]').length).toBe(1);
});

test('should not display any answer by default', () => {
  const wrapper = shallow(<App/>);
  expect(wrapper.find('.answer').length).toBe(0);
})

test('should display answer in both text and picture format',() => {
  const wrapper = shallow(<App/>);
  jest.mock('./Api');

  wrapper.find('button').simulate('click');

  return Promise.resolve()
        .then(() => {
          setTimeout(() => {
            wrapper.update();

            const answer = wrapper.find('.answer');
            expect(answer.find('h1').text()).toBe('no');
            expect(answer.find('img').prop('src')).toBe('https://yesno.wtf/assets/no/0-b6d3e555af2c09094def76cf2fbddf46.gif');

          },1000);
           
        });


});

describe('API Caller',() => {

  afterEach(() => {
    jest.resetAllMocks();
});

  test('should call YesNo API',() => {
    const fetchSpy = jest.spyOn(global,'fetch')
     .mockImplementation(() => Promise.resolve({
       json:() =>{}
     }));

    return api()
      .then(()=>{
        expect(fetchSpy).toHaveBeenCalledWith('https://yesno.wtf/api/');
      })
  });

  test('should return YesNo response in JSON format',() => {
    const fetchSpy = jest.spyOn(global,'fetch')
     .mockImplementation(() => Promise.resolve({
       json:() => ({'foo':'bar'}),
     }));
  
    return api()
      .then((response)=>{
        expect(response).toEqual({'foo':'bar'})
      })
  });

})
