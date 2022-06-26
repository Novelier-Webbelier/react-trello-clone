import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<ICardProps>`
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
  toDo: string;
  index: number;
}

function DraggableCard({ toDo, index }: IDraggableCardProps) {
  return (
    <Draggable draggableId={toDo} index={index} key={index}>
      {(magic, info) => (
        <Card
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
          isDragging={info.isDragging}
        >
          <span>{toDo}</span>
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
