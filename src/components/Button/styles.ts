import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.COLORS.BRAND_MID};
  border-radius: 6px;
  max-height: 56px;
  min-height: 56px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
`;

export const Loading = styled.ActivityIndicator
  .attrs(({ theme }) => ({
    color: theme.COLORS.WHITE
  }))``;
