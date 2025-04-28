import React from "react";
import styled from "styled-components";
import { Platform, TouchableOpacity, Dimensions, Animated, TouchableWithoutFeedback, Alert
 } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "./Loading";
import Success from "./Success";
import { connect } from "react-redux";
import { auth, signInWithEmailAndPassword } from '../FirbaseConfig';

function mapStateToProps(state) {
   return { menu: state.menu };
}

function mapDispatchToProps(dispatch) {
  return {
    closeLogin: () =>
      dispatch({
        type: "CLOSELOGIN"
      }),
      Login: (email) =>
        dispatch({
          type: "LOG",
          email: email
        })
  }
}

const screenHeight = Dimensions.get("window").height;


class Login extends React.Component {

    state = {
        email: "",
        password: "",
        isLoading: false,
        isSuccess: false,
        top: new Animated.Value(screenHeight),
        scale: new Animated.Value(1.3),
        translateY: new Animated.Value(0)

    };

    componentDidMount() {
      this.getUser();
    }

    setUser = async (name) => {
      try {
        await AsyncStorage.setItem("userName", name);
      } catch(error) {}
    }

    getUser = async () => {
      try{
        const name = await AsyncStorage.getItem("userName");
        if(name !== null){
          this.props.Login(name);

        }
      } catch(error) {}
    }

    handleLogin = () => {
        
        this.setState({ isLoading: true});

        const email = this.state.email;
        const password = this.state.password;

        signInWithEmailAndPassword(auth, email, password)

  .catch(function(error)  {
    Alert.alert("Error", error.message);
  })
  .then((response) => {
    this.setState({ isLoading: false });

    if (response) {
      console.log(response.user.email);
      this.setUser(response.user.email);
      this.props.Login(response.user.email);
      this.setState({ isSuccess: true});
      
      setTimeout(() => {
        this.setState({ isSuccess: false});
        this.props.closeLogin();
      }, 3000); 
    }
  })

    };

    componentDidUpdate(){
      if (this.props.menu == "openLogin"){
        Animated.timing(this.state.top, { toValue:0, duration: 0, useNativeDriver: false } ).start();
        Animated.spring(this.state.scale, {toValue: 1, useNativeDriver: false}).start();
        Animated.timing(this.state.translateY, { toValue: 0, duration: 0, useNativeDriver: false}).start();
      }
      if (this.props.menu == "closeLogin"){
        setTimeout(() => {
          Animated.timing(this.state.top, { toValue: screenHeight, duration: 0, useNativeDriver: false } ).start();
          Animated.spring(this.state.scale, {toValue: 1.3, useNativeDriver: false}).start();
        },500)
        Animated.timing(this.state.translateY, { toValue: 1000, duration: 500, useNativeDriver: false}).start();
      }
    }

    tapBackground = () => {
      this.props.closeLogin();
    };

    render() {
        return (
            <AnimatedContainer style={{top:this.state.top }}>

              <TouchableWithoutFeedback onPress={this.tapBackground} 
              style={{ position: "absolute", top: 0, left: 0}}>
              <BlackScreen />
              </TouchableWithoutFeedback>

                <AnimatedBox style={{ transform: [ {scale: this.state.scale},
                   {translateY: this.state.translateY} ]}}>
                    <Text>
                        Member Login
                    </Text>
                    <TextInput placeholder="Email" keyboardType="email-address"
                     onChangeText={(email) => {this.setState({ email: email})} }/>
                    <TextInput placeholder="Password" secureTextEntry={true} 
                    onChangeText={(password) => {this.setState({ password: password})} }/>

                    <TouchableOpacity onPress={this.handleLogin}>
                    <ButtonView>
                        <ButtonText>Login</ButtonText>
                    </ButtonView>
                    </TouchableOpacity>
                    
                </AnimatedBox>
                <Loading isActive={this.state.isLoading} />
                <Success isActive={this.state.isSuccess} />
            </AnimatedContainer>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);

const Container = styled.View`
position: absolute;
width: 100%;
height: 100%;
top: 0;
left: 0;
justify-content: center;
align-items: center;

`;


const AnimatedContainer = Animated.createAnimatedComponent(Container);


const BlackScreen = styled.View`
position: absolute;
width: 100%;
height: 100%;
top: 0;
left: 0;
background: rgba(0, 0, 0, 0.75);

`;


const Box = styled.View`
position: absolute;
width: 350px;
height: 386px;
margin-top: 40px;
background: white;
border-radius: 15px;
justify-content: center;
align-items: center;

  ${Platform.select({
    ios: `
      shadow-color: rgba(0, 255, 255, 0.6);
      shadow-offset: {width: 0, height: 0};
      shadow-opacity: 1;
      shadow-radius: 80px;
    `,
    android: `
      border-width: 8px;
      border-color: rgba(0, 255, 255, 0.6);
      elevation: 80;
    `,
  })} 

`;

const AnimatedBox = Animated.createAnimatedComponent(Box);

const Text = styled.Text`
font-size: 22px;
font-weight: 600;
color: black;
text-align: center;
margin-bottom: 30px;

`;

const TextInput = styled.TextInput`
margin-top: 30px;
width: 300px;
height: 38px;
background: #e4e4e4;
border-radius: 10px;
padding-left: 10px;

`;

const ButtonView = styled.View`
background: #48A7FF;
border-radius: 10px;
width: 300px;
height: 38px;
justify-content: center;
align-items: center;
margin-top: 30px;


`;

const ButtonText = styled.Text`
color: white;
text-transform: uppercase;
font-weight: 500;
font-size: 20px;

`;