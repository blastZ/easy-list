import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/ModeEdit';
import NewItem from './NewItem';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Input from 'material-ui/Input';
import EditItem from './EditItem';
import { deleteItem, initLists } from '../actions/app_action';

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
  topContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    width: '105px'
  },
  innerInput: {
    paddingBottom: '3px',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    width: 17,
    marginRight: 11,
    marginTop: 5
  }
}

class ListPage extends Component {
  state = {
    showNewItem: false,
    showEditItem: false,
    searchKey: '',
    listName: '',
    itemName: '',
    itemValue: ''
  }

  shouldShowNewItem = () => {
    this.setState({
      showNewItem: !this.state.showNewItem
    })
  }

  shouldShowEditItem = () => {
    this.setState({
      showEditItem: !this.state.showEditItem
    })
  }

  handleSearchKey = (e) => {
    const value = e.target.value;
    this.setState({
      searchKey: value
    })
  }

  editItem = (listName, itemName, itemValue) => () => {
    this.setState({
      listName,
      itemName,
      itemValue
    }, () => {
      this.shouldShowEditItem();
    })
  }

  deleteItem = (listName, itemName) => () => {
    const result = window.confirm('确定删除该项目吗?');
    if(result) {
      this.props.dispatch(deleteItem(listName, itemName));
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

  componentDidMount() {
    if(localStorage.getItem('lists')) {
      this.props.dispatch(initLists(JSON.parse(localStorage.getItem('lists'))));
    }
  }

  render() {
    const { lists, classes } = this.props;
    const { showNewItem, searchKey, showEditItem, listName, itemName, itemValue } = this.state;
    const { listname } = this.props.match.params;
    const list = lists.filter(item => item.name === listname)[0];
    return (
      <div className={classes.container}>
        {showNewItem && <NewItem
            list={list}
            closeView={this.shouldShowNewItem} />}
        {showEditItem && <EditItem
            list={list}
            listName={listName}
            itemName={itemName}
            itemValue={itemValue}
            closeView={this.shouldShowEditItem} />}
        <div className={classes.topContainer}>
          <div className={classes.searchContainer}>
            <img className={classes.searchIcon} src={require('../imgs/search.svg')} alt="search-icon" />
            <Input
              placeholder="项目名"
              className={classes.input}
              classes={{
                input: classes.innerInput
              }}
              value={searchKey}
              onChange={this.handleSearchKey}
            />
          </div>
          <Button raised color="primary" className={classes.button} onClick={this.shouldShowNewItem}>
            添加项目
          </Button>
        </div>
        <Divider className={classes.divider} />
        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>项目名</TableCell>
                <TableCell>参数</TableCell>
                <TableCell>操作</TableCell>
              </TableRow>
            </TableHead>
            {list && <TableBody>
              {list.content.map((item, index) => (
                new RegExp(searchKey, 'i').test(item.name) && <TableRow key={item.name + index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.value}</TableCell>
                  <TableCell>
                    <div className={classes.operateContainer}>
                      <div className={classes.operateItem} onClick={this.editItem(list.name, item.name, item.value)}><EditIcon />编辑</div>
                      <div className={classes.operateItem} onClick={this.deleteItem(list.name, item.name)}><DeleteIcon />删除</div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>}
          </Table>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = ({ appReducer }) => ({
  lists: appReducer.lists
})

export default withStyles(styles)(withRouter(connect(mapStateToProps)(ListPage)));
