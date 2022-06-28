import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import Errors from "./Errors";

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

interface ICardProps {
  isDragging: boolean;
}

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

function DraggableCard({ toDoId, index, toDoText }: IDraggableCardProps) {
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
          <Errors message="Delete" />
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
