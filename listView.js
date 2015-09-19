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
      loaded: false
    };
  },

  // _pressData: ({}: {[key: number]: boolean}),

  componentWillMount: function() {
    // this._pressData = {};
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

    switch(this.props.filter.filter) {
      case 'mostRecent':
        messagesArray.sort(function(a, b) {
          return a.timestamp - b.timestamp;
        });
        console.log('Most Recent: ', messagesArray);
        break;

      case 'mostViewed':
        messagesArray.sort(function(a, b) {
          return b.votes - a.votes;
        });
        console.log('Most Viewed: ', messagesArray);
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
      <View>
        <View style={styles.row}>
          <Text style={styles.text}>
            {rowData.message}
          </Text>
        </View>
        <View style={styles.separator} />
      </View>
    );
  },

  // _genRows: function(): Array<string> {
  //   var dataBlob = [];
  //   // for (var ii = 0; ii < 100; ii++) {
  //   //   console.log('pressData[ii]: ', pressData[ii]);
  //   //   var pressedText = pressData[ii] ? ' (pressed)' : '';
  //   //   dataBlob.push('Row ' + ii + pressedText);
  //   // }

  //   for (var msg in this.props.messages) {
  //     // var pressedText = pressData[ii] ? ' (pressed)' : '';
  //     dataBlob.push(msg.message);
  //   }
  //   console.log('dataBlob length: ', dataBlob.length);
  //   return dataBlob;
  // },

  // _pressRow: function(rowID: number) {
  //   this._pressData[rowID] = !this._pressData[rowID];
  //   this.setState({dataSource: this.state.dataSource.cloneWithRows(
  //     this._genRows(this._pressData)
  //   )});
  // },
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
  text: {
    flex: 1,
  },
});

module.exports = ListViewSimpleExample;
