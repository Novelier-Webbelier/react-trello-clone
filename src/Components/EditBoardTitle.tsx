import { exit } from "process";
import { useForm } from "react-hook-form";
import { errorSelector, useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";
import { Form } from "./Board";
import ErrorMessage from "./Errors";

const Title = styled.input`
  width: 90%;
  padding: 5px;
  text-align: center;
  font-weight: 900;
  margin-bottom: 14px;
  font-size: 23px;
  background-color: transparent;
  border: none;
  transition: all .2s ease-in-out;

  &::placeholder {
    font-size: 13px;
  };

  &:focus {
    outline: none;
    background-color: ${props => props.theme.cardColor};
  }
`;

interface IEditBoardTitleProps {
  boardId: string;
}

interface IForm {
  boardTitle: string;
}

function EditBoardTitle({ boardId }: IEditBoardTitleProps) {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue, setError, formState: { errors } } = useForm<IForm>();

  const boardTitleValid = ({ boardTitle }: IForm) => {
    setToDos((prev) => {
      const copy = { ...prev };

      for (const k in toDos) {
        if (boardTitle === k) {
          setError("boardTitle", { message: `Title of ${boardTitle} is already taken` });
          return copy;
        }
      };

      copy[boardTitle] = prev[boardId];
      delete copy[boardId];

      return copy;
    });
  };

  setInterval(() => {
    console.log(toDos);
  }, 1000);

  return (
    <Form onSubmit={handleSubmit(boardTitleValid)}>
      <Title {...register("boardTitle", {
        required: {
          value: true,
          message: "Title of the board is required",
        },
        maxLength: {
          value: 15,
          message: "Title is too long!",
        }
      })} placeholder="Rename of the board!" defaultValue={boardId} />
      <ErrorMessage message={errors.boardTitle?.message} />
    </Form>
  );
}

export default EditBoardTitle;
