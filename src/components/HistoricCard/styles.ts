import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  border-radius: 6px;
  margin-bottom: 12px;
  padding: 20px 16px;
  width: 100%;
`;

export const Info = styled.View`
  flex: 1;
`;

export const LicensePlate = styled.Text`
  color: ${({theme}) => theme.COLORS.WHITE};
  font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
  font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
`;

export const Departure = styled.Text`
  color: ${({theme}) => theme.COLORS.GRAY_200};
  font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({theme}) => theme.FONT_SIZE.XS}px;
  margin-top: 4px;
`;

