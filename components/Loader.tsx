import { ActivityIndicator } from "react-native";
import React from "react";
import styled from "styled-components/native";

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const Loader = () => (
  <Wrapper>
    <ActivityIndicator />
  </Wrapper>
);

export default Loader;
