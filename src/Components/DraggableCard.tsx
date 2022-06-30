import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";
import { Form } from "./Board";

const Card = styled.div<ICardProps>`
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  padding: 6px;
  margin-bottom: 10px;
  width: 85%;
  box-shadow: ${(props) =>
    props.isDragging ? "2px 2px 10px rgba(0, 0, 0, 0.5)" : "none"};
  background-color: ${(props) =>
    props.isDragging ? "#71b9ff" : props.theme.cardColor};
`;

const DeleteButton = styled(({ ...props }) => <button {...props}></button>)`
  color: red;
  font-weight: 500;
  font-size: 13px;
  text-align: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const Input = styled(({ ...props }) => <input {...props} />)`
  background-color: transparent;
  border: none;
  border-radius: 3px;
  padding: 4px;
  transition: all .3s ease-in-out;

  &:focus {
    outline: none;
    background-color: ${props => props.theme.boardColor};
  }
`;

interface ICardProps {
  isDragging: boolean;
}

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
  boardId: string;
}

interface IForm {
  toDoText: string;
}

function DraggableCard({
  toDoId,
  index,
  toDoText,
  boardId,
}: IDraggableCardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, formState: { errors } } = useForm<IForm>();

  const onButtonClick = () => {
    setToDos((prev) => {
      const returnsValue = [...prev[boardId]];
      returnsValue.splice(index, 1);

      return {
        ...prev,
        [boardId]: [...returnsValue],
      };
    });
  };

  const toDoEditValid = ({ toDoText }: IForm) => {
    setToDos((prev) => {
      const copy = { ...prev };
      return prev;
    });
  };

  return (
    <Draggable draggableId={toDoId + ""} index={index} key={index}>
      {(magic, info) => (
        <Card
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
          isDragging={info.isDragging}
        >

          <Form onSubmit={handleSubmit(toDoEditValid)}>
            <Input {...register("toDoText", {
              required: {
                value: true,
                message: "Content of To Do is required",
              },
              maxLength: {
                value: 20,
                message: "The content of To Do is too long!",
              }
            })} defaultValue={toDoText} />
          </Form>

          <DeleteButton onClick={onButtonClick}>
            <span>Delete</span>
          </DeleteButton>

        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
