import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import ReactApexChart from 'react-apexcharts'
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#80CBC4', '#BA68B8'];

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

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
    data: {
      options: {
        xaxis: {
          categories: []
        },
        colors: COLORS
      },
      series: [{
        name: '',
        data: []
      }]
    },
    length: 10,
    addressSelect: [],
    isLoading: false,
  };

  componentDidMount() {
    this.getData()
  }

  getData() {
    const { selects, length, addressSelect } = this.state
    this.setState({
      isLoading: true
    })
    fetch("http://127.0.0.1:5000/analysist_careers?careers=" + selects + "&addresses=" + addressSelect + "&length=" + length, {
      method: "GET"
    })
      .then(res => res.json())
      .then(result => {
        var categories = []
        var data = []
        console.log(result);

        if (result.result.type === 1) {
          categories = Object.values(result.result.data).map(value => value.career)
          data = Object.values(result.result.data).map(value => value.size)

          this.setState({
            data: {
              options: {
                xaxis: {
                  categories: categories
                },
                colors: COLORS
              },
              series: [{
                name: 'Số lượng',
                data: data
              }]
            },
            isLoading: false
          })
        } else if (result.result.type === 2) {
          categories = Object.values(result.result.data).map(value => value.address)
          data = Object.values(result.result.data).map(value => value.size)
          this.setState({
            data: {
              options: {
                xaxis: {
                  categories: categories
                },
                colors: COLORS
              },
              series: [{
                name: 'Số lượng',
                data: data
              }]
            },
            isLoading: false
          })
        } else {
          categories = Object.values(result.result.data[0].careers).map(value => value.career)
          data = Object.values(result.result.data).map((value, index) => {
            return {
              name: value.address,
              data: Object.values(value.careers).map(item => item.size)
            }
          })
          this.setState({
            data: {
              options: {
                xaxis: {
                  categories: categories
                },
                colors: COLORS
              },
              series: data
            },
            isLoading: false
          })
        }
      });
  }

  handleChange = event => {
    const { value } = event.target
    const { length } = this.state
    if (value.length <= length) {
      this.setState({ selects: value });
    }
  };

  handleAddressChange = event => {
    const { value } = event.target
    if (value.length <= 2) {
      this.setState({ addressSelect: value });
    }
  };

  onViewClicked() {
    this.getData()
  }


  render() {
    const { careers, classes, address } = this.props
    const { selects, data, addressSelect, isLoading } = this.state
    return (
      <center style={{ height: 450, marginTop: 150 }}>
        <div className={classes.root} style={{ display: 'flex', alignItems: "center", 'justifyContent': 'center' }}>
          {
            isLoading ?
              <div className={classes.placeholder}>
                <Fade
                  in={true}
                  style={{
                    transitionDelay: '0ms',
                  }}
                  unmountOnExit
                  color="secondary"
                  className={classes.loaded}
                >
                  <CircularProgress />
                </Fade>
              </div> : null
          }
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
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="select-multiple-chip">Tỉnh/Thành phố</InputLabel>
            <Select
              multiple
              value={addressSelect}
              onChange={this.handleAddressChange}
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
              {address.map((item, index) => (
                <MenuItem key={index} value={item} style={getStyles(item, this)}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" className={classes.button} onClick={this.onViewClicked.bind(this)}>
            Xem
      </Button>
        </div>

        <ReactApexChart options={data.options} series={data.series} type="bar" height={400} />

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
    minWidth: 300,
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
  placeholder: {
    height: 500,
    width: `100%`,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    marginBottom: 100
  },
  loaded: {
    height: 40,
    width: 40,
    top: `50%`,
    marginTop: -20,
    position: 'relative'
  },
  button: {
    margin: theme.spacing.unit,
    width: 100
  },
});


export default withStyles(styles, { withTheme: true })(CareerGroupsBar);