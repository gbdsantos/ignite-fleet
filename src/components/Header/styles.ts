import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({theme}) =>  theme.COLORS.GRAY_700};
  flex-direction: row;
  justify-content: space-between;
  padding: 0 32px 24px;
  width: 100%;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.COLORS.GRAY_100};
  font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
  font-size: ${({theme}) => theme.FONT_SIZE.XL}px;
`;
