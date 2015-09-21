'use strict';

var React = require('react-native');
var Firebase = require('firebase');
var Moment = require('moment');
var {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  ActivityIndicatorIOS,
} = React;

var ListViewSimpleExample = React.createClass({

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        }),
      loaded: false,
    };
  },

  componentWillMount: function() {
    this.getMessagesFromDatabase();
  },

  getMessagesFromDatabase: function() {
    this.firebaseRef = new Firebase('https://radiant-heat-7333.firebaseio.com/');
    this.messageRef = this.firebaseRef.child('Fresh Post');
    this.messageRef.on('value', function(dataSnapshot) {
      var filteredMessages = this.filterMessages(dataSnapshot.val());
      
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(filteredMessages),
        loaded: true,
      });
    }.bind(this));
  },

  filterMessages: function(messages) {
    var messagesArray = [];

    for(var message in messages) {
      messagesArray.push(messages[message]);
    }

    switch(this.props.filter) {
      case 'mostRecent':
        messagesArray.sort(function(a, b) {
          return b.timestamp - a.timestamp;
        });
        break;

      case 'mostViewed':
        messagesArray.sort(function(a, b) {
          return b.votes - a.votes;
        });
        break;
    };

    return messagesArray;
  },

  render: function() {
    while(!this.state.loaded) {
      return (
        <View style={styles.loading}>
          <ActivityIndicatorIOS
            color="#0000ff"
            animating={!this.state.loaded}
            style={styles.centering}
            size="large" />
        </View>
      );
    } 
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
      />
    );
  },

  _renderRow: function(rowData) {
    var faces = [
      'https://avatars0.githubusercontent.com/u/11153337?v=3&s=460',
      'https://avatars1.githubusercontent.com/u/7588348?v=3&s=460',
      'https://avatars0.githubusercontent.com/u/150330?v=3&s=460',
      'https://avatars1.githubusercontent.com/u/10872765?v=3&s=460',
      'https://avatars0.githubusercontent.com/u/9171254?v=3&s=460',
      'https://avatars2.githubusercontent.com/u/11528324?v=3&s=460',
      'https://avatars0.githubusercontent.com/u/10123701?v=3&s=460',
      'https://avatars0.githubusercontent.com/u/4110995?v=3&s=460',
    ];
    return (
      <View>
        <View style={styles.container}>
          <Image source={{uri: faces[Math.floor(Math.random() * faces.length)] }}
                 style={styles.image} />
            <View style={styles.messageContainer}>
              <Text style={styles.message}>
                {rowData.message}
              </Text>
              <Text style={styles.messageDetails}>
                { Moment(rowData.timestamp).fromNow() }
              </Text>
            </View>
            <View style={styles.votesContainer}>
              <Text style={styles.votes}>
                {rowData.votes}
              </Text>
            </View>
        </View>
        <View style={styles.separator} />
      </View>
    );
  },

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  loading: {
    flex: 1,
    backgroundColor: '#FFFFFD',
    justifyContent: 'center',
    alignItems: 'center'
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  thumb: {
    width: 64,
    height: 64,
  },
  image: {
    height: 48,
    width: 48,
    borderRadius: 25,
    marginTop: 2,
    alignSelf: 'center',
    marginRight: 15,
    marginLeft: 15
  },
  votesContainer: {
    alignItems: 'flex-end',
    backgroundColor: '#FFFFFD',
    marginRight: 20,
    marginTop: 20,
  },
  votesHeader: {
    textAlign: 'right',
    fontSize: 15,
    color: 'grey',
  },
  votes: {
    textAlign: 'right',
    alignItems: 'flex-end',
    fontSize: 15
  },
  messageContainer:{
    flex: 1,
  },
  message: {
    fontSize: 15,
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 4,
    marginRight: 10,
    color: '#DA552F',
    paddingLeft: 10,
  },
  messageDetails: {
    fontSize: 12,
    marginBottom: 10,
    color: 'gray',
    paddingLeft: 10,
  },
});

module.exports = ListViewSimpleExample;
