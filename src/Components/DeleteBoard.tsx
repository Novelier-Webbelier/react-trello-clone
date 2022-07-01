import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

const DeleteBoardButton = styled(({ ...props }) => <button {...props}></button>)`
  border: none;
  padding: 5px 10px;
  font-size: 15px;
  border-radius: 5px;
  margin-bottom: 10px;
  margin-left: 10px;
  cursor: pointer;
  transition: color .3s ease-in-out;
  transition: background-color .3s ease-in-out;
  background-color: ${props => props.theme.cardColor};

  &:hover {
      background-color: red;
      color: ${props => props.theme.textColor};
    }
`;

interface IDeleteBoardProps {
  boardId: string;
}

function DeleteBoard({ boardId }: IDeleteBoardProps) {
  const setToDos = useSetRecoilState(toDoState);

  const onDeleteButtonClick = () => {
    setToDos((prev) => {
      const copy = { ...prev };

      delete copy[boardId];
      return copy;
    });
  };

  return (
    <>
      <DeleteBoardButton onClick={onDeleteButtonClick}>Delete</DeleteBoardButton>
    </>
  );
};

export default DeleteBoard;
