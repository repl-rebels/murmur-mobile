'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  Text,
  StyleSheet,
  View,
} = React;

var SampleView = React.createClass({

  render: function() {
    return (
      <View style={styles.container}>
        <Text>Jerod's back!</Text>
        <Text>No more half-days for the Chris's!</Text>
      </View>
    );
  },
});

var SampleNavButtonPush = React.createClass({

  render: function() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: SampleView,
          title: 'NavBar w/ Animation!',
          leftButtonTitle: 'Ex1',
          rightButtonTitle: 'Ex2',
          onRightButtonPress: () => {
            this.props.navigator.pop();  
          },
        }}
      />
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
  }
})

module.exports = SampleNavButtonPush;