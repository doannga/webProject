import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },

});

function CareerTag(props) {
  const { classes, items } = props;
  return (
    <div className={classes.root}>
      {
        items.map((item, index) => <Chip label={item} key={index} className={classes.chip} style={{ margin: 5 }} />)
      }
    </div>
  );
}

CareerTag.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CareerTag);