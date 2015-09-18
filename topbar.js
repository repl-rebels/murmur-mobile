'use strict';

var React = require('react-native');
var ListViewEx = require('./listView.js');
var {
  Text,
  View,
  StyleSheet,
  NavigatorIOS
} = React;

var EmptyPage = React.createClass({

  render: function() {
    return (
      <View>
        <Text>{this.props.text}</Text>
      </View>
    );
  },

});

var TopBar = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          component: EmptyPage,
          title: 'Murmur',
          rightButtonTitle: 'Compose',
          passProps: {
            text: 'The nav bar has custom colors with tintColor, ' +
              'barTintColor and titleTextColor props.',
          },
        }}
        tintColor="#FFFFFF"
        barTintColor="#183E63"
        titleTextColor="#FFFFFF"
        translucent="true"
      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },


});

module.exports = TopBar;
