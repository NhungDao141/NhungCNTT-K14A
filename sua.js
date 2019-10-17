import React from 'react';
import { Text,
         View, 
         StyleSheet, 
         TextInput,
         TouchableOpacity, 
         TouchableWithoutFeedback } from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

export default class sua extends React.Component{
  static navigationOptions = {
    headerTitle: <Text style = {{fontWeight:'bold', fontSize:18, color:'#1a1a1a'}}>SỬA SINH VIÊN</Text>
  };

  constructor(){
    super();
    this.state = {
                  id:'',
                  ten:'',
                  lop:'',
                  sdt:'',
                  email:'',
                }
  }
  componentDidMount(){
    this.setState({
      id: this.props.navigation.state.params.id,
      ten: this.props.navigation.state.params.ten,
      lop: this.props.navigation.state.params.lop,
      sdt: this.props.navigation.state.params.sdt,
      email: this.props.navigation.state.params.email,
    })
  }

  updateData(){
    fetch('http://nguyenhai.xyz/qlsv/capNhat.php',{
      method: 'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        id:this.state.id,
        ten:this.state.ten,
        lop:this.state.lop,
        sdt:this.state.sdt,
        email:this.state.email,
      }),
    }).then((response) =>{
      this.props.navigation.navigate('hienThi');
    }).catch((error)=>{
      console.error(error);
    });
  }
  render(){
    return(
      <View style={styles.container}>
        <View style = {styles.form}>

          <TextInput 
            style= {styles.Input1} 
            onChangeText = {value => this.setState({ten:value})} 
            value={this.state.ten} 
            placeholder='Tên sinh viên' />

          <TextInput 
            style= {styles.Input1} 
            onChangeText = {value => this.setState({lop:value})}
            value={this.state.lop} 
            placeholder='Lớp' />

            <TextInput 
            style= {styles.Input1} 
            onChangeText = {value => this.setState({sdt:value})}
            value={this.state.sdt} 
            placeholder='Số điện thoại' />

            <TextInput 
            style= {styles.Input1} 
            onChangeText = {value => this.setState({email:value})}
            value={this.state.email} 
            placeholder='Số điện thoại' />

          <View style={{marginTop:60}}>
            <TouchableOpacity onPress={()=>this.updateData()} style = {styles.button}>
              <Text style = {styles.innerButton}>Cập nhật sinh viên</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#5c94bd'
  },
  form:{
    flex:1,
    marginLeft:10,
    marginRight:10,
    marginTop:70,
  },
  Input1:{
    fontSize:14,
    marginBottom:10,
    padding:10,
    borderColor:'#5f6769',
    borderWidth:1,
    borderRadius:40,
    backgroundColor:'#fff',
  },
  button:{
    borderRadius:40,
    padding:10,
    backgroundColor:'#ff0000',
  },
  innerButton:{
    textAlign:'center',
    fontWeight:'bold',
    color:'#fff'
  }
})