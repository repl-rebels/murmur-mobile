'use strict';

var React = require('react-native');
var Firebase = require('firebase');
var {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
} = React;

var ListViewSimpleExample = React.createClass({
  statics: {
    title: 'Murmur',
    description: 'Performant, scrollable list of data.'
  },

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
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
      />
    );
  },

  _renderRow: function(rowData) {
    return (
      <View style={styles.container}>
        <View style={styles.messageContainer}>
          <Text style={styles.message}>
            {rowData.message}
          </Text>
        </View>
        <View style={styles.votesContainer}>
          <Text style={styles.votes}>
            {rowData.votes}
          </Text>
        </View>
        <View style={styles.separator} />
      </View>
    );
  },

});

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  thumb: {
    width: 64,
    height: 64,
  },
  votesContainer: {
    alignItems: 'flex-end',
    backgroundColor: '#FFFFFD',
    marginRight: 15
  },
  votes: {
    textAlign: 'right',
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
  },
});

module.exports = ListViewSimpleExample;
