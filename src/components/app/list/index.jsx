import { Component, createRef } from 'react';
import {
  Paper,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';

const styles = theme => ({
  warning: {
    margin: '20px'
  },
  addPerson_form: {
    marginTop: '25px',
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  table_cell: {
    width: '28%',
    minWidth: '160px',
    "&:last-child": {
      width: '16%',
      minWidth: '108px'
    }
  }
});

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editablePerson: null,
      oldPerson: null
    }

    this.lastNameInput = createRef();
    this.firstNameInput = createRef();
    this.emailInput = createRef();
    this.editLastNameInput = createRef();
    this.editFirstNameInput = createRef();
    this.editEmailInput = createRef();
  }

  addPerson(e) {
    e.preventDefault();

    const person = {
      lastName: this.lastNameInput.current.value,
      firstName: this.firstNameInput.current.value,
      email: this.emailInput.current.value
    }
    this.props.onAddPerson(person);

    this.lastNameInput.current.value = null;
    this.firstNameInput.current.value = null;
    this.emailInput.current.value = null;
  }

  deletePerson(person) {
    if (this.state.editablePerson === person) {
      this.setState({editablePerson: null})
    }
    this.props.onDeletePerson(person);
  }

  setEditablePerson = (editPerson) => {
    if (this.state.editablePerson) return;
    this.setState({editablePerson: editPerson});
  }

  saveEditablePerson = (e) => {
    e.preventDefault();
    const person = {
      lastName: this.editLastNameInput.current.value,
      firstName: this.editFirstNameInput.current.value,
      email: this.editEmailInput.current.value
    }

    const people = {
      oldPerson: this.state.editablePerson,
      newPerson: person
    };
    console.log(people)
    // this.props.onEditPerson(people);
    // this.clearEditablePerson();
  }

  clearEditablePerson = () => {
    this.setState({editablePerson: null});
  }

  renderList = () => {
    return this.props.list.map((person, index) => 
      (this.state.editablePerson === person) ? 
        <TableRow key={index}>
          <TableCell>
            <TextField
              label="Введите фамилию"
              inputRef={this.editLastNameInput}
              defaultValue={person.lastName}
              required
            />
          </TableCell>
          <TableCell>
            <TextField
              label="Введите имя"
              inputRef={this.editFirstNameInput}
              defaultValue={person.firstName}
              required
            />
          </TableCell>
          <TableCell>
            <TextField
              label="Введите Email"
              inputRef={this.editEmailInput}
              defaultValue={person.email}
              type="email"
              required
            />
          </TableCell>
          <TableCell align="right">
            <IconButton
              edge="start"
              aria-label="save"
              type="submit"
            >
              <SaveIcon />
            </IconButton>
            <IconButton
              edge="start"
              aria-label="clear"
              onClick={() => this.clearEditablePerson()}
            >
              <ClearIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => this.deletePerson(person)}
            >
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      : <TableRow key={index}>
          <TableCell>{person.lastName}</TableCell>
          <TableCell>{person.firstName}</TableCell>
          <TableCell>{person.email}</TableCell>
          <TableCell align="right">
            <IconButton
              edge="end"
              aria-label="edit"
              type="button"
              onClick={() => this.setEditablePerson(person)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => this.deletePerson(person)}
            >
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
    )
  }

  render() {
    const { list, classes } = this.props;

    return (
      <>
        <TableContainer component={Paper}>
          <form onSubmit={this.saveEditablePerson}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.table_cell}>
                    <Typography>Фамилия</Typography>
                  </TableCell>
                  <TableCell className={classes.table_cell}>
                    <Typography>Имя</Typography>
                  </TableCell>
                  <TableCell className={classes.table_cell}>
                    <Typography>Email</Typography>
                  </TableCell>
                  <TableCell className={classes.table_cell}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody id="list">
                {list.length > 0 ?
                  this.renderList()
                :
                  <TableRow>
                    <TableCell>
                      <Typography>Список пуст</Typography>
                    </TableCell>
                  </TableRow>
                }
              </TableBody>
            </Table>
          </form>
        </TableContainer>
        <Paper>
          <form onSubmit={this.addPerson.bind(this)} className={classes.addPerson_form}>
            <TextField label="Введите фамилию" inputRef={this.lastNameInput} required />
            <TextField label="Введите имя" inputRef={this.firstNameInput} required />
            <TextField label="Введите Email" type="email" inputRef={this.emailInput} required />
            <IconButton
              edge="end"
              aria-label="save"
              type="submit"
            >
              <AddIcon />
            </IconButton>
          </form>
        </Paper>
      </>
    )
  }
}

export default connect(
  state => ({
    list: state.list
  }),
  dispatch => ({
    onAddPerson: (person) => {
      dispatch({ type: 'ADD_PERSON', payload: person });
    },
    onDeletePerson: (person) => {
      dispatch({ type: 'DELETE_PERSON', payload: person });
    },
    onEditPerson: (people) => {
      dispatch({ type: 'EDIT_PERSON', payload: people });
    },
    onGetPerson: () => {
      dispatch();
    }
  })
)(withStyles(styles, { withTheme: true })(List));