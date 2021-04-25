import { Component } from 'react';
import ListContainer from './list'
import {
  Container,
  Grid
} from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import { Provider } from 'react-redux';
import store from '../../store';

const styles = theme => ({
  page_container: {
    margin: '50px',
  },
});

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid container alignItems="center" className={classes.page_container}>
        <Container maxWidth={'md'}>
          <Provider store={store}>
            <ListContainer />
          </Provider>
        </Container>
      </Grid>
    )
  }
}

export default withStyles(styles, { withTheme: true })(App);