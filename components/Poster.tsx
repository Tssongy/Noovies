import React from "react";
import styled from "styled-components/native";
import { makeImgPath } from "../utilis";

const Image = styled.Image`
  width: 100px;
  height: 160px;
`;

interface PosterProps {
  path: string;
}

const Poster: React.FC<PosterProps> = ({ path }) => (
  <Image source={{ uri: makeImgPath(path) }} />
);

export default Poster;
