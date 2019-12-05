/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import {
  FormEditStyle,
  DialogImage,
  MapImage,
  CacheImage,
} from '../styles/FormStyle';
import Container from '../styles/containers/Container';
import Card from '../styles/containers/Card';
import Flex from '../styles/containers/Flex';

const CacheDetail = (props) => {
  const [isMapOpen, setMapOpen] = useState(false);

  const handleOpenMap = () => {
    setMapOpen(!isMapOpen);
  };

  // pass cache item and user via props when routed from Caches / AddCache
  const { item, user } = props.location.state;

  return (
    <Container>
      <Flex justifyCenter>
        <Card big>
          <FormEditStyle key={item.id}>
            <fieldset disabled={!user} aria-busy={false}>
              <label htmlFor="name">
                Name
                <input
                  name="name"
                  type="text"
                  required
                  onChange={() => console.log('user edit')}
                  value={item.name}
                />
              </label>
              <CacheImage src={item.photo} alt={item.name} />
              <label htmlFor="description">
                Description
                <input
                  name="description"
                  type="text"
                  required
                  onChange={() => console.log('user edit')}
                  value={item.description}
                />
              </label>
              <label htmlFor="coordinates">
                Coordinates
                <input
                  name="coordinates"
                  type="text"
                  required
                  onChange={() => console.log('user edit')}
                  value={` lat: ${item.location.coordinates[1]}, lng: ${item.location.coordinates[0]}`}
                />
              </label>

              <label htmlFor="address">
                Approximate Location
                <input
                  name="address"
                  type="text"
                  required
                  onChange={() => console.log('user edit')}
                  value={item.location.address}
                />
              </label>
              <MapImage
                name="staticMapPrev"
                alt={item.location.address}
                onClick={handleOpenMap}
                src={`https://maps.googleapis.com/maps/api/staticmap?center=${item.location.coordinates[1]},${item.location.coordinates[0]}&zoom=17&size=700x200&key=${process.env.GOOGLE_API_KEY}&markers=${item.location.coordinates[1]},${item.location.coordinates[0]}&scale=2`}
              />
              {isMapOpen && (
                <dialog
                  open
                  style={{ position: 'absolute' }}
                  onClick={handleOpenMap}
                >
                  <DialogImage
                    name="staticMap"
                    alt={item.location.address}
                    onClick={handleOpenMap}
                    src={`https://maps.googleapis.com/maps/api/staticmap?center=${item.location.coordinates[1]},${item.location.coordinates[0]}&zoom=19&size=1000x500&key=${process.env.GOOGLE_API_KEY}&markers=${item.location.coordinates[1]},${item.location.coordinates[0]}&scale=2`}
                  />
                </dialog>
              )}
            </fieldset>
          </FormEditStyle>
        </Card>
      </Flex>
    </Container>
  );
};

export default CacheDetail;
