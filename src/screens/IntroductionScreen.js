import React, {Component} from 'react';
import {View, StyleSheet, SafeAreaView, LogBox} from 'react-native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RoundButton from '../components/RoundButton';
import Label from '../components/Label';
import CustomInput from '../components/CustomInput';
import TopNavBar from '../components/TopNavBar';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

class IntroductionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      story: '',
      headline: '',
    };
  }

  render() {
    return (
      <View style={styles.flex}>
        <SafeAreaView style={styles.flex}>
          <TopNavBar
            leftButton="back"
            title="Add Boat - About You"
            onBack={() => this.props.navigation.navigate('Location')}
          />
          <View style={styles.container}>
            <View style={styles.contentView}>
              <KeyboardAwareScrollView>
                <View>
                  <View style={styles.part}>
                    <Label title="Your Story" />
                    <Label
                      size={12}
                      align="left"
                      title="What makes you uniquely qualified to host this experience? Tell guests why you’re passionate and knowledgeable about the subject matter."
                    />
                    <CustomInput
                      style={{height: 150}}
                      type="textarea"
                      placeholder="Have you been doing this for years? Are you from the area? Don’t be afraid to brag!"
                      onChange={story => this.setState({story})}
                      value={this.state.story}
                    />
                  </View>
                  <View style={styles.part}>
                    <Label title="Your Headline" />
                    <Label
                      size={12}
                      align="left"
                      title="Write a short headline describing yourself that will appear under your name for your listing. You can choose to highlight your experience with any activities, the boat, or with the area you’re hosting in."
                    />
                    <Label
                      size={12}
                      align="left"
                      title="Some examples: Fly fisherman since 2003, Sailing on Lake Cumberland since 2008, Grew up on Lake Cumberland"
                    />
                    <CustomInput
                      type="textarea"
                      placeholder="Start writing here..."
                      style={{height: 150}}
                      onChange={headline => this.setState({headline})}
                      value={this.state.headline}
                    />
                  </View>
                </View>
              </KeyboardAwareScrollView>
              <View style={styles.buttonGroup}>
                <RoundButton
                  title="Save"
                  theme="dark_sky"
                  style={styles.flex}
                  onPress={() => this.props.navigation.navigate('Name')}
                />
                <View style={{width: 20}} />
                <RoundButton
                  title="Continue"
                  theme="main"
                  arrow="right"
                  style={styles.flex}
                  onPress={() => this.props.navigation.navigate('Name')}
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

  separator: {
    marginVertical: 20,
    height: StyleSheet.hairlineWidth,
    width: '100%',
    backgroundColor: 'grey',
  },

  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  part: {
    marginVertical: 10,
    width: '100%',
    alignItems: 'flex-start',
  },
});

export default IntroductionScreen;
