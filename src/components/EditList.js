import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { editList } from '../actions/app_action';

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

class EditList extends Component {
  state = {
    listName: this.props.listName
  }

  handleListName = (e) => {
    const value = e.target.value.trim();
    this.setState({
      listName: value
    })
  }

  editList = () => {
    if(this.state.listName !== '') {
      let flag = true;
      const result = this.props.lists.filter(item => (item.name === this.state.listName));
      if(result.length > 0) {
        flag = false;
      }
      if(flag) {
        this.props.dispatch(editList(this.props.listName, this.state.listName));
        this.props.closeView();
      } else {
        window.alert('表单名已存在');
      }
    } else {
      window.alert('表名不能为空');
    }
  }

  render() {
    const { closeView, classes } = this.props;
    const { listName } = this.state;
    return (
      <Dialog
          open={true}
          onClose={closeView}
          classes={{
            paper: classes.paper
          }}
        >
        <DialogTitle>编辑表单</DialogTitle>
        <DialogContent>
          <div>
            <TextField
              label="表单名"
              placeholder="表单名"
              className={classes.textField}
              margin="normal"
              value={listName}
              onChange={this.handleListName}
            />
          </div>
          <div className={classes.buttonContainer}>
            <Button raised className={classes.button} onClick={this.editList}>
              确定
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }
}

export default withStyles(styles)(connect()(EditList));
