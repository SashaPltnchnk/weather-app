import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useRoute} from '@react-navigation/native';

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
  const [value, onChangeText] = useState(route.params?.address?.city ?? '');
  const [temperature, setTemperature] = useState<string>('');

  const getTemp = () => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${Config.WEATHER_API_KEY}`,
      )
      .then(({data}) => {
        const temp = convertToCelsius(data.main.temp);
        setTemperature(temp);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getTemp();
  }, []);

  const onSearch = () => {
    getTemp();
  };

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={'Enter city name'}
          onChangeText={(text) => onChangeText(text)}
          value={value}
        />
        <TouchableOpacity style={styles.imageContainer} onPress={onSearch}>
          <Image
            source={require('../../../assets/icons/search.png')}
            style={styles.image}
          />
          <Text style={styles.imageText}>Search</Text>
        </TouchableOpacity>
      </View>
      {!!value && !!temperature ? (
        weekDays.map((day) => {
          return (
            <View key={day.id} style={styles.forecast}>
              <Text style={styles.day}>{day.name}</Text>
              <Text style={styles.temperature}>+{temperature}°</Text>
            </View>
          );
        })
      ) : (
        <View>
          <Text>Please, select a city</Text>
        </View>
      )}
    </View>
  );
};
