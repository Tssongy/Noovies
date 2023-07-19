import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  useColorScheme,
  ScrollView,
  RefreshControl,
} from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import Slide from "../components/Slides";
import Poster from "../components/Poster";

const API_KEY = "93fdc83520ff05f10a543a6c2d6a3bbc";

// "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&region=AU"

const Container = styled.ScrollView``;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ListTitle = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-left: 30px;
`;

const TrendingScroll = styled.ScrollView`
  margin-top: 20px;
`;

const Movie = styled.View`
  margin-right: 20px;
  align-items: center;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const Votes = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const HMovie = styled.View`
  padding: 0px 30px;
  margin-bottom: 30px;
  flex-direction: row;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const Overview = styled.Text`
  color: white;
  opacity: 0.8;
  width: 80%;
`;

const Release = styled.Text`
  color: white;
  font-size: 12px;
  margin-vertical: 10px;
`;
const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);

  const getTrending = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&region=AU`
      )
    ).json();
    setTrending(results);
  };
  const getUpcoming = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&region=AU&api_key=${API_KEY}`
      )
    ).json();
    setUpcoming(results);
  };
  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&region=AU&api_key=${API_KEY}`
      )
    ).json();
    setNowPlaying(results);
    setLoading(false);
  };

  const getData = async () => {
    await Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Swiper
        loop
        controlsEnabled={false}
        containerStyle={{
          width: "100%",
          height: SCREEN_HEIGHT / 4,
          marginBottom: 30,
        }}
        timeout={2}
      >
        {nowPlaying.map((movie) => (
          <Slide
            key={movie.id}
            backdropPath={movie.backdrop_path}
            posterPath={movie.poster_path}
            originalTitle={movie.original_title}
            overview={movie.overview}
            voteAverage={movie.vote_average}
          />
        ))}
      </Swiper>
      <ListContainer>
        <ListTitle>Trending Movies</ListTitle>
        <TrendingScroll
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 30 }}
        >
          {trending.map((movie) => (
            <Movie key={movie.id}>
              <Poster path={movie.poster_path} />
              <Title>
                {movie.original_title.slice(0, 13)}
                {movie.original_title.length > 13 ? "..." : null}
              </Title>
              <Votes>
                {movie.vote_average > 0
                  ? `⭐${movie.vote_average}/10`
                  : "Coming soon"}
              </Votes>
            </Movie>
          ))}
        </TrendingScroll>
      </ListContainer>
      <ComingSoonTitle>Coming soon</ComingSoonTitle>
      {upcoming.map((movie) => (
        <HMovie key={movie.id}>
          <Poster path={movie.poster_path} />
          <HColumn>
            <Title>{movie.original_title}</Title>
            <Release>
              {new Date(movie.release_date).toLocaleDateString("ko")}
            </Release>
            <Overview>
              {movie.overview !== "" && movie.overview.length > 13
                ? `${movie.overview.slice(0, 140)}...`
                : movie.overview}
            </Overview>
          </HColumn>
        </HMovie>
      ))}
    </Container>
  );
};

export default Movies;
