import { StatusBar, ScrollView, TouchableOpacity, Animated, Dimensions } from 'react-native';
import React from 'react';
import styled from 'styled-components';
import BigCard from '../components/BigCard';
import MedCard from '../components/MedCard';
import { Ionicons } from "@expo/vector-icons";
import Menu from "../components/Menu";
import { connect } from "react-redux";
import MovieCard from '../components/MovieCard';
import { database, ref, onValue } from '../FirbaseConfig';
import Login from '../components/Login';

const screenHeight = Dimensions.get("window").height;

function mapStateToprops(state) {
  return { menu: state.menu, log: state.log };
}

function mapDispatchToProps(dispatch) {
  return {
    openMenu: () => dispatch({
      type: "OPENMENU"
    }),
    openLogin: () => dispatch({
      type: "OPENLOGIN"
    })
  };
}

class HomeScreen extends React.Component {
  state = {
    left: 10,
    top: new Animated.Value(screenHeight),
    opacity: new Animated.Value(0),
    MedCardData: [],
    BigCardData: [],
    MovieCardData: []
  };

  componentDidMount() {
    const dbRefBigCard = ref(database, 'BigCardData'); 
    this.getBigCardData(dbRefBigCard); 
  
    const dbRefMedCard = ref(database, 'MedCardData'); 
    this.getMedCardData(dbRefMedCard);
    
    const dbRefMovieCard = ref(database, 'MovieCardData'); 
    this.getMovieCardData(dbRefMovieCard);
  }
  
  getBigCardData = (dbRefBigCard) => {
    onValue(dbRefBigCard, (snapshot) => {
      let items = [];
      snapshot.forEach(child => {
        items.push({
          title: child.val().title,
          image: child.val().image
        });
      });
      this.setState({
        BigCardData: items
      });
    //  console.log("BigCardData:", items); 
    });
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
    //  console.log("MedCardData:", items); 
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
   //   console.log("MovieCardData:", items); 
    });
  }
  

  
  componentDidUpdate() {
    this.blackscreen();
  }

  blackscreen() {
    if (this.props.menu == "openMenu") {
      Animated.timing(this.state.top, { toValue: 0, duration: 10, useNativeDriver: false }).start();
      Animated.timing(this.state.opacity, { toValue: 0.6, duration: 500, useNativeDriver: false }).start();
    }

    if (this.props.menu == "closeMenu") {
      Animated.timing(this.state.top, { toValue: screenHeight, duration: 10, useNativeDriver: false }).start();
      Animated.spring(this.state.opacity, { toValue: 0, useNativeDriver: false }).start();
    }
  }

  handleLogin =()  => {
    if (this.props.log) {
      this.props.openMenu();
    } else {
      this.props.openLogin();
    }
  }

  render() {
    
    const { navigation } = this.props;

    return (
      <Root>
        <Main>
          <ScrollView showsVerticalScrollIndicator={false}>
            <StatusBar hidden />
            <Header>
              <TouchableOpacity
                onPress={this.handleLogin}
                style={{
                  position: "absolute",
                  top: 12,
                  left: 10,
                  zIndex: 100
                }}>
                <Ionicons name="menu" size={30} color="grey" />
              </TouchableOpacity>
              <Logo />
              <Profile />
            </Header>

            <BigCardContainer>
            <BigCard data={this.state.BigCardData} />
            </BigCardContainer>

            <Text>Continue Watching</Text>
            <MedCardContainer>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {this.state.MedCardData.map((data, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigation.push("VideoTab", {
                        video: data,
                        datas: this.state.MedCardData,
                        movieData: this.state.MovieCardData
                      });
                    }}>
                    <MedCard image={data.image} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </MedCardContainer>

            <LikeText>Top Picks For You</LikeText>

            <MovieCardContainer>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {this.state.MovieCardData.map((data, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigation.push("EpisodeTab", {
                        data: data,
                        datas: this.state.MedCardData,
                        movieData: this.state.MovieCardData                     
                      });
                    }}>
                    <MovieCard image = {data.image} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </MovieCardContainer>
          </ScrollView>
        </Main>

        <AnimatedBlack style={{
          top: this.state.top, opacity: this.state.opacity
        }} />
        <Menu />
        <Login />
      </Root>
    );
  }
}

export default connect(mapStateToprops, mapDispatchToProps)(HomeScreen);

const Root = styled.View`
  flex: 1;
`;

const Main = styled.View`
  flex: 1;
  background-color: #eaeaea;
`;

const Black = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.6;
`;

const AnimatedBlack = Animated.createAnimatedComponent(Black);

const Header = styled.View`
  width: 100%;
  height: 56px;
  background-color: white;
`;

const Logo = styled.Text`
  margin-top: 20px;
  margin-left: 60px;
  width: 90px;
  height: 15px;
  background: lightgrey;
  border-radius: 10px;
`;

const Profile = styled.Image`
  position: absolute;
  right: 10px;
  width: 40px;
  height: 40px;
  background: #C4C4C4;
  border-radius: 22px;
  top: 8px;
`;

const BigCardContainer = styled.View`
  margin-top: 20px;
`;

const Text = styled.Text`
  margin-top: 20px;
  margin-left: 10px;
  color: grey;
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
`;

const LikeText = styled.Text`
  margin-top: 21px;
  margin-left: 10px;
  color: grey;
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
`;

const MedCardContainer = styled.View`
  margin-top: 20px;
  margin-left: 5px;
`;

const MovieCardContainer = styled.View`
  margin-top: 20px;
  margin-left: 5px;
`;

const BigCardData = [
  { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToGYZ9QWQKr4wV1Y3ZAcfJ1uGgZ00sF731jw&s" },
  { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4rFmLgykDcDvzrdSCk76j1uhVz3N4XzqmTQ&s" },
  { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF-h_h3PvCoPrhSrtUxH7B5IkUHbs0XvM3aw&s" },
  { image: "https://i.pinimg.com/originals/31/ca/f2/31caf2fa888d01cd7658ed5d41a5798a.jpg" }
];


const MedCardData = [
  { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJhZzcb5_nSNoO7E_9YgQccG5E0l_ETz2fKw&s",
    title: "Big Buck Bunny  Episode 1 "
   },
  { image: "https://cdn.prod.website-files.com/6166abb5949e082a17377853/6166abb5949e08b35e377a5e_bigg-boss-tamil-header.png",
    title: "2"
   },
  { image: "https://img1.hotstarext.com/image/upload/f_auto,t_hcdl/sources/r1/cms/prod/962/750962-h",
    title: "3"
   },
  { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfdf5Rn5VWaqaq0wqkMC7CYwsD_TVM43KmxQ&s",
    title: "4"
   },
  { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYqGww6QOcVz0dAH_--laEkuJoNAKk6VgzHdnHVrNGkKSj3BXSReZ6eXxBZ4956OFN9NY&usqp=CAU",
    title: "5"
   },
  { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7M7NL65vVBRUGLQv4_SOw6MgOx4SqLFDsJw&s8i",
    title: "6"
  }
];

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

