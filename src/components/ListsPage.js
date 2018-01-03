import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/ModeEdit';
import NewList from './NewList';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import EditList from './EditList';
import { deleteList, initLists } from '../actions/app_action';

const styles = {
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '64px 20px'
  },
  paper: {
    width: '100%'
  },
  table: {
    '& th': {
      textAlign: 'center',
    },
    '& td': {
      textAlign: 'center'
    }
  },
  divider: {
    margin: '28px 0px'
  },
  operateItem: {
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      color: '#43cea2',
      cursor: 'pointer'
    }
  },
  listName: {
    '&:hover': {
      color: '#43cea2',
      cursor: 'pointer'
    }
  },
  operateContainer: {
    display: 'flex',
    justifyContent: 'center',
    '& div:not(:first-child)': {
      marginLeft: '15px'
    }
  },
  button: {
    background: 'linear-gradient(to right, #43cea2, #185a9d)',
    letterSpacing: '2px'
  },
}

class ListsPage extends Component {
  state = {
    showNewList: false,
    showEditList: false,
    listName: ''
  }

  shouldShowNewList = () => {
    this.setState({
      showNewList: !this.state.showNewList
    })
  }

  shouldShowEditList = () => {
    this.setState({
      showEditList: !this.state.showEditList
    })
  }

  toList = (listName) => () => {
    this.props.history.push(`/${listName}`);
  }

  editList = (listName) => () => {
    this.setState({
      listName
    }, () => {
      this.shouldShowEditList();
    })
  }

  deleteList = (listName) => () => {
    const result = window.confirm('确定删除该表单吗?');
    if(result) {
      this.props.dispatch(deleteList(listName));
    }
  }

  componentDidMount() {
    if(localStorage.getItem('lists')) {
      this.props.dispatch(initLists(JSON.parse(localStorage.getItem('lists'))));
    } else {
      fetch('http://www.blastz.cn:5002/getlists')
        .then((response) => {
          if(response.ok) {
            response.json().then((result) => {
              this.props.dispatch(initLists(JSON.parse(result)));
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  render() {
    const { lists, classes } = this.props;
    const { showNewList, showEditList, listName } = this.state;
    return (
      <div className={classes.container}>
        {showNewList && <NewList
            closeView={this.shouldShowNewList} />}
        {showEditList && <EditList
            lists={lists}
            listName={listName}
            closeView={this.shouldShowEditList} />}
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Button raised color="primary" className={classes.button} onClick={this.shouldShowNewList}>
            新建表单
          </Button>
        </div>
        <Divider className={classes.divider} />
        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>表名</TableCell>
                <TableCell>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lists.map((list, index) => {
                return (
                  <TableRow key={list.name + index}>
                    <TableCell>
                      <span className={classes.listName} onClick={this.toList(list.name)}>{list.name}</span>
                    </TableCell>
                    <TableCell>
                      <div className={classes.operateContainer}>
                        <div className={classes.operateItem} onClick={this.editList(list.name)}><EditIcon />编辑</div>
                        <div className={classes.operateItem} onClick={this.deleteList(list.name)}><DeleteIcon />删除</div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = ({ appReducer }) => ({
  lists: appReducer.lists
})

export default withStyles(styles)(withRouter(connect(mapStateToProps)(ListsPage)));
