import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { TableRow, TableRowColumn } from 'material-ui/Table';

class GuessTableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guess: '',
      errorText: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  guessError(guess) {
    if (guess.length !== 4) {
      return 'Guess must be 4 characters';
    } else if (guess.length !== (new Set(guess)).size) {
      return 'Guess must not repeat characters';
    } else if (!/^\d+$/.test(guess)) {
      return 'Guess must only contain digits';
    }
    return '';
  }

  handleChange(event) {
    const newValue = event.target.value;
    this.setState({
      guess: newValue,
      errorText: this.guessError(newValue),
    });
  }

  render() {
    return (
      <TableRow key="newGuess" style={{ height: 80 }}>
        <TableRowColumn>New Guess</TableRowColumn> );
        <TableRowColumn>
          <TextField
            hintText="Guess"
            name="guessEntry"
            value={this.state.guess}
            errorText={this.state.errorText}
            onChange={this.handleChange}
          />
        </TableRowColumn>
        <TableRowColumn>
          <FlatButton
            primary
            label="Submit Guess"
            disabled={this.state.errorText !== ''}
            onTouchTap={() => {
              this.props.submitGuess(this.state.guess);
              this.setState({ guess: '', errorText: '' });
            }}
          />
        </TableRowColumn>
      </TableRow>
    );
  }
}

GuessTableRow.propTypes = {
  submitGuess: PropTypes.func.isRequired,
};

export default GuessTableRow;
