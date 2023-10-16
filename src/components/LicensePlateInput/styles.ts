import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 16px;
  width: 100%;
  border-radius: 6px;
  background-color: ${({theme}) => theme.COLORS.GRAY_700};
`;

export const Label = styled.Text`
  color: ${({theme}) => theme.COLORS.GRAY_300};
  font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({theme}) => theme.FONT_SIZE.SM}px;
`;

export const Input = styled.TextInput`
  color: ${({theme}) => theme.COLORS.GRAY_200};
  font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
  font-size: ${({theme}) => theme.FONT_SIZE.XXXL}px;

  margin-top: 16px;
  text-align: center;
`;
