import Geocoder from 'react-native-geocoding';

export const getAddressFromLatLon = async (
  lat: number,
  lon: number,
): Promise<any> => {
  if (!(lat && lon)) {
    return Promise.resolve('');
  }
  const {results} = await Geocoder.from(lat, lon);

  const city = results[0].address_components[3].long_name;
  const preLast = results[0].address_components.length - 2;
  const last = results[0].address_components.length - 1;
  const country =
    results[0].address_components.lengt < 7
      ? results[0].address_components[last].long_name
      : results[0].address_components[preLast].long_name;

  const address = {city, country};
  return address;
};
