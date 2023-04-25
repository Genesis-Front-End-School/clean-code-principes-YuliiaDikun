import styled from "styled-components";
export const StyledSkills = styled.p`
  padding-top: ${({ theme }) => theme.spacing(3)};
  padding-bottom: ${({ theme }) => theme.spacing(3)};
  font-size: ${({ theme }) => theme.spacing(5)};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.accent};
`;
