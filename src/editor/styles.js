const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: 'calc(100% - 35px)',
    position: 'absolute',
    left: '0',
    width: '300px',
    boxShadow: '0px 0px 2px black'
  },
  titleInput: {
    // height: '50px',
    // boxSizing: 'border-box',
    border: 'none',
    padding: '4px',
    fontSize: '1.2em',
    backgroundColor: '#333533',
    color: 'white',
    paddingLeft: '24px'
  },
  editIcon: {
    color: 'white',

  },
  editorContainer: {
    minHeight: '100%',
    backgroundColor: 'white',
  }
});

export default styles;