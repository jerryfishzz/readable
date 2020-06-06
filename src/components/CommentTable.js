import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { convertTimestampToReadable } from '../utils/helper';
import Like from './Like';
import Dislike from './Dislike';
import DeleteButton from './DeleteButton';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function CommentTable(props) {
  const classes = useStyles();

  if (!props.sortedComments.length) return false

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Body</TableCell>
            <TableCell align="right">Author</TableCell>
            <TableCell align="right">Current score</TableCell>
            <TableCell align="right">Created time</TableCell>
            <TableCell align="right">Like</TableCell>
            <TableCell align="right">Dislike</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.sortedComments.map(comment => 
            !comment.deleted && (
              <TableRow key={comment.id}>
                <TableCell align="right">{comment.body}</TableCell>
                <TableCell align="right">{comment.author}</TableCell>
                <TableCell align="right">{comment.voteScore}</TableCell>
                <TableCell align="right">
                  {convertTimestampToReadable(comment.timestamp)}
                </TableCell>
                <TableCell align="right">
                  <Like id={comment.id} type="comment" />
                </TableCell>
                <TableCell align="right">
                  <Dislike id={comment.id} type="comment" />
                </TableCell>
                <TableCell align="right">
                  <DeleteButton id={comment.id} type="comment" />
                </TableCell>
              </TableRow>
            )
          )}  
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const mapStatesToProps = ({ comments }) => {
    // To make redux work, one requirement is the data must be immutable
    // sort() is a mutable method so here need to shallow copy the original array  
    const sortedComments = [...comments].sort((a, b) => b.timestamp - a.timestamp)

  return {
    sortedComments,
  }
}

export default withRouter(connect(mapStatesToProps, null)(CommentTable))