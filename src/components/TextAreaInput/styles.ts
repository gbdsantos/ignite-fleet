import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({theme}) => theme.COLORS.GRAY_700 };
  border-radius: 6px;
  padding: 16px;
  height: 150px;
  width: 100%;
`;

export const Label = styled.Text`
  color: ${({theme}) => theme.COLORS.GRAY_300};
  font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({theme}) => theme.FONT_SIZE.SM}px;
`;

export const Input = styled.TextInput`
  color: ${({theme}) => theme.COLORS.GRAY_200};
  font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
  margin-top: 16px;
  vertical-align: top;
`;
