import React from 'react';
import styled from 'styled-components';
import { View, Image, Dimensions } from 'react-native';
import Carousel from "react-native-snap-carousel";

const screenWidth = Dimensions.get("window").width;

export default class BigCard extends React.Component {

  _renderItem = ({item, index}) => {
    
    return(
      <View key={index} style= {{borderRadius: 10, overflow: "hidden" }}>
        <Image source={{
          uri: item.image
        }}
        style={{
          width: "100%", height: 210
        }}
        />

      </View>
    );
  };

    render() {
        return <Container>
          <Carousel
          ref={c => this.Carousel = c}
          data={this.props.data}
          renderItem= {this._renderItem}
          sliderWidth={screenWidth}
          itemWidth={screenWidth - 20}
          inactiveSlideScale={0.9}
          inactiveSlideOpacity={1}
          pagingEnabled={true}
          useScrollView={true}
          activeSlideAlignment={"start"}
          loop={true}
          autoplay={true}
          autoplayDelay={1500}
          autoplayInterval={3000}
          contentContainerCustomStyle={{
            marginLeft: 10,
            height: 210
          }}
          />
          </Container>;
    }
}

const Container = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: 210px;
`;