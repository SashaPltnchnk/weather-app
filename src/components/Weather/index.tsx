import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import axios from 'axios';

import {Config} from '../../../environments/environments';
import {convertToCelsius} from '../../shared/utils/convert-to-celsius';

import {TabNavigationParamList} from '../App';

import {styles} from './styles';

interface Week {
  id: number;
  name: string;
}

const weekDays: Week[] = [
  {id: 1, name: 'Monday'},
  {id: 2, name: 'Tuesday'},
  {id: 3, name: 'Wednesday'},
  {id: 4, name: 'Thursday'},
  {id: 5, name: 'Friday'},
  {id: 6, name: 'Saturday'},
  {id: 7, name: 'Sunday'},
];

type WeatherScreenRouteProp = RouteProp<TabNavigationParamList, 'Weather'>;

export const WeatherScreen: React.FC = () => {
  const route = useRoute<WeatherScreenRouteProp>();
  const passedAddress = route.params?.address;
  const [city, setCity] = useState(passedAddress?.city ?? '');
  const [temperature, setTemperature] = useState<string>('');

  const getTemp = (cityName: string) => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${Config.WEATHER_API_KEY}`,
      )
      .then(({data}) => {
        const temp = convertToCelsius(data.main.temp);
        setTemperature(temp);
      })
      .catch((err) => console.log(err));
  };

  const onSearch = () => {
    getTemp(city);
  };

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder={'Enter city name'}
          onPress={(data) => {
            setCity(data.structured_formatting.main_text);
          }}
          getDefaultValue={() =>
            passedAddress?.city
              ? `${passedAddress?.city}, ${passedAddress?.country}`
              : ''
          }
          query={{
            key: Config.GOOGLE_API_KEY,
            language: 'en',
          }}
          styles={{
            textInput: styles.input,
            textInputContainer: styles.inputContainer,
          }}
          enablePoweredByContainer={false}
          listUnderlayColor={'#824DAD'}
          renderRightButton={() => {
            return (
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={onSearch}>
                <Image
                  source={require('../../../assets/icons/search.png')}
                  style={styles.buttonIcon}
                />
                <Text style={styles.buttonText}>Search</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <View style={styles.content}>
        {!!city && !!temperature ? (
          weekDays.map((day) => {
            return (
              <View key={day.id} style={styles.forecast}>
                <Text style={styles.textWhite}>{day.name}</Text>
                <Text style={styles.textWhite}>{temperature}</Text>
              </View>
            );
          })
        ) : !!city && !temperature ? (
          <Text style={styles.textBlack}>
            Click `Search` to see the weather forecast
          </Text>
        ) : (
          <Text style={styles.textBlack}>Please, select a city ↑</Text>
        )}
      </View>
    </View>
  );
};
