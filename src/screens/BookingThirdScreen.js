import React, {Component} from 'react';
import {View, StyleSheet, SafeAreaView, LogBox} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Label from '../components/Label';
import CustomInput from '../components/CustomInput';
import ConfirmLabel from '../components/ConfirmLabel';
import RoundButton from '../components/RoundButton';
import TopNavBar from '../components/TopNavBar';
import SeparatorLine from '../components/SeparatorLine';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

function FontIcon(IconName) {
  return <FontAwesome name={IconName} size={20} color="#000" />;
}

class BookingThirdScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: '',
      expired: '',
      cvc: '',
      discount_code: '',
    };
  }

  onCardNumberChange(cardNumber) {
    this.setState({cardNumber});
  }

  onExpiredChange(expired) {
    this.setState({expired});
  }

  onCvcChanged(cvc) {
    this.setState({cvc});
  }

  ondiscount_codeChange(discount_code) {
    this.setState({discount_code});
  }

  onContinue() {
    this.props.navigation.navigate('Payment', {
      ...this.props.route.params,
      discount_code: this.state.discount_code,
    });
  }

  render() {
    return (
      <View style={styles.flex}>
        <SafeAreaView style={styles.flex}>
          <TopNavBar
            title="Booking"
            leftButton="back"
            onBack={() => {
              this.props.navigation.navigate('BookingSecond', {
                ...this.props.route.params,
              });
            }}
          />
          <View style={styles.container}>
            <KeyboardAwareScrollView>
              <View style={styles.formView}>
                <View style={{alignItems: 'flex-start'}}>
                  <Label title="Pay with" />
                  <CustomInput
                    placeholder="CardNumber"
                    leftIcon={FontIcon('credit-card')}
                    onChange={cardNumber => this.onCardNumberChange(cardNumber)}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={styles.flex}>
                      <CustomInput
                        placeholder="MM/YY"
                        onChange={expired => this.onExpiredChange(expired)}
                      />
                    </View>
                    <View style={{width: 20}} />
                    <View style={styles.flex}>
                      <CustomInput
                        placeholder="CVC"
                        onChange={cvc => this.onCvcChanged(cvc)}
                      />
                    </View>
                  </View>
                </View>
                <Label title="Security Deposit" />
                <Label
                  color="#707070"
                  size={13}
                  align="left"
                  title="If confirmed, a hold of $500 will be placed on your card 48 hours before the experience."
                />
                <SeparatorLine />
                <Label title="Discount Code" />
                <CustomInput
                  placeholder="Enter discount code"
                  onChange={discount_code =>
                    this.ondiscount_codeChange(discount_code)
                  }
                />
                <SeparatorLine />
                <ConfirmLabel title="I confirm that I have read and accept Lake Hop's Terms of Service and Privacy Policy." />
                <ConfirmLabel title="I assign Jack Doe as the designated boat operator during my booked trip." />
              </View>
            </KeyboardAwareScrollView>
            <View
              style={{
                width: '100%',
              }}>
              <RoundButton
                title="Continue Booking"
                theme="main"
                arrow="right"
                onPress={() => this.onContinue()}
              />
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginBottom: 80,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },

  formView: {
    alignItems: 'flex-start',
    flex: 1,
  },
});

export default BookingThirdScreen;
