import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  LogBox,
  Image,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-toast-message';

import RoundButton from '../components/RoundButton';
import Label from '../components/Label';
import TopNavBar from '../components/TopNavBar';

import Images from '../theme/Images';

import {ConstantStore} from '../functions';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

class ActivitiesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fishing: false,
      leisure: false,
      watersports: false,
      celebrity_requested: false,
      loading: false,
    };
  }

  async componentDidMount() {
    const {fishing, leisure, watersports, celebrity_requested} = JSON.parse(
      await ConstantStore.getItem('newBoat'),
    );
    this.setState({
      fishing: fishing === undefined ? false : fishing,
      leisure: leisure === undefined ? false : leisure,
      watersports: watersports === undefined ? false : watersports,
      celebrity_requested:
        celebrity_requested === undefined ? false : celebrity_requested,
    });
  }

  async onSave() {
    let newBoat = JSON.parse(await ConstantStore.getItem('newBoat'));
    newBoat['fishing'] = this.state.fishing;
    newBoat['leisure'] = this.state.leisure;
    newBoat['watersports'] = this.state.watersports;
    newBoat['celebrity_requested'] = this.state.celebrity_requested;
    await ConstantStore.setItem('newBoat', JSON.stringify(newBoat));
    Toast.show({
      type: 'success',
      text1: 'Notification',
      text2: 'Successful Save!',
    });
  }

  onContinue() {
    if (
      Object.keys(this.state).some(key => this.state[key] === true) === false
    ) {
      Toast.show({
        type: 'info',
        text1: 'Notification',
        text2: 'Please selct at least one option.',
      });
      return;
    }
    this.props.navigation.navigate('ActivitiesDetail', {
      options: {...this.state},
    });
  }

  render() {
    const {fishing, leisure, watersports, celebrity_requested} = this.state;
    return (
      <View style={styles.flex}>
        <SafeAreaView style={styles.flex}>
          <TopNavBar
            leftButton="back"
            title="Add Boat - Activities"
            onBack={() => this.props.navigation.navigate('Name')}
          />
          <View style={styles.container}>
            <View style={styles.contentView}>
              <Label
                title="What types of activites does this experience offer?"
                align="left"
              />
              <View style={styles.blockGroup}>
                <TouchableOpacity
                  style={[styles.block, fishing ? styles.blockchecked : {}]}
                  onPress={() =>
                    this.setState({
                      fishing: !fishing,
                    })
                  }>
                  <Image source={Images.fishing} style={styles.image} />
                  <Label title="Fishing" align="left" />
                  {fishing && <View style={styles.checked} />}
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.block, leisure ? styles.blockchecked : {}]}
                  onPress={() =>
                    this.setState({
                      leisure: !leisure,
                    })
                  }>
                  <Image source={Images.leisure} style={styles.image} />
                  <Label title="Leisure" align="left" />
                  {leisure && <View style={styles.checked} />}
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.block, watersports ? styles.blockchecked : {}]}
                  onPress={() =>
                    this.setState({
                      watersports: !watersports,
                    })
                  }>
                  <Image source={Images.watersports} style={styles.image} />
                  <Label title="Watersports" align="left" />
                  {watersports && <View style={styles.checked} />}
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.block,
                    celebrity_requested ? styles.blockchecked : {},
                  ]}
                  onPress={() =>
                    this.setState({
                      celebrity_requested: !celebrity_requested,
                    })
                  }>
                  <Image source={Images.pro_athlete} style={styles.image} />
                  <Label title="Pro-Athlete" align="left" />
                  {celebrity_requested && <View style={styles.checked} />}
                </TouchableOpacity>
              </View>
              <View style={styles.buttonGroup}>
                <RoundButton
                  title="Save"
                  theme="dark_sky"
                  style={styles.flex}
                  onPress={() => this.onSave()}
                />
                <View style={styles.space} />
                <RoundButton
                  title="Continue"
                  theme="main"
                  arrow="right"
                  style={styles.flex}
                  onPress={() => this.onContinue()}
                />
              </View>
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
    marginBottom: 70,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  contentView: {
    marginTop: 20,
    flex: 1,
    paddingHorizontal: 20,
  },

  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  blockGroup: {
    flex: 1,
    marginVertical: 20,
  },

  block: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: '#707070',
    backgroundColor: '#F6F6F6',
    marginVertical: 10,
    paddingVertical: 10,
    borderRadius: 5,
  },

  blockchecked: {
    borderColor: '#4DC3CC',
  },

  image: {
    width: 30,
    height: 30,
    marginHorizontal: 20,
  },

  checked: {
    backgroundColor: '#4DC3CC',
    width: 15,
    height: 15,
    borderRadius: 10,
    position: 'absolute',
    right: 20,
  },

  space: {
    width: 20,
  },
});

export default ActivitiesScreen;
