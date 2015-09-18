/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var TopBar = require('./topbar.js');
var ListView = require('./listView.js');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  TabBarIOS,
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

  renderView: function(pageText: string, color: string){
    return (
      <View style={{backgroundColor: color}}>
        <TopBar />
        <ListView />
      </View>
    )
  },

  render: function(){
    return (
      
      <TabBarIOS>

        <TabBarIOS.Item
          title="New"
          systemIcon='most-recent'
          selected={this.state.selectedTab === 'mostRecent'}
          onPress={() => {
            this.setState({
              selectedTab: "mostRecent",
            });
          }}>
          {this.renderView('Most Recent Acquisitions', '#6A5ACD')}
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Hot"
          systemIcon='most-viewed'
          selected={this.state.selectedTab === 'mostViewed'}
          onPress={() => {
            this.setState({
              selectedTab: "mostViewed",
            });
          }}>
          {this.renderView('Most Viewed Acquisitions', '#FF7F50')}
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="favorites"
          systemIcon='favorites'
          selected={this.state.selectedTab === 'favorites'}
          onPress={() => {
            this.setState({
              selectedTab: "favorites",
            });
          }}>
          {this.renderView('Most favorited Acquisitions', '#FAEBD7')}
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="myPosts"
          systemIcon='bookmarks'
          selected={this.state.selectedTab === 'bookmarks'}
          onPress={() => {
            this.setState({
              selectedTab: "bookmarks",
            });
          }}>
          {this.renderView('My Acquisitions', '#9ACD32')}
        </TabBarIOS.Item>

      </TabBarIOS>

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
  },
  tabText: {
    alignItems: 'center',
    margin: 100,
  }
});

AppRegistry.registerComponent('murmurMobile', () => murmurMobile);
