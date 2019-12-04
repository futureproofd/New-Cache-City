/* eslint-disable indent */
import React from 'react';
import axios from 'axios';
import { FormStyle } from '../styles/FormStyle';
import Container from '../styles/containers/Container';
import Card from '../styles/containers/Card';
import Flex from '../styles/containers/Flex';

const uri = process.env.DEV_API;

const Account = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`${uri}account`, { withCredentials: true }).then((res) => {
      console.log(res);
    });
  };

  return (
    <Container>
      <Flex big>
        <Card justifyCenter>
          <FormStyle method="POST" onSubmit={handleSubmit}>
            <fieldset>
              <h2>Account Details</h2>
              <label htmlFor="email">
                Email (Your Account)
                <input
                  type="text"
                  readOnly="true"
                  placeholder="email"
                  value="dummy"
                />
              </label>
              <label htmlFor="name">
                Name
                <input type="text" placeholder="Name" value="dummy" />
              </label>
              <button type="submit">Save changes</button>
            </fieldset>
          </FormStyle>
        </Card>
      </Flex>
    </Container>
  );
};

export default Account;
