import styled from "styled-components";

const Error = styled.p`
  color: red;
  font-weight: 900;
  font-size: 16px;
  text-align: center;
`;

interface IErrorsProps {
  message?: string;
}

function Errors({ message }: IErrorsProps) {
  return <Error>{message}</Error>;
}

export default Errors;
