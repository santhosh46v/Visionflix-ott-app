import React from "react";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";

const MenuCard = props => (
    <Container>
        <IconView>
            <Ionicons
              name={props.icon}
              size={25}
              color="#546bfb"
              />
        </IconView>
        <Content>
            <MenuButton>{props.text}</MenuButton>
            <MenuText>{props.caption}</MenuText>
        </Content>
    </Container>
)

export default MenuCard;

const Container = styled.View`
  flex-direction: row;
  margin: 15px 0;
  top: 20px;
`;

const IconView = styled.View`
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
  top: 4px;
`;

const Content = styled.View`
  padding-left: 10px;
`;

const MenuButton = styled.Text`
  font-size: 21px;
  font-weight: 600;
  color: #3c4560;
`;

const MenuText = styled.Text`
  font-size: 12px;
  color: #3c4560;
  margin-top: 5px;
  opacity: 0.6;
`;