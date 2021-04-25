import { Component, createRef } from "react";
import { IconButton, TableCell, TableRow, TextField } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const styles = (theme) => ({
  edit: {
    display: "none",
  },
  warning: {
    boxShadow: "0 0 7px 0px rgba(255,0,0,0.6) inset",
  },
});

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editablePerson: null,
      oldPerson: null,
      warning: false,
    };
    this.editLastNameInput = createRef();
    this.editFirstNameInput = createRef();
    this.editEmailInput = createRef();
  }

  deletePerson(person) {
    if (this.state.editablePerson === person) {
      this.clearEditablePerson();
    }
    this.props.onDeletePerson(person);
  }

  setEditablePerson(editPerson) {
    if (this.state.editablePerson) {
      this.setState({ warning: true });
      return;
    }
    this.setState({ editablePerson: editPerson });
  }

  saveEditablePerson = (e) => {
    e.preventDefault();
    const person = {
      lastName: this.editLastNameInput.current.value,
      firstName: this.editFirstNameInput.current.value,
      email: this.editEmailInput.current.value,
    };
    const people = {
      oldPerson: this.state.editablePerson,
      newPerson: person,
    };
    this.props.onEditPerson(people);
    this.clearEditablePerson();
  };

  clearEditablePerson = () => {
    this.setState({
      editablePerson: null,
      warning: false,
    });
  };

  render() {
    const { list, classes } = this.props;

    return (
      <>
        {list.map((person, index) =>
          person === this.state.editablePerson ? (
            <TableRow
              key={index}
              className={this.state.warning ? classes.warning : ""}
            >
              <TableCell>
                <form
                  onSubmit={this.saveEditablePerson}
                  id="edit_person"
                ></form>
                <TextField
                  label="Введите фамилию"
                  inputProps={{ form: "edit_person" }}
                  inputRef={this.editLastNameInput}
                  defaultValue={person.lastName}
                  required
                />
              </TableCell>
              <TableCell>
                <TextField
                  label="Введите имя"
                  inputProps={{ form: "edit_person" }}
                  inputRef={this.editFirstNameInput}
                  defaultValue={person.firstName}
                  required
                />
              </TableCell>
              <TableCell>
                <TextField
                  label="Введите Email"
                  inputProps={{ form: "edit_person" }}
                  inputRef={this.editEmailInput}
                  defaultValue={person.email}
                  type="email"
                  required
                />
              </TableCell>
              <TableCell align="right">
                <IconButton
                  edge="start"
                  label="save"
                  type="submit"
                  form="edit_person"
                >
                  <SaveIcon />
                </IconButton>
                <IconButton
                  edge="start"
                  label="clear"
                  onClick={() => this.clearEditablePerson()}
                >
                  <ClearIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  label="delete"
                  onClick={() => this.deletePerson(person)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ) : (
            <TableRow key={index}>
              <TableCell>{person.lastName}</TableCell>
              <TableCell>{person.firstName}</TableCell>
              <TableCell>{person.email}</TableCell>
              <TableCell align="right">
                <input
                  id={index}
                  type="button"
                  className={classes.edit}
                  onClick={() => this.setEditablePerson(person)}
                />
                <label htmlFor={index}>
                  <IconButton edge="end" label="edit" component="span">
                    <EditIcon />
                  </IconButton>
                </label>
                <IconButton
                  edge="end"
                  label="delete"
                  onClick={() => this.deletePerson(person)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          )
        )}
      </>
    );
  }
}

export default connect(
  (state) => ({
    list: state.list,
  }),
  (dispatch) => ({
    onDeletePerson: (person) => {
      dispatch({ type: "DELETE_PERSON", payload: person });
    },
    onEditPerson: (people) => {
      dispatch({ type: "EDIT_PERSON", payload: people });
    },
  })
)(withStyles(styles, { withTheme: true })(List));
