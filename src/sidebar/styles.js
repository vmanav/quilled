const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: 'calc(100% - 35px)',
    position: 'absolute',
    left: '0',
    width: '300px',
    boxShadow: '0px 0px 2px black'
  },
  headerDivider: {
    background: '#f4f1de'
  },
  // newChatBtn: {
  //   borderRadius: '0px'
  // },
  // unreadMessage: {
  //   color: 'red',
  //   position: 'absolute',
  //   top: '0',
  //   right: '5px'
  // },
  newNoteBtn: {
    backgroundColor: '#4caf50',
    color: 'white',
    marginRight: '6px',
    // '&:hover': {
    //   backgroundColor: 'white',
    //   color: '#4caf50'
    // }
  },
  discardNoteBtn: {
    backgroundColor: '#f44336',
    color: 'white',
    // '&:hover': {
    //   backgroundColor: 'white',
    //   color: '#f44336'
    // },
    marginRight: '6px',
  },
  sidebarContainer: {
    overflowY: 'scroll',
    maxHeight: '100%'
  },
  newNoteInput: {
    width: '90%',
    outline: 'none',
    border: 'none',
    paddingLeft: '5px',
    '&:focus': {
      outline: '2px solid rgba(81, 203, 238, 1)'
    }
  },
  newNoteSubmitBtn: {
    marginRight: '6px',
    backgroundColor: '#cddc39',
    color: 'white',
    // width: '100%',
    // borderRadius: '0px',
    // color: 'white'
  }
});

export default styles;