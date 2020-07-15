import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 20,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  input: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    flex: 1,
  },
  imageContainer: {
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
    padding: 8,
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 20,
    width: 20,
  },
  imageText: {
    fontWeight: 'bold',
    marginLeft: 3,
    fontSize: 16,
  },
  forecast: {
    marginTop: 20,
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#824DAD',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  day: {
    color: 'white',
    fontSize: 18,
  },
  temperature: {
    color: 'white',
    fontSize: 18,
  },
});
