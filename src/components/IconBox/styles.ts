import styled, { css } from 'styled-components/native';

export type SizeProps = 'SMALL' | 'NORMAL';

type Props = {
  size: SizeProps;
}

const variantSizeStyles = (size: SizeProps) => {
  return {
    NORMAL: css`
      height: 46px;
      width: 46px;
    `,
    SMALL: css`
      height: 32px;
      width: 32px;
    `
  }[size];
}

export const Container = styled.View<Props>`
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) =>  theme.COLORS.GRAY_700};
  border-radius: 6px;
  margin-right: 12px;
  ${({ size }) => variantSizeStyles(size)};
`;
