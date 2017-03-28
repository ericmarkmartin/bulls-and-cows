import React, { PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { List, Map } from 'immutable';

import GuessTableRow from './components/GuessTableRow';
import WinDialog from './components/WinDialog';

const Game = props => (
  <div>
    <Table selectable={false}>
      <TableHeader enableSelectAll={false} displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn>Turn</TableHeaderColumn>
          <TableHeaderColumn>Guess</TableHeaderColumn>
          <TableHeaderColumn>Rating</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {
          props.guesses
            .zip(props.ratings
              .map(rating => rating.toJS())
              .map(({ BULLS, COWS }) => `${BULLS}B${COWS}C`),
            )
            .map(([guess, rating], i) => (
              // eslint-disable-next-line react/no-array-index-key
              <TableRow key={`${guess}:${rating}:${i}`}>
                <TableRowColumn>{i}</TableRowColumn>
                <TableRowColumn>{guess}</TableRowColumn>
                <TableRowColumn>{rating}</TableRowColumn>
              </TableRow>
            ))
        }
        <GuessTableRow submitGuess={props.submitGuess} />
      </TableBody>
    </Table>
    <WinDialog
      open={
        (props.ratings.size > 0) &&
        (props.ratings.last().equals(Map({ BULLS: 4, COWS: 0})))
      }
    />
  </div>
);

Game.propTypes = {
  guesses: PropTypes.instanceOf(List).isRequired,
  ratings: PropTypes.instanceOf(List).isRequired,
  submitGuess: PropTypes.func.isRequired,
};


export default Game;
