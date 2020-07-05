import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../helpers';
import styled from 'styled-components';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { IconButton } from '@material-ui/core';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';


class SidebarItemComponent extends React.Component {

  selectNote = (n, i) => this.props.selectNote(n, i);

  deleteNote = (n) => {
    if (window.confirm(`Are you sure you want to delete this Note ?`)) {
      this.props.deleteNote(n)
    }
  }

  render() {
    const { note, index, selectedNoteIndex, classes } = this.props;


    return (
      <div key={index}>
        <ListItem
          className={classes.listItem}
          selected={selectedNoteIndex === index}
          alignItems='flex-start'
        >
          <div
            className={classes.textSection}
            onClick={() => this.selectNote(note, index)}
          >
            <ListItemText
              classes={{
                primary: classes.myPrimary,
                secondary: classes.mySecondary,
              }}
              primary={note.title}
              secondary={removeHTMLTags(note.body.substring(0, 30)) + '...'}
            >
            </ListItemText>
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => this.deleteNote(note)}
                className={classes.deleteIcon}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </div>
        </ListItem>
      </div >
    )
  }
}
export default withStyles(styles)(SidebarItemComponent)