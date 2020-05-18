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
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { convertTimestampToReadable } from '../utils/helper';

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
            <TableCell align="right">Author</TableCell>
            <TableCell align="right">Number of comments</TableCell>
            <TableCell align="right">Current score</TableCell>
            <TableCell align="right">Created time</TableCell>
            <TableCell align="right">Like</TableCell>
            <TableCell align="right">Dislike</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.sortedPosts.length 
            ? props.sortedPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell component="th" scope="row">
                    {post.title}
                  </TableCell>
                  <TableCell align="right">{post.author}</TableCell>
                  <TableCell align="right">{post.commentCount}</TableCell>
                  <TableCell align="right">{post.voteScore}</TableCell>
                  <TableCell align="right">
                    {convertTimestampToReadable(post.timestamp)}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton><ThumbUpIcon /></IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton><ThumbDownIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))
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

export default withRouter(connect(mapStatesToProps)(PostTable))