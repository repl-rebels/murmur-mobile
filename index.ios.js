/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var TopBar = require('./topbar.js');
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

  messages: [],
  getInitialState: function(){
    return {
      messages: '',
      sort: 'recent',
      token: '',
      auth: '',
      sessions: '',
      selectedTab: 'mostRecent',
    };
  },

  // Retrieve the messages data from Firebase
  componentWillMount: function(){
    // if(token){
    //   var context = this;
      // this.firebaseRef = new Firebase('https://fiery-heat-3376.firebaseio.com/');
    //   this.firebaseRef.authWithCustomToken(token, function(error, authData){
    //     if(error){
    //       console.log('Problem connecting to Database')
    //     } else{
    //       console.log('Connected to Databse')
    //       context.setState({
    //         token: authData.token,
    //         auth: authData.auth,
    //       });
    //     }
    //   })
      // this.messageRef = this.firebaseRef.child('Fresh Post');
      // this.messageRef.on('value', function(dataSnapshot){
      //   this.messages.push(dataSnapshot.val());
      //   this.setState({
      //     messages: dataSnapshot.val()
      //   });
      //   console.log('inFreshPost', dataSnapshot.val())
      // }.bind(this));

    //   this.sessionsRef = this.firebaseRef.child('sessions');
    //   this.sessionsRef.on('value', function(dataSnapshot){
    //     this.messages.push(dataSnapshot.val());
    //     this.setState({
    //       sessions: dataSnapshot.val()
    //     });
    //   // console.log('SESSSSSSSSSSSSSSSSionREF', this.sessionRef.toString())
    //     console.log('inSession', dataSnapshot.val())
    //   }.bind(this));
    // }
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

        <TabBarIOS.Item
          title="Favorites"
          systemIcon='favorites'
          selected={this.state.selectedTab === 'favorites'}
          onPress={() => {
            this.setState({
              selectedTab: "favorites",
            });
          }}>
          {this.renderView('favorites', '#FAEBD7')}
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Bookmarks"
          systemIcon='bookmarks'
          selected={this.state.selectedTab === 'bookmarks'}
          onPress={() => {
            this.setState({
              selectedTab: "bookmarks",
            });
          }}>
          {this.renderView('bookmarks', '#9ACD32')}
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
