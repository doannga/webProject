import React, { PureComponent } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  }
];

function getStyles(name, that) {
  return {
    fontWeight:
      that.state.selects.indexOf(name) === -1
        ? that.props.theme.typography.fontWeightRegular
        : that.props.theme.typography.fontWeightMedium,
  };
}

class CareerGroupsBar extends PureComponent {

  state = {
    selects: [],
  };

  handleChange = event => {
    const { value } = event.target
    if (value.length <= 5) {
      this.setState({ selects: value });
    }
  };

  render() {
    const { careers, classes } = this.props
    const { selects } = this.state
    return (
      <center>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple-chip">Ngành nghề</InputLabel>
          <Select
            multiple
            value={selects}
            onChange={this.handleChange}
            input={<Input id="select-multiple-chip" />}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {careers.map((item, index) => (
              <MenuItem key={index} value={item} style={getStyles(item, this)}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <BarChart
          width={1200}
          height={500}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" />
          {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
        </BarChart>
      </center>
    );
  }
}

CareerGroupsBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 450,
    maxWidth: 800,
    marginBottom: 20
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3,
  },
});


export default withStyles(styles, { withTheme: true })(CareerGroupsBar);