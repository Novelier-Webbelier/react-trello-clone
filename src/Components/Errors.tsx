import styled from "styled-components";

export const Error = styled.p`
  color: red;
  font-weight: 500;
  font-size: 16px;
  text-align: center;
`;

interface IErrorsProps {
  message?: string;
}

export function Errors({ message }: IErrorsProps) {
  return <Error>{message}</Error>;
}
