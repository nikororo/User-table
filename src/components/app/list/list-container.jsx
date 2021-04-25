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
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import List from './list'

const styles = theme => ({
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

class ListContainer extends Component {
  constructor(props) {
    super(props);
    this.lastNameInput = createRef();
    this.firstNameInput = createRef();
    this.emailInput = createRef();
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

  render() {
    const { list, classes } = this.props;

    return (
      <>
        <TableContainer component={Paper}>
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
                <List />
              :
                <TableRow>
                  <TableCell>
                    <Typography>Список пуст</Typography>
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </TableContainer>
        <Paper>
          <form onSubmit={this.addPerson.bind(this)} className={classes.addPerson_form}>
            <TextField label="Введите фамилию" inputRef={this.lastNameInput} required />
            <TextField label="Введите имя" inputRef={this.firstNameInput} required />
            <TextField label="Введите Email" type="email" inputRef={this.emailInput} required />
            <IconButton
              edge="end"
              label="save"
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
    }
  })
)(withStyles(styles, { withTheme: true })(ListContainer));