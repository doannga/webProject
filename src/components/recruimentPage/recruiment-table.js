import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

const rows = [
  { id: 'company', align: 'center', disablePadding: true, label: 'Công ty' },
  { id: 'salary', align: 'center', disablePadding: true, label: 'Mức lương' },
  { id: 'address', align: 'center', disablePadding: true, label: 'Địa chỉ' },
  { id: 'expired', align: 'center', disablePadding: true, label: 'Hạn' },
];

class EnhancedTableHead extends React.Component {

  render() {
    return (
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.align}
                padding={row.disablePadding ? 'none' : 'default'}
                style={{ paddingLeft: 10, paddingRight: 10 }}
              >
                <Typography variant="body2" gutterBottom style={{ fontWeight: 'bold' }}>
                  {row.label}
                </Typography>
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {

  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class RecruimentTable extends React.Component {
  state = {
    selected: [],
    allowSelect: true,
    limitSelect: 5,
    ids: []
  };

  handleClick = (event, item, onHandleItemSelected) => {
    const { selected, limitSelect, ids } = this.state;
    const selectedIndex = ids.indexOf(item.id);
    let count = selected.length

    if (selectedIndex === -1) {
      if (count < limitSelect) {
        selected.push(item)
        ids.push(item.id)
      }
    } else {
      selected.splice(selectedIndex, 1)
      ids.splice(selectedIndex, 1)
    }
    this.setState({
      selected: selected,
      ids: ids
    }, () => {
      onHandleItemSelected(selected)
    })
  };

  isSelected = id => this.state.ids.indexOf(id) !== -1

  isAllowSelect = (id) => {
    let { limitSelect, selected } = this.state
    return selected.length < limitSelect || this.isSelected(id)
  }

  handleSalary(salary) {
    let length = salary.length
    if (length === 2) {
      if (!isNaN(salary[0]) && !isNaN(salary[1])) {
        return this.convertStringToSalary(salary[0]) + " - " + this.convertStringToSalary(salary[1])
      }
    }
    return salary
  }

  convertStringToSalary(salary) {
    if (salary > 1000000) {
      return salary / 1000000 + "tr"
    }
    return salary
  }

  componentWillUpdate() {
    const {clearSelected, onHandleItemChecked } = this.props
    if (clearSelected) {
      this.setState({
        selected: [],
        ids: []
      })
      onHandleItemChecked([])
    }
    console.log(clearSelected);
  }

  render() {
    const { classes, data, totalSize, page, rowsPerPage, handleChangePage, 
      onHandleItemChecked } = this.props;

    
    

    return ( 
      <Paper className={classes.root}>
        
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead />
            <TableBody>
              {
                data.map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n, onHandleItemChecked)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding='none' style={{ paddingLeft: 10, paddingRight: 10 }}>
                        <Checkbox color="primary" checked={isSelected} disabled={!this.isAllowSelect(n.id)} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding='none' style={{ padding: 10 }}>
                        <a href={n.url} target="_blank" rel="noopener noreferrer"
                          style={{ textDecoration: 'none', outline: 'none'}}>
                          <Typography
                            gutterBottom
                            style={{ display: "flex", alignItems: "center", fontWeight: 'bold', color: '#0060B6'  }}
                          >
                            {n.title}
                          </Typography></a>
                        <Typography
                          style={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center"
                          }}
                        >
                          {n.company}
                        </Typography>

                      </TableCell>
                      <TableCell align="center" padding='none' style={{ paddingLeft: 10, paddingRight: 10 }}>{this.handleSalary(n.salary)}</TableCell>
                      <TableCell align="center" padding='none' style={{ paddingLeft: 10, paddingRight: 10 }}>{n.address}</TableCell>
                      <TableCell align="center" padding='none' style={{ paddingLeft: 10, paddingRight: 10 }}>{n.expired}</TableCell>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={totalSize}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={handleChangePage}
        />
      </Paper>
    );
  }
}

RecruimentTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecruimentTable);