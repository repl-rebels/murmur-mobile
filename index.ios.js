'use strict';

var React = require('react-native');
var App = require('./app.js');
var {
  AppRegistry,
  StyleSheet,
  Navigator,
  View,
} = React;

var murmurMobile = React.createClass({

  getInitialState: function(){
    return null;
  },

  componentWillMount: function(){

  },

  _renderScene: function(route, navigator) {
    var Component = route.component;
    return (
      <View style={styles.container}>
        <Component
          route={route}
          navigator={navigator} />
      </View>
    );
  },

  render: function(){
    return (
      <Navigator
        sceneStyle={styles.container}
        ref={(navigator) => { this.navigator = navigator; }}
        renderScene={this._renderScene}
        tintColor="#FFFFFF"
        barTintColor="rgb(5,101,188)"
        titleTextColor="#FFFFFF"
        navigationBarHidden={true}
        initialRoute={{
          title: 'Murmur',
          component: App,
        }} />
    );
  }
});

var styles = StyleSheet.create({
 container: {
   flex: 1,
 }
});

AppRegistry.registerComponent('murmurMobile', () => murmurMobile);
