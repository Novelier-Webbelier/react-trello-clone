import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";
import Errors from "./Errors";

const Wrapper = styled.div`
  width: 15rem;
  padding: 10px;
  border-radius: 5px;
  background-color: ${props => props.theme.boardColor};
`;

const Form = styled.form`
`;

const Input = styled.input`
  width: 90%;
  padding: 6px 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;

  &:focus {
    outline: none;
  }
`;

interface IForm {
  title: string;
}

function CreateBoards() {
  const setBoard = useSetRecoilState(toDoState);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>();

  const onValid = ({ title }: IForm) => {
    setBoard((prev) => {
      return {
        ...prev,
        [title]: [],
      };
    });

    setValue("title", "");
  };

  return (
    <>
      <Wrapper>
        <Form onSubmit={handleSubmit(onValid)}>
          <Input
            {...register("title", {
              required: {
                value: true,
                message: "Title is required",
              },
              maxLength: {
                value: 15,
                message: "Title is too long",
              },
            })} placeholder={"Create a new board!"}
          />
          <Errors message={errors.title?.message} />
        </Form>
      </Wrapper>
    </>
  );
}

export default CreateBoards;
