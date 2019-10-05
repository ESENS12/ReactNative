/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import Loading from './Component/Loading';
import GettingLocation from './getting_location';

// geolocation API sample
// geolocation.getCurrentPosition(geo_success, [geo_error], [geo_options]);
//
const geolocation = navigator.geolocation;

const App: () => GettingTheFockinWeather = () => {
  return (
    <>
      {/*<Loading />*/}
      <GettingLocation />
    </>
  );
};

export default App;
