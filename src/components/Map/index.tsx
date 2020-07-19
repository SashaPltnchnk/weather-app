import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MapView, {Callout, MapEvent, Marker} from 'react-native-maps';

import axios from 'axios';

import {Config} from '../../../environments/environments';

import mapStyle from '../../shared/constant/map';
import {convertToCelsius} from '../../shared/utils/convert-to-celsius';
import {getAddressFromLatLon} from '../../shared/utils/get-address-from-lat-lon';
import {Address, Coordinates} from '../../shared/interfaces/map';

import {styles} from './styles';

const basicDelta = {
  latitudeDelta: 0.9,
  longitudeDelta: 0.9,
};

const coordinates: Coordinates = {
  latitude: 50.4501,
  longitude: 30.5234,
  ...basicDelta,
};

export const MapScreen: React.FC = () => {
  const [isMarkerShown, setMarkerShown] = useState<boolean>(false);
  const [markerCoord, setMarkerCoord] = useState<Coordinates>(coordinates);
  const [address, setAddress] = useState<Address | null>(null);
  const [temperature, setTemperature] = useState<string>('');

  const navigation = useNavigation();

  const onLongPress = async ({nativeEvent}: MapEvent) => {
    setMarkerCoord({
      latitude: nativeEvent.coordinate.latitude,
      longitude: nativeEvent.coordinate.longitude,
      ...basicDelta,
    });
    setMarkerShown(true);

    const address = await getAddressFromLatLon(
      nativeEvent.coordinate.latitude,
      nativeEvent.coordinate.longitude,
    );

    setAddress(address);

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.latitude}&lon=${coordinates.longitude}&exclude=minutely,hourly,daily&appid=${Config.WEATHER_API_KEY}`,
      )
      .then(({data}) => {
        const temp = convertToCelsius(data.current.temp);
        setTemperature(temp);
      })
      .catch((err) => console.log('get weather err', err));
  };

  const onCityPress = () => {
    navigation.navigate({
      name: 'Weather',
      params: {
        address,
      },
    });
  };

  return (
    <MapView
      style={styles.map}
      customMapStyle={mapStyle}
      initialRegion={coordinates}
      onLongPress={onLongPress}>
      {isMarkerShown && (
        <Marker coordinate={markerCoord} pinColor={'#824DAD'}>
          {!!address?.city && !!temperature && (
            <Callout
              style={styles.callout}
              tooltip={false}
              onPress={onCityPress}>
              <View style={styles.tooltip}>
                <Text style={styles.forecastText}>{address?.city},</Text>
                <Text style={styles.forecastText}>{address?.country}</Text>
                <Text style={styles.forecastText}>{temperature}</Text>
              </View>
            </Callout>
          )}
        </Marker>
      )}
    </MapView>
  );
};
