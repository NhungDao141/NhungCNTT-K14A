import React from 'react';
import {View,
        Text,
        StyleSheet,
        TextInput,
        TouchableNativeFeedback,
        TouchableOpacity
        } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class them extends React.Component{
  static navigationOptions =
  {
     title: 'Thêm sinh viên',
  };
  constructor(props) {
 
   super(props);
 
   this.state = {
 
     ten: '',
     lop: '',
     sdt: '',
     email: '',
   }
  }
  themSinhVien(){
    if(this.state.ten==='' || this.state.lop==='' || this.state.sdt===''|| this.state.email===''){
      alert('Không được để trống');
    }else{
      return fetch('http://nguyenhai.xyz/qlsv/them.php',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
 
        ten : this.state.ten,
 
        lop : this.state.lop,
 
        sdt : this.state.sdt,
 
        email: this.state.email
 
      }),
      }).then((response) =>{
        alert('Thêm thành công!');
        ()=>this.props.navgigation.navigate('hienThi');
      }).catch((error)=>{
        //alert("fail");
        //alert(this.state.ten);
      });
    }
    
  }
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput style={styles.input} 
            placeholder='Nhập họ tên'
             onChangeText={ value => this.setState({ ten : value }) }
             value={this.state.ten}
          />
          <TextInput style={styles.input}
            placeholder='Nhập lớp'
            onChangeText={ value => this.setState({ lop : value }) }
            value={this.state.lop}
          />
          <TextInput style={styles.input}
            placeholder='Nhập số điện thoại'
            onChangeText={ value => this.setState({ sdt : value }) }
            value={this.state.sdt}
          />
          <TextInput style={styles.input}
            placeholder='Nhập email'
            onChangeText={ value => this.setState({ email : value }) }
            value={this.state.email}
          />
          
        </View>
        <View style={{marginLeft:10, marginRight:10,}}>
          <TouchableOpacity onPress={()=>this.themSinhVien()}>
            <View style={styles.button}>
              <Text style={styles.innerButton}>Thêm sinh viên</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#5c94bd'
  },
  form:{
    marginTop:70,
    marginLeft:10,
    marginRight:10,
    marginBottom:50
  },
  input:{
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