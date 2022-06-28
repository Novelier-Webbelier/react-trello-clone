import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import { useForm } from "react-hook-form";
import { IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div<IWrapperProps>`
  width: 15rem;
  height: 100%;
  padding-top: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  transition: background-color 0.3s ease-in-out;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
        ? "#b2bec3"
        : props.theme.boardColor};
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 900;
  margin-bottom: 14px;
  font-size: 23px;
`;

const Area = styled.div`
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  width: 90%;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  width: 90%;
  padding: 6px 10px;
  margin-bottom: 20px;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;

  &:focus {
    outline: none;
  }
`;

interface IWrapperProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const setToDo = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();

  const onValid = ({ toDo }: IForm) => {
    const newToDo: IToDo = {
      id: Date.now(),
      text: toDo,
    };

    setToDo((prev) => {
      return {
        ...prev,
        [boardId]: [newToDo, ...prev[boardId]],
      };
    });
    setValue("toDo", "");
  };

  return (
    <Droppable droppableId={boardId}>
      {(magic, info) => (
        <Wrapper
          isDraggingOver={info.isDraggingOver}
          isDraggingFromThis={Boolean(info.draggingFromThisWith)}
        >
          <Title>{boardId}</Title>
          <Form onSubmit={handleSubmit(onValid)}>
            <Input
              {...register("toDo", {
                required: {
                  value: true,
                  message: "To Do is required",
                },
                maxLength: {
                  value: 30,
                  message: "Max length is 30",
                },
              })}
              type="text"
              placeholder={`Add task on ${boardId}`}
            />
          </Form>
          <Area ref={magic.innerRef} {...magic.droppableProps}>
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
                boardId={boardId}
              />
            ))}
            {magic.placeholder}
          </Area>
        </Wrapper>
      )}
    </Droppable>
  );
}

export default Board;
