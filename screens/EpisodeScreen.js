import React from "react";
import { Text, Image, ScrollView, TouchableOpacity, Dimensions, View } from "react-native";
import styled from "styled-components/native";
import MedCard from '../components/MedCard';
import Carousel from "react-native-snap-carousel";

const screenWidth = Dimensions.get("window").width;


class EpisodeScreen extends React.Component {

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
    const { route: { params: { data, datas: MedCardData, movieData: MovieCardData } }, navigation } = this.props;

    return (
      <Container>
        <ScrollView>
        <CoverImage>
          <StyledImage source={{ uri: data.episodeImage }}  />
        </CoverImage>
        
        <Text style={{ 
          color: "black", fontSize: 20, marginTop: 15, marginLeft: 10, fontWeight: 600 }}>
            {data.title}
            </Text>

            <ContinueText>Latest Episodes</ContinueText>

            <MedCardContainer>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {MedCardData.map((data, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigation.push("VideoTab", {
                        video: data,
                        datas: MedCardData,
                        movieData: MovieCardData
                      });
                    }}>
                    <MedCard image={data.image} /> 
                  </TouchableOpacity>
                ))}
                </ScrollView>
                </MedCardContainer>

                <LikeText> You May Also Like</LikeText>

                <Carousel
          ref={c => this.Carousel = c}
          data={MedCardData}
          renderItem= {this._renderItem} 
          sliderWidth={screenWidth}
          itemWidth={screenWidth - 30}
          inactiveSlideScale={0.9}
          inactiveSlideOpacity={1}
          pagingEnabled={true}
          useScrollView={true}
          activeSlideAlignment={"center"}
          loop={true}
          autoplay={true}
          autoplayDelay={1500}
          autoplayInterval={3000}
          contentContainerCustomStyle={{
            paddingLeft: 21, 
            paddingRight: 15,
            marginTop: 15,
            height: 210
          }}

          layout={"stack"}
          layoutCardOffset={9}
  
        />

        </ScrollView>
      </Container>
    );
  }
}

export default EpisodeScreen;


const Container = styled.View`
  flex: 1;
  
`;

const CoverImage = styled.View`
  width: ${Dimensions.get("window").width - 20}px;
  height: 229px;
  margin-left: 10px;
  margin-top: 13px;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const LikeText = styled.Text`
  margin-top: 20px;
  margin-left: 10px;
  color: grey;
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
`;

const ContinueText = styled.Text`
  margin-top: 20px;
  margin-left: 10px;
  color: grey;
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
`;

const MedCardContainer = styled.View`
  margin-top: 15px;
  margin-left: 5px;
`;
