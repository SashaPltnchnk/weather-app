import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  map: {
    flex: 1,
    position: 'relative',
  },
  callout: {
    position: 'relative',
    flex: 1,
    width: '80%',
  },
  tooltip: {
    flex: 1,
    minWidth: '80%',
  },
  forecast: {
    borderRadius: 20,
    backgroundColor: 'white',
    position: 'absolute',
    alignSelf: 'center',
    top: '35%',
    padding: 20,
    shadowColor: '#0001',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  forecastText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});
