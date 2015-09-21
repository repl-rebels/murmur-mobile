'use strict';

var React = require('react-native');
var ListView = require('./listView.js');
var Firebase = require('firebase');
var SampleNavButtonPush = require('./sampleNavButtonPush.js');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  NavigatorIOS,
} = React;


var App = React.createClass({

  getInitialState: function(){
    return {
      selectedTab: 'mostRecent',
    };
  },

  componentWillMount: function(){

  },

  render: function(){
    return (
      
      <TabBarIOS>

        <TabBarIOS.Item
          title="Most Recent"
          systemIcon='most-recent'
          selected={this.state.selectedTab === 'mostRecent'}
          onPress={() => {
            this.setState({
              selectedTab: "mostRecent",
            });
          }}>
          {this.renderView('mostRecent', 'rgb(5,101,188)')}
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Most Viewed"
          systemIcon='most-viewed'
          selected={this.state.selectedTab === 'mostViewed'}
          onPress={() => {
            this.setState({
              selectedTab: "mostViewed",
            });
          }}>
          {this.renderView('mostViewed', '#FF7F50')}
        </TabBarIOS.Item>

      </TabBarIOS>

    );
  },

  renderView: function(filter, color){
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          component: ListView,
          title: 'Murmur',
          leftButtonTitle: 'Message',
          rightButtonTitle: 'Votes',
          onRightButtonPress: () => {
            this.props.navigator.push({
              component: SampleNavButtonPush,
              color: 'red',
            });            
          },
          passProps: {
            color: color,
            filter: filter,
          },
        }}
        tintColor="#FFFFFF"
        barTintColor={color}
        titleTextColor="#FFFFFF"
        translucent="true"
      />
    );
  },

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  welcome: {
    fontSize: 20,
    justifyContent: 'center',
    margin: 10,
  },
  instructions: {
    justifyContent: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  brand: {
    color: '#333333',
    justifyContent: 'center'
  },
  inputBox: {
    borderColor: 'red'
  },
  tabText: {
    alignItems: 'center',
    margin: 100,
  },
  multiline: {
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    flex: 1,
    fontSize: 13,
    height: 50,
    padding: 4,
    marginBottom: 4,
  },
  multilineWithFontStyles: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Cochin',
    height: 60,
  },
});

module.exports = App;