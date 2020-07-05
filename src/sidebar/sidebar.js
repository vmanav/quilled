import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button, Fab } from '@material-ui/core';
import SidebarItemComponent from '../sidebaritem/sidebarItem';
import { Col } from 'react-bootstrap';
import styled from 'styled-components';
import { red } from '@material-ui/core/colors'
// import { AddIcon } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';

const AppHeading = styled.p`
  /* background-color: lightcoral; */
  color : #f4f1de;
  margin: 0px;
  font-size: 2em;
  /* font-family: 'Marck Script', cursive; */
  font-family: 'Kaushan Script', cursive;
`;

const LeftSideBarContainer = styled(Col)`
  background-color: #343a40 ;
  height: 100%;
  max-height: 100%;
  padding: 0;
  text-align: center;
`;

const ButtonText = styled.p`
  color: white;
  margin: 0;
  padding: 4px;
`;

const LeftSideLoader = styled(Col)`
  background-color: #343a40 ;
  height: 100%;
  max-height: 100%;
  padding: 0;
  text-align: center;
`;

const LoaderContainer = styled.div`
  padding:  12px 0px;
  width: 100%;
  text-align: center;
  display :flex;
  justify-content: center;
`;
const NoteOptionsContainer = styled.div`
  padding:  8px 0px;
`;



class SidebarComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      addingNote: false,
      title: null,
    }
  }

  newNoteBtnClick = () => {
    console.log("New Note Button Clicked");
    this.setState((prevState) => {
      return ({
        title: null,
        addingNote: !prevState.addingNote
      });
    })
  }

  componentDidUpdate() {
    console.log("State : ", this.state);
  }

  updateTitle = (text) => {
    this.setState({
      title: text
    })
  }

  newNote = () => {
    this.props.newNote(this.state.title);
    this.setState({
      title: null,
      addingNote: false
    })
  }

  selectNote = (n, i) => this.props.selectNote(n, i);

  deleteNote = (note) => this.props.deleteNote(note);

  render() {

    const { notes, classes, selectedNoteIndex } = this.props;

    if (notes) {
      return (
        <LeftSideBarContainer xs={3} >
          <div className={classes.sidebarContainer}>
            <AppHeading> Quilled </AppHeading>
            {/* <Divider classes={{ root: classes.headerDivider }} /> */}
            <NoteOptionsContainer>

              {
                this.state.addingNote ?

                  (
                    <ButtonText>
                      <Fab
                        size="small"
                        aria-label="discard"
                        onClick={this.newNoteBtnClick}
                        className={classes.discardNoteBtn}
                      >
                        <ClearIcon />
                      </Fab>
                  Discard Note
                    </ButtonText>
                  )
                  : (
                    <ButtonText>
                      <Fab
                        size="small"
                        aria-label="add"
                        onClick={this.newNoteBtnClick}
                        className={classes.newNoteBtn}
                      >
                        <AddIcon />
                      </Fab>
                  New Note
                    </ButtonText>
                  )
              }
              <Divider classes={{ root: classes.headerDivider }} />
            </NoteOptionsContainer>

            {
              this.state.addingNote ?
                (<div>
                  <input
                    type='text'
                    className={classes.newNoteInput}
                    placeholder='Title'
                    onKeyUp={(e) => this.updateTitle(e.target.value)}
                  >
                  </input>
                  <ButtonText>
                    <Fab
                      size="small"
                      aria-label="save"
                      onClick={this.newNote}
                      className={classes.newNoteSubmitBtn}
                    >
                      <CheckIcon />
                    </Fab>
                    Save Note
                  </ButtonText>
                </div>
                )
                :
                (null)
            }
            <List style={{ padding: 0 }}>
              {
                notes.map((note, index) => {
                  return (
                    <div key={index}
                    >
                      <SidebarItemComponent
                        note={note}
                        index={index}
                        selectedNoteIndex={selectedNoteIndex}
                        selectNote={this.selectNote}
                        deleteNote={this.deleteNote}
                      />
                      {/* <Divider /> */}
                      <Divider classes={{ root: classes.headerDivider }} />
                    </div>
                  )
                })
              }
            </List>
          </div >
        </LeftSideBarContainer >
      )
    }
    else {
      return (
        <LeftSideLoader xs={3} >
          <AppHeading> Quilled </AppHeading>
          {/* <Divider classes={{ root: classes.headerDivider }} /> */}
          <LoaderContainer>
            <div className="loader"></div>
          </LoaderContainer>
          {/* <Divider classes={{ root: classes.headerDivider }} /> */}
        </LeftSideLoader>
      )
    }
  }
}

export default withStyles(styles)(SidebarComponent);