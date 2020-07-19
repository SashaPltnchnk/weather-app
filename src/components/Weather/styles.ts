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
    padding: 8,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: 'transparent',
  },
  inputContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginTop: -8,
  },
  buttonContainer: {
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
    padding: 8,
    marginLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 50,
    maxHeight: 50,
    marginTop: 7,
  },
  buttonIcon: {
    height: 20,
    width: 20,
  },
  buttonText: {
    fontWeight: 'bold',
    marginLeft: 3,
    fontSize: 16,
  },
  content: {
    marginTop: 30,
  },
  forecast: {
    marginBottom: 20,
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#824DAD',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  textWhite: {
    color: '#fff',
    fontSize: 18,
  },
  textBlack: {
    color: '#000',
    fontSize: 18,
  },
});
