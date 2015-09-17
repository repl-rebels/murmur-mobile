'use strict';

var React = require('react-native');

var {
  Text,
  View,
  StyleSheet
} = React;

var TopBar = React.createClass({
  render: function() {
    return (
      <View style={styles.background}>
        <Text>Murmur</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  background: {
    backgroundColor: 'blue',
    paddingTop: 20
  },


});

module.exports = TopBar;
