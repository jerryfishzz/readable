import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'
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

function PostTable(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Body</TableCell>
            <TableCell align="right">Author</TableCell>
            <TableCell align="right">Number of comments</TableCell>
            <TableCell align="right">Current score</TableCell>
            <TableCell align="right">Like</TableCell>
            <TableCell align="right">Dislike</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.sortedPosts.length 
            ? props.sortedPosts.map(post => 
                !post.deleted && (
                  <TableRow key={post.id}>
                    <TableCell component="th" scope="row">
                      <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
                    </TableCell>
                    <TableCell align="right">{post.body}</TableCell>
                    <TableCell align="right">{post.author}</TableCell>
                    <TableCell align="right">{post.commentCount}</TableCell>
                    <TableCell align="right">{post.voteScore}</TableCell>
                    <TableCell align="right">
                      <Like id={post.id} />
                    </TableCell>
                    <TableCell align="right">
                      <Dislike id={post.id} />
                    </TableCell>
                    <TableCell align="right">
                      <DeleteButton id={post.id} />
                    </TableCell>
                  </TableRow>
                )
              )
            : <TableRow>
                <TableCell>There is no posts under this category.</TableCell>
              </TableRow>
          }  
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const mapStatesToProps = ({ posts, appStatus }) => {
    // To make redux work, one requirement is the data must be immutable
    // sort() is a mutable method so here need to shallow copy the original array  
    const sortedPosts = appStatus.currentSort === 'default'
    ? [...posts]
    : appStatus.currentSort === 'date'
      ? [...posts].sort((a, b) => b.timestamp - a.timestamp)
      : [...posts].sort((a, b) => {
          return a.voteScore - b.voteScore
        })

  return {
    sortedPosts,
  }
}

export default withRouter(connect(mapStatesToProps, null)(PostTable))