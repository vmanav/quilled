import React from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import TitleIcon from '@material-ui/icons/Title';
import { withStyles } from '@material-ui/core/styles';
import { Col } from 'react-bootstrap';
import styles from './styles';
import styled from 'styled-components';

const EditorContainer = styled(Col)`
  background-color: #fbfef9;
  padding: 0 ;
  max-height: 100%;
`;

const EditHeader = styled.p`
  padding-left: 4px;
  margin: 0;
  background-color: #333533;
  /* #343a40; */
`;

class EditorComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      title: '',
      id: ''
    };
  }

  componentDidMount = () => {
    this.setState({
      text: this.props.selectedNote.body,
      title: this.props.selectedNote.title,
      id: this.props.selectedNote.id
    });
  }

  componentDidUpdate = () => {
    if (this.props.selectedNote.id !== this.state.id) {
      this.setState({
        text: this.props.selectedNote.body,
        title: this.props.selectedNote.title,
        id: this.props.selectedNote.id
      });
    }
  }

  updateBody = async (val) => {
    await this.setState({ text: val })
    this.update();
  }

  updateTitle = async (text) => {
    await this.setState({ title: text })
    this.update();
  }

  update = debounce(() => {
    this.props.noteUpdate(
      this.state.id, {
      title: this.state.title,
      body: this.state.text,
    })
  }, 1500);


  render() {

    const { classes } = this.props;

    return (
      <EditorContainer xs={9}>
        <EditHeader>
          <TitleIcon
            size="large"
            className={classes.editIcon}
          >
          </TitleIcon>
          {/* <BorderColorIcon
            size="large"
            className={classes.editIcon}
          ></BorderColorIcon> */}
          <input
            className={classes.titleInput}
            placeholder={'Note Title...'}
            value={this.state.title}
            onChange={(e) => this.updateTitle(e.target.value)}
          >
          </input>
        </EditHeader>
        <ReactQuill
          value={this.state.text}
          onChange={this.updateBody}
        />
      </EditorContainer >
    )
  }


}

export default withStyles(styles)(EditorComponent)