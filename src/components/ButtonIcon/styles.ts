import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
  border-radius: 6px;
  height: 56px;
  width: 56px;
`;
