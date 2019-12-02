/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import Cache from '../components/Cache';

const fakeCache = {
  _id: 'someObjId',
  name: 'fake cache',
  description: 'testing 123',
  image: 'cache.jpg',
  createDate: '20191128',
  location: {
    coordinates: [{ lat: '123' }, { lng: '456' }],
    address: '123 fake street',
  },
  photo: 'cake.jpg',
  author: 'someObjId',
};

describe('<Cache />', () => {
  it('Renders and matches the snapshot', () => {
    const wrapper = shallow(<Cache item={fakeCache} user={fakeCache._id} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

describe('<Cache />', () => {
  it('Renders the name', () => {
    const wrapper = shallow(<Cache item={fakeCache} user={fakeCache._id} />);
    expect(wrapper.find('Link h1').text()).toBe(fakeCache.name);
  });
});
