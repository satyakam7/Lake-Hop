import React from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown';
import CountryPicker from 'react-native-country-picker-modal';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import dateFormat from 'dateformat';

function toDate(value) {
  return dateFormat(value, 'ddd mmm dd, yyyy');
}

function toTime(value) {
  return dateFormat(value, 'HH : MM TT');
}

export default class CustomInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateShow: false,
      timeShow: false,
      country: '',
      cca2: 'US',
    };
  }

  render() {
    const {
      placeholder,
      leftIcon,
      rightIcon,
      style,
      type = 'text',
      value,
      data,
      minimumDate,
      autoFocus,
      onChange,
      onRefInput,
      onSubmitEditing,
    } = this.props;
    return (
      <View style={[styles.container, style]}>
        {type === 'text' && (
          <View style={styles.inputContainer}>
            {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
            <TextInput
              style={[styles.flex, styles.input]}
              placeholder={placeholder}
              ref={onRefInput}
              onSubmitEditing={onSubmitEditing}
              onChangeText={onChange}
              returnKeyType="next"
              value={value}
              autoFocus={autoFocus}
            />
            {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
          </View>
        )}
        {type === 'country' && (
          <View style={styles.countryInputContainer}>
            <CountryPicker
              onSelect={country => {
                this.setState({country: country.name, cca2: country.cca2});
                onChange(country.name);
              }}
              countryCode={this.state.cca2}
              withFilter
              withCountryNameButton
              // withEmoji
            />
            {/* <CountryFlag isoCode={this.state.cca2} size={25} /> */}
          </View>
        )}
        {type === 'number' && (
          <View style={styles.inputContainer}>
            {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
            <TextInput
              style={[styles.flex, styles.input]}
              placeholder={placeholder}
              ref={onRefInput}
              onSubmitEditing={onSubmitEditing}
              onChangeText={onChange}
              returnKeyType="next"
              value={value}
              keyboardType="numeric"
              autoFocus={autoFocus}
            />
            {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
          </View>
        )}
        {type === 'price' && (
          <View style={styles.inputContainer}>
            <View style={styles.leftIcon}>
              <FontAwesome5 name="dollar-sign" size={20} color="#000" />
            </View>
            <TextInput
              style={[styles.flex, styles.input]}
              placeholder={placeholder}
              ref={onRefInput}
              onSubmitEditing={onSubmitEditing}
              onChangeText={onChange}
              returnKeyType="next"
              value={value}
              keyboardType="numeric"
              autoFocus={autoFocus}
            />
          </View>
        )}
        {type === 'search' && (
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.flex, styles.input]}
              placeholder={placeholder}
              ref={onRefInput}
              onSubmitEditing={onSubmitEditing}
              onChangeText={onChange}
              returnKeyType="next"
              autoFocus={autoFocus}
            />
            <View style={styles.rightIcon}>
              <FontAwesome5 name="search" size={20} color="#000" />
            </View>
          </View>
        )}
        {type === 'chat' && (
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.flex, styles.input]}
              placeholder={placeholder}
              ref={onRefInput}
              onSubmitEditing={onSubmitEditing}
              onChangeText={onChange}
              returnKeyType="next"
              autoFocus={autoFocus}
            />
            <View style={styles.rightIcon}>
              <Ionicons name="send" color="#F47731" size={20} />
            </View>
          </View>
        )}
        {type === 'filter' && (
          <TouchableOpacity style={styles.inputContainer} onPress={onChange}>
            <TextInput
              style={[styles.flex, styles.input]}
              placeholder={placeholder}
              editable={false}
              autoFocus={autoFocus}
            />
            <View style={styles.rightIcon}>
              <Entypo name="sound-mix" color="#000" size={20} />
            </View>
          </TouchableOpacity>
        )}
        {type === 'email' && (
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.flex, styles.input]}
              placeholder={placeholder}
              keyboardType="email-address"
              ref={onRefInput}
              onSubmitEditing={onSubmitEditing}
              onChangeText={onChange}
              returnKeyType="next"
              value={value}
              autoFocus={autoFocus}
            />
          </View>
        )}
        {type === 'phone' && (
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.flex, styles.input]}
              placeholder={placeholder}
              keyboardType="phone-pad"
              ref={onRefInput}
              onSubmitEditing={onSubmitEditing}
              onChangeText={onChange}
              returnKeyType="next"
              value={value}
              autoFocus={autoFocus}
            />
          </View>
        )}
        {type === 'password' && (
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.flex, styles.input]}
              placeholder={placeholder}
              secureTextEntry={true}
              ref={onRefInput}
              onSubmitEditing={onSubmitEditing}
              onChangeText={onChange}
              returnKeyType="next"
              value={value}
              autoFocus={autoFocus}
            />
          </View>
        )}
        {type === 'textarea' && (
          <TextInput
            style={[styles.textarea]}
            placeholder={placeholder}
            multiline={true}
            ref={onRefInput}
            value={value}
            onSubmitEditing={onSubmitEditing}
            returnKeyType="next"
            onChangeText={onChange}
          />
        )}
        {type === 'time' && (
          <TouchableOpacity
            style={styles.flex}
            onPress={() => {
              this.setState({timeShow: true});
            }}>
            <View style={styles.date}>
              <TextInput
                style={styles.flex}
                editable={false}
                value={toTime(value)}
                onChange={time => {
                  onChange(time);
                }}
              />
              <FontAwesome5 name="clock" color="#000" size={20} />
            </View>
          </TouchableOpacity>
        )}
        {type === 'date' && (
          <TouchableOpacity
            style={styles.flex}
            onPress={() => {
              this.setState({dateShow: true});
            }}>
            <View style={styles.date}>
              <TextInput
                style={[styles.flex, styles.input]}
                editable={false}
                value={toDate(value)}
                onChange={text => {}}
              />
              <FontAwesome5 name="calendar-alt" color="#000" size={20} />
            </View>
          </TouchableOpacity>
        )}
        {type === 'select' && (
          <SelectDropdown
            data={data}
            defaultValueByIndex={value}
            onSelect={(selectedItem, index) => {
              onChange(index);
            }}
            renderDropdownIcon={isOpened => {
              return (
                <FontAwesome5
                  name={isOpened ? 'chevron-up' : 'chevron-down'}
                  color={'#000'}
                  size={18}
                />
              );
            }}
            buttonStyle={styles.dropdown2BtnStyle}
            buttonTextStyle={styles.dropdown2BtnTxtStyle}
            defaultButtonText={value && value.length ? value[0] : ''}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown2DropdownStyle}
            rowStyle={styles.dropdown2RowStyle}
            rowTextStyle={styles.dropdown2RowTxtStyle}
          />
        )}

        {this.state.dateShow && (
          <DateTimePicker
            value={value}
            minimumDate={minimumDate}
            onChange={(event, selectedDate) => {
              this.setState({dateShow: false});
              onChange(selectedDate);
            }}
          />
        )}
        {this.state.timeShow && (
          <DateTimePicker
            value={value}
            mode="time"
            onChange={(event, selectedDate) => {
              this.setState({timeShow: false});
              onChange(selectedDate);
            }}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    color: 'black',
  },

  container: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#707070',
  },

  leftIcon: {
    width: 40,
    alignItems: 'center',
  },

  rightIcon: {
    width: 40,
    alignItems: 'center',
  },

  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  countryInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },

  input: {
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },

  date: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },

  textarea: {
    textAlignVertical: 'top',
    flex: 1,
    padding: 10,
  },

  dropdown2BtnStyle: {
    flex: 1,
    height: 50,
    backgroundColor: 'transparent',
  },
  dropdown2BtnTxtStyle: {
    color: '#444',
    textAlign: 'left',
  },
  dropdown2DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown2RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown2RowTxtStyle: {color: '#444', textAlign: 'left'},
});
