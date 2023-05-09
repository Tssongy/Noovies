import React from "react";
import { View, StyleSheet, useColorScheme } from "react-native";
import styled from "styled-components/native";
import { makeImgPath } from "../utilis";
import { BlurView } from "expo-blur";
// import { BlurView } from "@react-native-community/blur";

const BgImg = styled.Image``;

const Poster = styled.Image`
  width: 100px;
  height: 160px;
`;

const Title = styled.Text<{ isDark: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;

const Overview = styled.Text<{ isDark: boolean }>`
  /* color: rgba(255, 255, 255, 0.6); */
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
  margin-top: 10px;
  font-weight: 600;
`;

const Votes = styled(Overview)`
  font-size: 12px;
`;

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  overview: string;
  voteAverage: number;
}

const Slide: React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  overview,
  voteAverage,
}) => {
  const isDark = useColorScheme() === "light";

  return (
    <View style={{ flex: 1 }}>
      <BgImg
        source={{ uri: makeImgPath(backdropPath) }}
        style={StyleSheet.absoluteFill}
      />
      <BlurView
        style={StyleSheet.absoluteFill}
        tint={isDark ? "dark" : "light"}
        intensity={100}
      >
        <Wrapper>
          <Poster source={{ uri: makeImgPath(posterPath) }} />
          <Column>
            <Title>{originalTitle}</Title>
            <Overview>{overview.slice(0, 90)}...</Overview>
            {voteAverage > 0 ? <Votes>⭐{voteAverage}/10</Votes> : null}
          </Column>
        </Wrapper>
      </BlurView>
    </View>
  );
};

export default Slide;
