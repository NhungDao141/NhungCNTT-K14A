import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableNativeFeedback,
  TouchableOpacity,
  onLongPress,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { TouchableHighlight } from 'react-native-gesture-handler';

import { withNavigationFocus } from 'react-navigation';


class hienThi extends React.Component {
  static navigationOptions = {
    headerTitle: (
      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
        <Icon style={{ marginRight: 5 }} name="bars" size={22} color="#000" />
        <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#1a1a1a' }}>
          Danh sách sinh viên
        </Text>
      </View>
    ),
  };
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      isLoading: true,
      id: '',
    };
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.reLoad();
    });
    return fetch('http://nguyenhai.xyz/qlsv/hienThi.php')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        });
      })
      .catch(error => {
        alert('error');
      });
  }
  reLoad() {
    return fetch('http://nguyenhai.xyz/qlsv/hienThi.php')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        });
      })
      .catch(error => {
        alert(error);
      });
  }
  dialog(id){
    Alert.alert(
      'Xác nhận',
      'Bạn có muốn xóa sinh viên không?',
      [
        {text:'không', style:'cancel'},
        {text: 'có', onPress:()=>this.deleteItem(id)}
      ],{cancelable: false},
    );
  }

  deleteItem(id) {
    fetch('http://nguyenhai.xyz/qlsv/xoa.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then(response => {
        this.reLoad();
      })
      .catch(error => {
        alert('aaaa');
      });
  }
  sendData(id, ten, lop, sdt, email){
    this.props.navigation.navigate('sua', {
      id:id,
      ten:ten,
      lop:lop,
      sdt:sdt,
      email:email
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <FlatList
          refreshing={false}
          onRefresh={() => this.reLoad()}

          data={this.state.dataSource}
          renderItem={({ item }) => (
            <TouchableNativeFeedback
              onPress={() =>
                this.sendData(item.id, item.ten, item.lop, item.sdt, item.email)
              }
              onLongPress={() => this.dialog(item.id)}>
              <View style={styles.item}>
                <Text style={styles.title}>Mã sinh viên: {item.id}</Text>
                <Text style={styles.content}>Họ tên: {item.ten}</Text>
                <Text style={styles.content}>Lớp: {item.lop}</Text>
                <Text style={styles.content}>Số điện thoại: 0{item.sdt}</Text>
                <Text style={styles.content}>Email: {item.email}</Text>
              </View>
            </TouchableNativeFeedback>
          )
          }
          keyExtractor={({ id }, index) => id}
        />
        <TouchableNativeFeedback
          onPress={() => this.props.navigation.navigate('them')}>
          <View style={styles.fab1}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>
              +
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10, //
  },
  item: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,

    borderRadius: 8,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#e6f8f9',
  },
  title: {
    marginLeft: 10,
    marginRight: 10,
    fontWeight: 'bold',
    fontSize: 16,
    borderBottomColor: '#CBD5E0',
    borderBottomWidth: 1,
  },
  content: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    fontSize: 14,
  },
  fab1: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ff0000',
    position: 'absolute',
    bottom: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default withNavigationFocus(hienThi);
