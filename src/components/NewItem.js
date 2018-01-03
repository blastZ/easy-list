import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { addNewItem } from '../actions/app_action';

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

class NewItem extends Component {
  state = {
    newItemName: '',
    newItemValue: '',
  }

  handleNewItemName = (e) => {
    const value = e.target.value.trim();
    this.setState({
      newItemName: value
    })
  }

  handleNewItemValue = (e) => {
    const value = e.target.value;
    this.setState({
      newItemValue: value
    })
  }

  addNewItem = () => {
    if(this.state.newItemName !== '' && this.state.newItemValue !== '') {
      let flag = true;
      const result = this.props.list.content.filter(item => (item.name === this.state.newItemName));
      if(result.length > 0) {
        flag = false;
      }
      if(flag) {
        this.props.dispatch(addNewItem(this.props.list.name, this.state.newItemName, this.state.newItemValue));
        this.props.closeView();
      } else {
        window.alert('项目已存在');
      }
    } else {
      window.alert('项目名和值不能为空');
    }
  }

  render() {
    const { closeView, classes } = this.props;
    const { newItemName, newItemValue } = this.state;
    return (
      <Dialog
          open={true}
          onClose={closeView}
          classes={{
            paper: classes.paper
          }}
        >
        <DialogTitle>添加项目</DialogTitle>
        <DialogContent>
          <div>
            <TextField
              label="项目名"
              placeholder="项目名"
              className={classes.textField}
              margin="normal"
              value={newItemName}
              onChange={this.handleNewItemName}
            />
            <TextField
              label="参数值"
              placeholder="参数值"
              className={classes.textField}
              margin="normal"
              value={newItemValue}
              onChange={this.handleNewItemValue}
            />
          </div>
          <div className={classes.buttonContainer}>
            <Button raised className={classes.button} onClick={this.addNewItem}>
              确定
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }
}

export default withStyles(styles)(connect()(NewItem));
