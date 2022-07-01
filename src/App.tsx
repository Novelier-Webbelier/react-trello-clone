import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { toDoState } from "./atoms";
import styled from "styled-components";
import Board from "./Components/Board";
import CreateBoards from "./Components/CreateBoard";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: flex-start;
  align-items: center;
`;

const Boards = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    console.log(info);

    if (!destination) return;

    if (destination.droppableId === "boards") {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];

        return allBoards;
      });
      return;
    }

    if (destination.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, taskObj);

        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }

    if (destination.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];

        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, taskObj);

        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Droppable droppableId="boards">
            {(magic, _) => (
              <div ref={magic.innerRef} {...magic.droppableProps}>
                <Boards>
                  {Object.keys(toDos).map((boardId, index) => (
                    <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} index={index} />
                  ))}
                  <CreateBoards />
                </Boards>
              </div>
            )}
          </Droppable>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
