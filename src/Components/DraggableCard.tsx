import React, { useRef } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";
import { Error } from "./Errors";

const Card = styled.div<ICardProps>`
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 10px;
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

interface ICardProps {
  isDragging: boolean;
}

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
  boardId: string;
}

function DraggableCard({
  toDoId,
  index,
  toDoText,
  boardId,
}: IDraggableCardProps) {
  const setToDos = useSetRecoilState(toDoState);

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

  return (
    <Draggable draggableId={toDoId + ""} index={index} key={index}>
      {(magic, info) => (
        <Card
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
          isDragging={info.isDragging}
        >
          <span>{toDoText}</span>
          <DeleteButton onClick={onButtonClick}>
            <span>Delete</span>
          </DeleteButton>
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
