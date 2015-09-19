'use strict';

var React = require('react-native');
var ListView = require('./listView.js');
var Firebase = require('firebase');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  NavigatorIOS,
} = React;

var murmurMobile = React.createClass({

  getInitialState: function(){
    return {
      selectedTab: 'mostRecent',
    };
  },

  componentWillMount: function(){

  },

  toggleInputBox: function(){
    this.setState({ input: !this.state.input })
  },

  renderView: function(filter, color){
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          component: ListView,
          title: 'Murmur',
          leftButtonTitle: 'Search',
          rightButtonTitle: 'Compose',
          passProps: {
            filter: {filter}
          },
        }}
        tintColor="#FFFFFF"
        barTintColor={color}
        titleTextColor="#FFFFFF"
        translucent="true"
      />
    );
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
  }
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
});

AppRegistry.registerComponent('murmurMobile', () => murmurMobile);
