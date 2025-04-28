import React from "react";
import styled from "styled-components";
import Carousel from "react-native-snap-carousel";
import { View, Image, Dimensions, Text, TouchableOpacity  } from "react-native";
import { database, ref, onValue } from "../FirbaseConfig";


const Width = Dimensions.get("window").width;


class MovieScreen extends React.Component {

  state = {
    MovieCardData: [],
    MedCardData: []
  }

  componentDidMount() {  
    const dbRefMovieCard = ref(database, 'MovieCardData'); 
    this.getMovieCardData(dbRefMovieCard); 

    const dbRefMedCard = ref(database, 'MedCardData'); 
    this.getMedCardData(dbRefMedCard);
  }

  getMedCardData = (dbRefMedCard) => {
    onValue(dbRefMedCard, (snapshot) => {
      let items = [];
      snapshot.forEach(child => {
        items.push({
          title: child.val().title,
          image: child.val().image,
          video: child.val().video
        });
      });
      this.setState({
        MedCardData: items
      });
      console.log("MedCardData:", items); 
    });
  }
  
  getMovieCardData = (dbRefMovieCard) => {
    onValue(dbRefMovieCard, (snapshot) => {
      let items = [];
      snapshot.forEach(child => {
        items.push({
          image: child.val().image,
          episodeImage: child.val().episodeImage,
          title: child.val().title
          
        });
      });
      
      this.setState({
        MovieCardData: items
      });
      console.log("MovieCardData:", items); 
    });
  }
    

  _renderItem = ({ item, index }) => {
    const { navigation } = this.props;
    return (
      <TouchableOpacity key={index}
       onPress={() => {
        navigation.push("EpisodeTab", {
          data: item,
          datas: this.state.MedCardData,
          movieData: this.state.MovieCardData                     
        });
      }}
        >
      <View style= {{borderRadius: 10, overflow: "hidden" }}>
        <Image 
        source={{ uri: item.image }} 
        style={{ width: "100%", height: 400 }}/>
      </View>
      </TouchableOpacity>

    );
  }

  render() { 
    
    return (
      <Container>
        <Circle1 />
        <Circle2 />
        <Circle3 />
        <Latest>
          <Text style={{ 
            fontSize: 25,
            fontWeight: 500
            
            
          }}>Latest</Text>
        </Latest>

        <SlideContainer>

        <Carousel
        ref={c => this.Carousel = c}
        data={this.state.MovieCardData}
        renderItem= {this._renderItem}  
        sliderWidth={Width}
        itemWidth={240}
        inactiveSlideScale={0.84}
        inactiveSlideOpacity={1}
        inactiveSlideShift={30}
        pagingEnabled={true}
        useScrollView={true}
        activeSlideAlignment={"center"}
        loop={true}
        autoplay={true}
        autoplayDelay={3700}
        autoplayInterval={3000}
        contentContainerCustomStyle={{
        
          height: 900
        }}

        />
        
        </SlideContainer>
        
      </Container>
    );
  } 
}

export default MovieScreen;
  

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: lavender;
`;

const SlideContainer = styled.View`
  margin-top: 500px;
  width: ${Dimensions.get('window').width}px;
  height: 900px;

`;

const Circle1 = styled.View`

position: absolute;
width: 682px;
height: 750px;
left: -135px;
top: -119px;
background: #F4F6FA;
border-radius: 341px;

`;

const Circle2 = styled.View`

position: absolute;
width: 606px;
height: 606px;
left: -18px;
top: -221px;
background: lavender;
border-radius: 341px;

`;

const Circle3 = styled.View`
  position: absolute;
  width: 323px;
  height: 323px;
  left: 206px;
  top: -119px;
  background: #F4F6FA;
  border-radius: 161.5px;
`;

const Latest = styled.View`

position: absolute;
width: 130px;
height: 42px;
//left: 131px;
top: 30px;
border-radius: 8px;
background: #ffffff;
align-items: center;
justify-content: center;
`;


const MovieCardData = [
  { image: "https://i.pinimg.com/564x/0e/bc/28/0ebc2837f7e75e480f3031bcf166e160.jpg",
    title: "Big Buck Bunny  Episode 1 "
   },
  { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfidxOtyFbeTdH1V8asJnklWuDjMeQD2tRnFIWvOM8jlfspBi_9ctbn7-R4vLQ6mAbsJ0&usqp=CAU",
    title: "2"
   },
  { image: "https://img.studioflicks.com/wp-content/uploads/2023/05/14124825/Good-Night-Movie-HQ-Posters-7.jpg",
    title: "3"
   },
  { image: "https://anandkumarrsonfilms.com/wp-content/uploads/2022/09/sita-ramam-telugu-movie-poster-2.jpg",
    title: "4"
   },
  { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjIdpQn8kzHHVuPXSothOQSUeHylgTIcYbVg&s",
    title: "5"
   },
  { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8lbzN8xgIjH1oUigFgb73hkpsu6xtnnKoeQ&s",
    title: "6"
   }
]; 