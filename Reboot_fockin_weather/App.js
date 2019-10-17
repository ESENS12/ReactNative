/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import Loading from './Component/Loading';
import GettingLocationLikeNicolas from './Component/GettingLocationLikeNicolas';
import GettingLocation from './Component/Getting_Location';
import BasicLocationForExpo from './Component/BasicLocation_forExpo';

/**
 * todo  : when click this page -> need to change GettingLocation page .... or just get the location and showing !
 *
 * */

const App: () => GettingTheFockinWeather = () => {
  return (
    <>
      {/*<Loading />*/}
      {/*<GettingLocationLikeNicolas/>*/}
      {/*<BasicLocationForExpo/>*/}
      <GettingLocation />
    </>
  );
};

export default App;
