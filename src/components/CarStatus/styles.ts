import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.COLORS.GRAY_700};
  border-radius: 6px;
  margin: 32px 0;
  padding: 22px;
  width: 100%;

  flex-direction: row;
  align-items: center;
`;

export const IconBox = styled.View`
  background-color: ${({theme}) => theme.COLORS.GRAY_600};
  border-radius: 6px;
  margin-right: 12px;
  height: 77px;
  width: 77px;

  align-items: center;
  justify-content: center;
`;

export const Message = styled.Text`
  flex: 1;
  text-align: justify;
  textAlignVertical: center;

  color: ${({theme}) => theme.COLORS.GRAY_100};
  font-size: ${({theme}) => theme.FONT_SIZE.SM}px;
  font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
`;

export const TextHighlight = styled.Text`
  color: ${({theme}) => theme.COLORS.BRAND_LIGHT};
  font-size: ${({theme}) => theme.FONT_SIZE.SM}px;
  font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
`;
