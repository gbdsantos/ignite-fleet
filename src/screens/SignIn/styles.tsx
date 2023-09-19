import styled from 'styled-components/native';

export const Container = styled.ImageBackground`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_800};
  justify-content: center;
  padding: 52px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.BRAND_LIGHT};
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.XXXL}px;
  text-align: center;
`;

export const Slogan = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_100};
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  margin-bottom: 32px;
  text-align: center;
`;
