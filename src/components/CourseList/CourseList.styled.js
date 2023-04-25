import styled from "styled-components";

export const StyledList = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(5)};
  padding-top: ${({ theme }) => theme.spacing(5)};

  @media screen and (min-width: 768px) {
    padding-top: ${({ theme }) => theme.spacing(10)};
  }
`;
