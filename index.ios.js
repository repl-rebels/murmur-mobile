/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var TopBar = require('./topbar.js');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  TabBarIOS,
} = React;


var MainView = React.createClass({

  messages: [],
  getInitialState: function(){
    return {
      messages: '',
      sort: 'recent',
      token: '',
      auth: '',
      sessions: '',
    };
  },

  // Retrieve the messages data from Firebase
  componentWillMount: function(){
    // if(token){
    //   var context = this;
    //   this.firebaseRef = new Firebase('https://fiery-heat-3376.firebaseio.com/');
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
    //   this.messageRef = this.firebaseRef.child('Fresh Post');
    //   this.messageRef.on('value', function(dataSnapshot){
    //     this.messages.push(dataSnapshot.val());
    //     this.setState({
    //       messages: dataSnapshot.val()
    //     });
    //     console.log('inFreshPost', dataSnapshot.val())
    //   }.bind(this));

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

  handleSortRecent: function(){
    this.setState({sort: 'recent'});
  },
  handleSortPopular: function(){
    this.setState({sort: 'popular'});
  },
  handleFavorites: function(){
    this.setState({sort: 'favorites'});
  },
  handleMyPosts: function(){
    this.setState({sort: 'myPosts'});
  },
  toggleInputBox: function(){
    this.setState({ input: !this.state.input })
  },
  render: function(){
    return (
      
      <TabBarIOS>

        <TabBarIOS.Item
          title="New"
          systemIcon='most-recent'
          onPress={this.handleSortRecent}>
          <TopBar />
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Hot"
          systemIcon='most-viewed'
          onPress={this.handleSortPopular}>
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Favorites"
          systemIcon='favorites'
          onPress={this.handleFavorites}>
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="My Posts"
          systemIcon='bookmarks'
          onPress={this.handleMyPosts}>
        </TabBarIOS.Item>

      </TabBarIOS>

    );
  }
});

var AwesomeProject = React.createClass({
  render: function() {
    return (
      <MainView />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
