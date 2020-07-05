import React from 'react';
import SidebarComponent from './sidebar/sidebar';
import EditorComponent from './editor/editor';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import { Alert, AlertTitle } from '@material-ui/lab';


const firebase = require('firebase');

const AppContainer = styled(Container)`
  min-height: 100vh;
  background-color:#fbfef9;
 ;
`;

const NoteNotSelected = styled(Col)`
  background-color: #fbfef9 ; 
  padding-top: 12px;
`;


const RowContainer = styled(Row)`
  height: 100vh;
`;

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null
    }
  }

  componentDidMount() {

    firebase
      .firestore()
      .collection('notes')
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(doc => {
          const data = doc.data();
          data['id'] = doc.id;
          return data;
        })
        // console.log(notes);
        this.setState({ notes: notes });
      });
    // `onSnapshot()` gets called automatically when `notes` collection is updated
  }

  selectNote = (note, index) => this.setState({
    selectedNoteIndex: index,
    selectedNote: note
  })

  noteUpdate = (id, ntoeObj) => {
    // console.log("In Note Update : ");
    // console.log(id, ntoeObj);
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        title: ntoeObj.title,
        body: ntoeObj.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
  }

  // Adding a New Note
  newNote = async (title) => {
    if (title == null) {
      title = "Untitled"
    }
    const note = {
      title: title,
      body: ''
    };
    const newFromDB = await firebase
      .firestore()
      .collection('notes')
      .add({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    const newId = newFromDB.id;
    await this.setState({
      notes: [...this.state.notes, note]
    })
    const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter((eachNode) => eachNode.id === newId)[0]);
    this.setState({
      selectedNote: this.state.notes[newNoteIndex],
      selectedNoteIndex: newNoteIndex
    })
  }

  // Delete a Note
  deleteNote = async (note) => {
    const noteIndex = this.state.notes.indexOf(note);
    await this.setState((prevState) => {
      return ({
        ...prevState,
        notes: prevState.notes.filter((eachNote) => eachNote !== note)
      })
    })
    if (this.state.selectedNoteIndex === noteIndex) {
      console.log("jo slected bahi uda dia bhai.");
      // If Note is selected, DeSelect it
      this.setState({
        selectedNoteIndex: null,
        selectedNote: null
      })
    } else {
      this.state.notes.length > 1 ?
        this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1) :
        this.setState({
          selectedNoteIndex: null,
          selectedNote: null
        })
    }

    firebase
      .firestore()
      .collection('notes')
      .doc(note.id)
      .delete()
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });

    console.log("aua ?");
  }

  render() {
    return (
      <AppContainer fluid>
        <RowContainer>
          <SidebarComponent
            selectedNoteIndex={this.state.selectedNoteIndex}
            notes={this.state.notes}
            deleteNote={this.deleteNote}
            selectNote={this.selectNote}
            newNote={this.newNote}
          />
          {
            this.state.selectedNote ? (
              <EditorComponent
                selectedNote={this.state.selectedNote}
                selectedNoteIndex={this.state.selectedNoteIndex}
                notes={this.state.notes}
                noteUpdate={this.noteUpdate}
              >
              </EditorComponent>
            ) : (
                this.state.notes ? (
                  < NoteNotSelected >
                    <Alert severity="warning">
                      <AlertTitle>No Note Selected!</AlertTitle>
                          Please <strong>select an existing Note</strong> or <strong>create a New one</strong>.
                      </Alert>
                  </NoteNotSelected>
                ) : (<div></div>)
              )
          }
        </RowContainer>
      </AppContainer >
    )
  }
}

export default App;
