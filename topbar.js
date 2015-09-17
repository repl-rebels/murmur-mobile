'use strict';

var React = require('react-native');

var {
  Text,
  View,
  StyleSheet,
  NavigatorIOS
} = React;

var EmptyPage = React.createClass({

  render: function() {
    return (
      <View style={styles.emptyPage}>
        <Text style={styles.emptyPageText}>
          {this.props.text}
        </Text>
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
