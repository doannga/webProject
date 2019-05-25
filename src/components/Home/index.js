import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import icn_job from '../../resource/icn_job.png'
import icn_analytic from '../../resource/icn_analytic.png'
import icn_arrow from '../../resource/icn_arrow.png'
import icn_arrow2 from '../../resource/icn_arrow2.png'
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

class HomePage extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={12} className={classes.paper}>
                        <Typography variant="h4" gutterBottom className={classes.header}>
                            Tính năng nổi bật
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <img alt='' src={icn_job} width={100} height={100} className={classes.icon} />
                            <Typography component="h2" variant="headline" gutterBottom className={classes.title} style={{ color: '#1078AC' }}>
                                Cổng việc làm
                            </Typography>
                            <Typography component="h2" variant="subheading" gutterBottom className={classes.content}>
                                <img alt='' src={icn_arrow} width={35} height={25} className={classes.arrow} />
                                Ngành nghề: Là công việc chuyên môn sâu theo các ngành nghề
                            </Typography>
                            <Typography component="h2" variant="subheading" gutterBottom className={classes.content}>
                                <img alt='' src={icn_arrow} width={35} height={25} className={classes.arrow} />
                                Địa điểm: Hà Nội, Hồ Chí Minh, Đà Nẵng ...
                            </Typography>
                            <Typography component="h2" variant="subheading" gutterBottom className={classes.content}>
                                <img alt='' src={icn_arrow} width={35} height={25} className={classes.arrow} />
                                Lựa chọn mức lương hấp dẫn
                            </Typography>
                            <Button className={classes.button} component={Link} to="/recruitment-news">
                                <Typography variant="title" gutterBottom className={classes.view}>
                                    <img alt='' src={icn_arrow2} width={35} height={25} className={classes.arrow} />
                                    Tìm việc ngay
                                </Typography>
                            </Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>
                            <img alt='' src={icn_analytic} width={100} height={100} className={classes.icon} />
                            <Typography component="h2" variant="headline" gutterBottom className={classes.title} style={{ color: '#31B7D1' }}>
                                Cổng thống kê
                            </Typography>
                            <Typography component="h2" variant="subheading" gutterBottom className={classes.content}>
                                <img alt='' src={icn_arrow} width={35} height={25} className={classes.arrow} />
                                Thống kê việc làm, theo từng ngành nghề, địa điểm khu vực khác nhau
                            </Typography>
                            <Typography component="h2" variant="subheading" gutterBottom className={classes.content}>
                                <img alt='' src={icn_arrow} width={35} height={25} className={classes.arrow} />
                                Biểu đồ đa dạng
                            </Typography>
                            <Typography component="h2" variant="subheading" gutterBottom className={classes.content}>
                                <img alt='' src={icn_arrow} width={35} height={25} className={classes.arrow} />
                                Dự đoán xu thế
                            </Typography>
                            <Button className={classes.button} component={Link} to="/analysist">
                                <Typography variant="title" gutterBottom className={classes.view}>
                                    <img alt='' src={icn_arrow2} width={35} height={25} className={classes.arrow} />
                                    Xem ngay
                                </Typography>
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: 900,
        margin: '0 auto',
        textAlign: 'center'
    },
    paper: {
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.secondary,
    },
    header: {
        marginBottom: 50,
        fontWeight: 'bold',
        color: '#4054B2'
    },
    icon: {
        top: -65,
        position: 'relative'
    },
    title: {
        position: 'relative',
        top: -50,
        fontWeight: 'bold'
    },
    content: {
        textAlign: 'left',
        position: 'relative',
        top: -40
    },
    arrow: {
        marginRight: 15,
        position: 'relative',
        top: 5
    },
    view: {
        color: 'red',
        fontWeight: 'bold'
    }
});

HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);