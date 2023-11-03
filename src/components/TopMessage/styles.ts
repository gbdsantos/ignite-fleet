import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const dimensions = Dimensions.get('window');

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.COLORS.GRAY_500};
  padding-bottom: 5px;
  position: absolute;
  width: ${dimensions.width}px;
  z-index: 1;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_100};
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme} ) => theme.FONT_SIZE.SM}px;
  margin-left: 4px;
`;
