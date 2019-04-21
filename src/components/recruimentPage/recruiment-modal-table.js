import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CareerTag from './career-tag'

const rows = [
  { id: 'title', align: 'center', disablePadding: true, label: 'Tuyển dụng' },
  { id: 'company', align: 'center', disablePadding: true, label: 'Công ty' },
  { id: 'salary', align: 'center', disablePadding: true, label: 'Mức lương' },
  { id: 'address', align: 'center', disablePadding: true, label: 'Địa chỉ' },
  { id: 'career', align: 'center', disablePadding: true, label: 'Ngành nghề' },
  { id: 'experience', align: 'center', disablePadding: true, label: 'Kinh nghiệm' },
  { id: 'diploma', align: 'center', disablePadding: true, label: 'Bằng cấp' },
  { id: 'trial_time', align: 'center', disablePadding: true, label: 'Thời gian thử việc' },
  { id: 'sex', align: 'center', disablePadding: true, label: 'Giới tính' },
  { id: 'age', align: 'center', disablePadding: true, label: 'Tuổi' },
  { id: 'expired', align: 'center', disablePadding: true, label: 'Hạn' },
];

class EnhancedTableHead extends React.Component {

  render() {
    return (
      <TableHead>
        <TableRow>

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
    minWidth: 2500
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class RecruimentModalTable extends React.Component {

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

  render() {
    const { classes, data } = this.props;

    return (
      <Paper className={classes.root}>

        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead />
            <TableBody>
              {
                data.map(n => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={n.id}
                    >
                      <TableCell align="left" padding='none' style={{ padding: 10, fontWeight: 'bold' }}>
                        <a href={n.url} target="_blank" rel="noopener noreferrer"
                          style={{ textDecoration: 'none', outline: 'none', color: '#0060B6' }}>
                           {n.title}
                        </a>
                      </TableCell>
                      <TableCell align="left" padding='none' style={{ padding: 10 }}>{n.company}</TableCell>
                      <TableCell align="center" padding='none' style={{ padding: 10 }}>{this.handleSalary(n.salary)}</TableCell>
                      <TableCell align="center" padding='none' style={{ padding: 10 }}>{n.address}</TableCell>
                      <TableCell align="center" padding='none' style={{ padding: 10 }}>{<CareerTag items={n.career}/>}</TableCell>
                      <TableCell align="center" padding='none' style={{ padding: 10 }}>{n.experience}</TableCell>
                      <TableCell align="center" padding='none' style={{ padding: 10 }}>{n.diploma}</TableCell>
                      <TableCell align="center" padding='none' style={{ padding: 10 }}>{n.trial_time}</TableCell>
                      <TableCell align="center" padding='none' style={{ padding: 10 }}>{n.sex}</TableCell>
                      <TableCell align="center" padding='none' style={{ padding: 10 }}>{n.age}</TableCell>
                      <TableCell align="center" padding='none' style={{ padding: 10 }}>{n.expired}</TableCell>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        </div>

      </Paper>
    );
  }
}

RecruimentModalTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecruimentModalTable);