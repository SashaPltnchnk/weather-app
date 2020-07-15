import React, {useState} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import MapView, {MapEvent, Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

import axios from 'axios';

import {Config} from '../../../environments/environments';

import mapStyle from '../../shared/constant/map';
import {convertToCelsius} from '../../shared/utils/convert-to-celsius';
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
  const [isWeatherShown, setWeatherShown] = useState<boolean>(false);
  const [address, setAddress] = useState<Address | null>(null);
  const [temperature, setTemperature] = useState<string>('');

  const navigation = useNavigation();

  const onLongPress = ({nativeEvent}: MapEvent) => {
    console.log(nativeEvent);

    setMarkerCoord({
      latitude: nativeEvent.coordinate.latitude,
      longitude: nativeEvent.coordinate.longitude,
      ...basicDelta,
    });
    setMarkerShown(true);

    Geocoder.from(
      nativeEvent.coordinate.latitude,
      nativeEvent.coordinate.longitude,
    )
      .then(({results}: any) => {
        const city = results[0].address_components[3].long_name;
        const country = results[0].address_components[5].long_name;
        setAddress({city, country});
      })
      .catch((error: Error) => console.log('Geocoder error', error));
  };

  const onMarkerPress = (event: MapEvent<{action: 'marker-press'; id: string}>) => {
    setWeatherShown(true);

    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${address?.city}&appid=${Config.WEATHER_API_KEY}`,
      )
      .then(({data}) => {
        const temp = convertToCelsius(data.main.temp);
        setTemperature(temp);
      })
      .catch((err) => console.log(err));
  };

  const onCityPress = () => {
    setWeatherShown(false);
    navigation.navigate({
      name: 'Weather',
      params: {
        address,
      },
    });
  };

  return (
    <>
      <MapView
        style={styles.map}
        customMapStyle={mapStyle}
        initialRegion={coordinates}
        onLongPress={onLongPress}>
        {isMarkerShown && (
          <Marker
            coordinate={markerCoord}
            pinColor={'#824DAD'}
            onPress={onMarkerPress}
          />
        )}
      </MapView>

      {isWeatherShown &&
        (!!address?.city && !!temperature ? (
          <TouchableOpacity onPress={onCityPress} style={styles.forecast}>
            <Text style={styles.forecastText}>
              {address?.city}, {address?.country} +{temperature}°
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.forecast}
            onPress={() => setWeatherShown(false)}>
            <Text style={styles.forecastText}>
              OOOPS: Something went wrong with that city
            </Text>
          </TouchableOpacity>
        ))}
    </>
  );
};
