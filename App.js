import React, { Component } from 'react';

import { 
  ActivityIndicator, 
  Button, 
  FlatList,
  Image,
  StyleSheet, 
  Text, 
  View 
} from 'react-native';

import { Constants } from 'expo';

var Dimensions = require('Dimensions');
var window = Dimensions.get('window');

export default class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,  
      asdf: [],    
    }
  }

  componentDidMount() {
    return fetch('http://employee-directory-services.herokuapp.com/employees')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          asdf: responseJson,
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _keyExtractor = (item, index) => item.id;

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <FlatList
          data={this.state.asdf}
          renderItem={({item}) => this.employeesData(item)}
          keyExtractor={this._keyExtractor}
        />
      </View>
    );
  }

  employeesData(emp) {
    return(
      <View>
        <View style= {styles.mainBox}>
          <Image
            source = {{uri: emp.picture}}
            style = {styles.empImage}
          />
          <View style= {styles.innerMainBox}>
            <Text>
              {emp.firstName} {emp.lastName}
            </Text>
            <Text>
              Post : {emp.title}
            </Text>
            <Text>
              E-Mail ID : {emp.email}
            </Text>
          </View>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  empImage: {
    height: 100,
    width: 100,
  },
  mainBox: {
    flexDirection: 'row',
    width: window.width,
  },
  innerMainBox: {
    flexDirection: 'column',
    width: window.width,
  }
})