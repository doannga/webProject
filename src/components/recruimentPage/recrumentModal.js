import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import RecruimentModalTable from './recruiment-modal-table'

class RecrumentModal extends Component {

  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.escFunction = this.escFunction.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    document.addEventListener("keydown", this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    document.removeEventListener("keydown", this.escFunction, false);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    const { closeModal } = this.props
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      closeModal()
    }
  }

  escFunction(event){
    const { closeModal } = this.props
    if(event.keyCode === 27) {
      //Do whatever when esc is pressed
      closeModal()
    }
  }

  render() {
    const { classes, recruments, isOpen } = this.props
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={isOpen}
        
      >
        <div className={classes.paper} ref={this.setWrapperRef}>
          <RecruimentModalTable data={recruments} />
        </div>
      </Modal>
    );
  }
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: 1000,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    outline: 'none',
  },
});

RecrumentModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecrumentModal);