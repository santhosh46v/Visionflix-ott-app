import React from "react";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons"

export default class MedCard extends React.Component {
    render() {
        return (
            <Container>
                <Image
                source={{ uri: this.props.image}} />
                <LinearGradient
                  colors={[ "rgba(0, 0, 0, 0.2)", "rgba(0, 0, 0, 3)" ]}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "30%",
                    top: 85
                  }}
                 />
                 <TextContainer>
                  <Ionicons name="logo-google-playstore" color="white" size={16} />
                  <Text>Some Text</Text>
                 </TextContainer>
                
            </Container>
        )
    }
}


const Container = styled.View`
  width: 200px;
  height: 120px;
  background: white;
  border-radius: 4px;  
  overflow: hidden;
  margin-left: 5px;
  margin-right: 3px; 

`;

const Image = styled.Image`
  width: 100%;
  height: 100%; 

`;

const Text = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: white;
  left: 10px;


`;

const TextContainer = styled.View`
  position: absolute;
  top: 90px;
  left: 10px;
  flex-direction: row;
  align-items: center;

  
`;