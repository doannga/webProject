import React, { PureComponent } from "react";
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

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#80CBC4', '#BA68B8'];

class CareerGroupsChart extends PureComponent {
    state = {
        selects: [],
        data: {
            options: {
                labels: [],
                colors: COLORS,
                legend: {
                    show: true,
                    position: 'top',
                    horizontalAlign: 'center',
                },
            },
            series: []
        },
        length: 5,
        isLoading: false,
    };

    componentDidMount() {
        this.getData()
    }

    getData() {
        const { selects, length } = this.state
        this.setState({
            isLoading: true
        })

        fetch("http://127.0.0.1:5000/analysist_career_groups?career_groups=" + selects + "&length=" + length, {
            method: "GET"
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);

                var labels = []
                var data = []
                result.result.forEach(item => {
                    labels.push(item.career_group)
                    data.push(item.percent)
                })
                this.setState({
                    data: {
                        options: {
                            ...data.options,
                            labels: labels,
                        },
                        series: data,
                    },
                    isLoading: false
                })

            });
    }

    handleChange = event => {
        const { value } = event.target
        const { length } = this.state
        if (value.length <= length) {
            this.setState({
                selects: value
            });
        }
    };

    onViewClicked() {
        this.getData()
    }

    render() {
        const { career_groups, classes } = this.props
        const { selects, data, isLoading } = this.state
        return (
            <center>
                <div style={{ height: 450 }}>
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
                    <div style={{ display: "flex", alignItems: "center", 'justifyContent': 'center' }}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="select-multiple-chip">Nhóm ngành nghề</InputLabel>
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
                                {career_groups.map((item, index) => (
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


                    <ReactApexChart options={data.options} series={data.series} type="pie" width={500} />
                </div>
            </center>

        )
    }
}

CareerGroupsChart.propTypes = {
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
    placeholder: {
        height: 550,
        width: `100%`,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        position: 'absolute',
        zIndex: 1,
        top: 0,
        left: 0,
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


export default withStyles(styles, { withTheme: true })(CareerGroupsChart);