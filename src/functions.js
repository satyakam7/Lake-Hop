import AsyncStorage from '@react-native-async-storage/async-storage';
import dateFormat from 'dateformat';
import Messages from './theme/Messages';

export const ToDate = date => dateFormat(date, 'mm / dd / yyyy');

export const ToDateOne = date => dateFormat(date, 'mmmm dd, yyyy');

export const ToDateTwo = date => dateFormat(date, 'ddd mmm dd yyyy');

export const ToTime = date => dateFormat(date, 'hh : mm TT');

export const numberWithCommas = x =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const tenMinFromNow = () =>
  new Date(new Date().getTime() + 600000).toString();

export const ConstantStore = {
  getItem: async key => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue;
    } catch (e) {
      // error reading value
    }
  },
  setItem: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
  },
};

export const isValidate = (type, value1, value2 = '') => {
  let validate = true;
  let error = '';
  if (type === 'firstname') {
    if (!value1.length) {
      validate = false;
      error = Messages.InputFirstName;
    }
  } else if (type === 'lastname') {
    if (!value1.length) {
      validate = false;
      error = Messages.InputLastName;
    }
  } else if (type === 'phone') {
    if (!value1.length) {
      validate = false;
      error = Messages.InputPhone;
    }
  } else if (type === 'email') {
    if (!value1.length) {
      validate = false;
      error = Messages.InputEmail;
    } else if (
      !String(value1)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
    ) {
      validate = false;
      error = Messages.EmailFormat;
    }
  } else if (type === 'password') {
    if (!value1.length) {
      validate = false;
      error = Messages.InputPassword;
    }
  } else if (type === 'pair-password') {
    const hasNumber = str => {
      for (let i = 0; i < str.length; i++) {
        if ('0' <= str[i] && str[i] <= '9') return true;
      }
      return false;
    };
    const hasLetter = str => {
      for (let i = 0; i < str.length; i++) {
        if ('a' <= str[i] && str[i] <= 'z') return true;
      }
      return false;
    };
    const hasCapital = str => {
      for (let i = 0; i < str.length; i++) {
        if ('A' <= str[i] && str[i] <= 'Z') return true;
      }
      return false;
    };
    if (!value1.length) {
      validate = false;
      error = Messages.InputPassword;
    } else if (value1.length < 8) {
      validate = false;
      error = Messages.PasswordMore8Letters;
    } else if (!hasLetter(value1)) {
      validate = false;
      error = Messages.PasswordIncludeLetter;
    } else if (!hasCapital(value1)) {
      validate = false;
      error = Messages.PasswordIncludeCapital;
    } else if (!hasNumber(value1)) {
      validate = false;
      error = Messages.PasswordIncludeNumber;
    } else if (value1 != value2) {
      validate = false;
      error = Messages.PasswordMatch;
    }
  }
  return {
    validate,
    error,
  };
};
