import styled from "styled-components";
import { Draggable, Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import { useForm } from "react-hook-form";
import { IToDo, toDoState } from "../atoms";
import { useRecoilState } from "recoil";
import EditBoardTitle from "./EditBoardTitle";
import DeleteBoard from "./DeleteBoard";

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

const Area = styled.div`
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: all .3s ease-in-out;
`;

const Input = styled.input`
  width: 90%;
  padding: 6px 10px;
  margin-bottom: 20px;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  margin-top: 10px;

  &:focus {
    outline: none;
  }
`;


const ClearButton = styled(({ ...props }) => <button {...props}></button>)`
  border: none;
  padding: 5px 10px;
  font-size: 15px;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: color .3s ease-in-out;
  transition: background-color .3s ease-in-out;
  background-color: ${props => props.theme.cardColor};

  &:hover {
    background-color: blue;
    color: ${props => props.theme.textColor};
  }
`;

const ManageBoard = styled.div`
  display: flex;
`;

interface IWrapperProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
  index: number;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId, index }: IBoardProps) {
  const [toDo, setToDo] = useRecoilState(toDoState);
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

  const onClearButtonClick = () => {
    setToDo((prev) => {
      return {
        ...prev,
        [boardId]: [],
      };
    });
  };

  return (
    <Draggable draggableId={"board-id-" + boardId} index={index}>
      {(magic, _) => (
        <div ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}>
          <Droppable droppableId={boardId}>
            {(magic, info) => (
              <Wrapper
                isDraggingOver={info.isDraggingOver}
                isDraggingFromThis={Boolean(info.draggingFromThisWith)}
              >
                <EditBoardTitle boardId={boardId} />

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

                  <ManageBoard>
                    {toDo[boardId].length === 0 ? null : (
                      <ClearButton onClick={onClearButtonClick}>Clear</ClearButton>
                    )}
                    <DeleteBoard boardId={boardId} />
                  </ManageBoard>
                </Area>
              </Wrapper>
            )}
          </Droppable>
        </div>
      )}

    </Draggable>
  );
}

export default Board;
