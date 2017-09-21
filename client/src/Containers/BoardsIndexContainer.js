import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FloatingActionButton } from "material-ui";

import { createBoard, getAllBoards, deleteBoard } from "../actions/board";
import NewBoardModal from "../Components/NewBoardModal";
import Showable from "../Components/elements/Showable";
import Paper from "material-ui/Paper";

export const makeBoardShow = id => `/boards/${id}`;
const loadingScreen = <div>Loading...</div>;

const cardWrapper = {
  display: "flex",
  "flex-direction": "row",
  "flex-wrap": "wrap",
  "text-align": "center",
  "align-items": "center",
  "justify-content": "space-evenly",
  height: "100vh"
};
// p {
//   height: 30px;
//   background-color: black;
//   width: auto;
//   color: white;
// }
// .box {
//   width: 100px;
//   height: 100px;
//   margin: 20px;
//   padding: 20px;
//   box-sizing: border-box;
// /*   align-self:center; */
// }
// .red {
//   background-color: red;
// }

class BoardsIndexContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = async () => {
    //TODO: grab the user
    console.log("mounting board");
    const user = {
      username: "a",
      password: "a"
    };
    let data = await this.props.getAllBoards(user);
  };
  onCreateBoard = async (name = "newBoard YOOOO") => {
    console.log("createBoard called");
    this.props.createBoard(name);
    //TODO: CHANGE THIS REFRESH BOARDS THING LATER
    this.props.getAllBoards({ username: "a", password: "a" });
  };
  //TODO: change this madness later
  onDeleteBoard = async (e, id) => {
    //TODO: experiment with doing this with hrefs
    e.preventDefault();
    this.props.deleteBoard(id, "a");
    //TODO: CHANGE THIS REFRESH BOARDS THING LATER
    this.props.getAllBoards({ username: "a", password: "a" });
    // this.props.getAllBoards({ username: "a", password: "a" });
    console.log(`deleting board ${id}`);
  };

  render() {
    console.log("board props = ", this.props);

    let boards;
    if (this.props.boards) {
      boards = this.props.boards.map(board => {
        const url = makeBoardShow(board._id);
        return (
          <Paper zIndex={1} key={board._id}>
            <Link to={url}>
              <h1>{board.title}</h1>
            </Link>
            <FloatingActionButton
              href={`${board._id}`} ///????????
              mini={true}
              onClick={e => {
                this.onDeleteBoard(e, board._id);
              }}
            >
              <i className="material-icons">delete</i>
            </FloatingActionButton>
          </Paper>
        );
      });
    }
    const newBoardButton = (
      <NewBoardModal onSubmit={this.onCreateBoard}>
        <FloatingActionButton>
          <i className="material-icons">add</i>
        </FloatingActionButton>
      </NewBoardModal>
    );

    return (
      <div>
        <Showable
          isFetching={this.props.isFetching}
          loadingScreen={loadingScreen}
        >
          <h1>Nav Bar for a Board</h1>
          <p>Boards Index Page </p>
          <div style={cardWrapper}>
            {boards}
            {newBoardButton}
          </div>
        </Showable>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("state of boardssss, = ", state);
  return {
    ...state.board
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createBoard: name => {
      dispatch(createBoard(name));
    },
    getAllBoards: user => {
      dispatch(getAllBoards(user));
    },
    deleteBoard: (boardId, userID) => {
      dispatch(deleteBoard(boardId, userID));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  BoardsIndexContainer
);
