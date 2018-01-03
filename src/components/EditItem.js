import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { editItem } from '../actions/app_action';

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

class EditItem extends Component {
  state = {
    itemName: this.props.itemName,
    itemValue: this.props.itemValue,
  }

  handleItemName = (e) => {
    const value = e.target.value.trim();
    this.setState({
      itemName: value
    })
  }

  handleItemValue = (e) => {
    const value = e.target.value;
    this.setState({
      itemValue: value
    })
  }

  editItem = () => {
    if(this.state.itemName !== '' && this.state.itemValue !== '') {
      if(this.state.itemName === this.props.itemName) {
        this.props.dispatch(editItem(this.props.listName, this.props.itemName, this.state.itemName, this.state.itemValue));
        this.props.closeView();
      } else {
        let flag = true;
        const result = this.props.list.content.filter(item => (item.name === this.state.itemName));
        if(result.length > 0) {
          flag = false;
        }
        if(flag) {
          this.props.dispatch(editItem(this.props.listName, this.props.itemName, this.state.itemName, this.state.itemValue));
          this.props.closeView();
        } else {
          window.alert('项目名已存在');
        }
      }
    } else {
      window.alert('项目名和值不能为空');
    }
  }

  render() {
    const { closeView, classes } = this.props;
    const { itemName, itemValue } = this.state;
    return (
      <Dialog
          open={true}
          onClose={closeView}
          classes={{
            paper: classes.paper
          }}
        >
        <DialogTitle>编辑项目</DialogTitle>
        <DialogContent>
          <div>
            <TextField
              label="项目名"
              placeholder="项目名"
              className={classes.textField}
              margin="normal"
              value={itemName}
              onChange={this.handleItemName}
            />
            <TextField
              label="参数值"
              placeholder="参数值"
              className={classes.textField}
              margin="normal"
              value={itemValue}
              onChange={this.handleItemValue}
            />
          </div>
          <div className={classes.buttonContainer}>
            <Button raised className={classes.button} onClick={this.editItem}>
              确定
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }
}

export default withStyles(styles)(connect()(EditItem));
