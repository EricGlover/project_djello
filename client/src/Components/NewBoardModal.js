import React from "react";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import Dialog from "material-ui/Dialog";

class NewBoardModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      boardTitle: ""
    };
  }
  handleOpen = e => {
    this.setState({ open: true });
  };
  handleClose = e => {
    this.setState({ open: false });
    console.log("form = ", this.state.boardTitle);
    this.props.onSubmit(this.state.boardTitle);
  };
  onChange = e => {
    this.setState({ boardTitle: e.target.value });
  };
  render() {
    const actions = [
      <TextField
        name="boardTitle"
        value={this.state.boardTitle}
        onChange={this.onChange}
      />,
      <FlatButton
        label="Create!"
        primary={true}
        keyboardFocused={false}
        onClick={this.handleClose}
      />
    ];
    return (
      <div>
        <div onClick={this.handleOpen}>{this.props.children}</div>
        <Dialog
          title="New Board!"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        />
      </div>
    );
  }
}

export default NewBoardModal;