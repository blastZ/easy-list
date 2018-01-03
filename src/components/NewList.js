import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { addNewList } from '../actions/app_action';

const styles = {
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
    width: '100%',
  },
  paper: {
    width: '350px'
  },
  textField: {
    width: '100%'
  }
}

class NewList extends Component {
  state = {
    newListName: ''
  }

  handleNewListName = (e) => {
    const value = e.target.value.trim();
    this.setState({
      newListName: value
    })
  }

  addNewList = () => {
    if(this.state.newListName !== '') {
      let flag = true;
      const result = this.props.lists.filter(item => (item.name === this.state.newListName));
      if(result.length > 0) {
        flag = false;
      }
      if(flag) {
        this.props.dispatch(addNewList(this.state.newListName));
        this.props.closeView();
      } else {
        window.alert('表名已存在');
      }
    } else {
      window.alert('表名不能为空');
    }
  }

  render() {
    const { closeView, classes } = this.props;
    const { newListName } = this.state;
    return (
      <Dialog
          open={true}
          onClose={closeView}
          classes={{
            paper: classes.paper
          }}
        >
        <DialogTitle>新建表单</DialogTitle>
        <DialogContent>
          <div>
            <TextField
              label="新建表单名"
              placeholder="新建表单名"
              className={classes.textField}
              margin="normal"
              value={newListName}
              onChange={this.handleNewListName}
            />
          </div>
          <div className={classes.buttonContainer}>
            <Button raised className={classes.button} onClick={this.addNewList}>
              确定
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }
}

const mapStateToProps = ({ appReducer }) => ({
  lists: appReducer.lists
})

export default withStyles(styles)(connect(mapStateToProps)(NewList));
