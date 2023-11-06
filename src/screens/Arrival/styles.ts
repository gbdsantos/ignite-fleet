import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_800};
`;

export const Content = styled.View`
  flex-grow: 1;
  padding: 32px;
`

export const Label = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_300};
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
  margin-bottom: 5px;
  margin-top: 32px;
`;

export const LicensePlate = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_100};
  font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
  font-size: ${({ theme }) => theme.FONT_SIZE.XXXL}px;
`;

export const Description = styled.Text`
  color: ${({ theme }) => theme.COLORS.GRAY_100};
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
  text-align: justify;
`;

export const Footer = styled.View`
  flex-direction: row;
  gap: 16px;
  margin-top: 32px;
  padding: 32px;
  width: 100%;
`;

export const AsyncMessage = styled.Text`
  flex: 1;
  margin: 32;
  text-align: center;

  color: ${({ theme }) => theme.COLORS.GRAY_300};
  font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
  font-size: ${({ theme }) => theme.FONT_SIZE.SM}px;
`;
