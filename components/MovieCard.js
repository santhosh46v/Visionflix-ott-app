import React from "react";
import styled from "styled-components";

export default class MovieCard extends React.Component {
    render() {
        return (
            <Container>
                <Image
                source={{ uri: this.props.image}} />
                
                 
            </Container>
        )
    }
}


const Container = styled.View`
  width: 150px;
  height: 210px;
  background: white;
  border-radius: 4px;  
  overflow: hidden;
  margin-left: 5px;
  margin-right: 7px; 
  margin-top: 2px;

`;

const Image = styled.Image`
  width: 100%;
  height: 100%; 

`;

