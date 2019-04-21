import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from "react-router-dom";

class DrawerLeft extends Component {
    render() {
        const { classes, theme, open, closeDrawer } = this.props;
        return (
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={closeDrawer}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button key='TRANG CHỦ' component={Link} to="/">
                        <ListItemText primary='TRANG CHỦ' />
                    </ListItem>
                    <ListItem button key='TIN TUYỂN DỤNG' component={Link} to="/recruitment-news">
                        <ListItemText primary='TIN TUYỂN DỤNG' />
                    </ListItem>
                    <ListItem button key='THỐNG KÊ' component={Link} to="/analysist">
                        <ListItemText primary='THỐNG KÊ' />
                    </ListItem>
                </List>

            </Drawer>
        )
    }
}

const drawerWidth = 240;

DrawerLeft.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    open: PropTypes.bool,
    closeDrawer: PropTypes.func
};

const styles = theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
});

export default withStyles(styles, { withTheme: true })(DrawerLeft);