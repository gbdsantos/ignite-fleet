import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const Info = styled.View`
  flex: 1%;
`;

export const Label = styled.Text`
  color: ${({ theme }) =>  theme.COLORS.GRAY_300};
  font-family: ${({ theme }) =>  theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) =>  theme.FONT_SIZE.SM}px;
`;

export const Description = styled.Text`
  color: ${({ theme }) =>  theme.COLORS.GRAY_100};
  font-family: ${({ theme }) =>  theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) =>  theme.FONT_SIZE.SM}px;
`;
