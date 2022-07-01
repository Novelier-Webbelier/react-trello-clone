import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";
import ErrorMessage from "./Errors";

const Wrapper = styled.div`
  width: 15rem;
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.boardColor};
`;

const Form = styled.form``;

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
  const [toDos, setToDo] = useRecoilState(toDoState);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm<IForm>();

  const onValid = ({ title }: IForm) => {
    setToDo((prev) => {
      const exist = [];

      for (const k in toDos) {
        exist.push(k);
      };

      exist.map((item) => {
        if (item === title) {
          setError("title", { message: `The title ${title} is already taken` });
        }
      });

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
            })}
            placeholder={"Create a new board!"}
          />
          <ErrorMessage message={errors.title?.message} />
        </Form>
      </Wrapper>
    </>
  );
}

export default CreateBoards;
