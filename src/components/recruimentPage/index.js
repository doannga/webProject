import React, { Component } from "react";
import Search from "../Search";
import RecrumentModal from './recrumentModal'
import RecruimentTable from './recruiment-table'
import PropTypes from 'prop-types';
import Fade from '@material-ui/core/Fade';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

class RecuimentPage extends Component {

  constructor(props) {
    super(props);

    this.handleChangePage = this.handleChangePage.bind(this)
    this.onHandleItemSelected = this.onHandleItemSelected.bind(this)

    this.state = {
      error: null,
      isLoading: false,
      items: [],
      career_groups: [],
      careers: [],
      tinh_thphos: [],
      selects: [],
      limitSelect: 5,
      openModal: false,
      offset: 0,
      limit: 10,
      totalSize: 0,
      page: 0,
      searchParams: {
        career_group: "-1",
        career: "-1",
        address: "-1",
        salary: "-1",
        exp: "-1",
        query: ""
      },
      clearSelected: false
    }

  }

  componentDidMount() {

    this.getRecruimentsPerOffset()

    fetch("http://127.0.0.1:5000/career_groups", { method: "GET" })
      .then(res => res.json())
      .then(
        result => {
          console.log("result: ", result);
          this.setState({
            career_groups: result.result
          }, () => {
            this.setState({
              careers: this.getCareersInCareerGroup()
            })
          });
        }
      );



    fetch("http://127.0.0.1:5000/tinh_tpho", { method: "GET" })
      .then(res => res.json())
      .then(
        result => {
          console.log("result: ", result);
          this.setState({
            tinh_thphos: result.result
          });
        }
      );
  }

  getCareersInCareerGroup = () => {
    var { searchParams, career_groups } = this.state
    var careers = []
    if (Number(searchParams.career_group) === -1) {
      career_groups.forEach(item => {
        careers = careers.concat(item.careers)
      });
    } else {
      career_groups.forEach(item => {
        if (searchParams.career_group === item.name) {
          console.log(item.careers);
          careers = careers.concat(item.careers)
        }
      });
    }
    return careers
  }

  getCareerGroups = (result) => {
    var career_groups = []
    result.forEach(item => {
      career_groups.push(item.name)
    });
    return career_groups
  }

  getRecruimentsPerOffset() {
    const { limit, page, searchParams } = this.state
    const { career_group, career, address, salary, exp, query } = searchParams

    this.setState({
      isLoading: true
    })

    fetch("http://127.0.0.1:5000/search_recruitments?limit=" + limit
      + "&page=" + page
      + "&career_group=" + (career_group !== '-1' ? career_group : '')
      + "&career=" + (career !== '-1' ? career : '')
      + "&address=" + (address !== '-1' ? address : '')
      + "&salary=" + (salary !== '-1' ? salary : '')
      + "&exp=" + (exp !== '-1' ? exp : '')
      + "&query=" + query
      , {
        method: "GET"
      })
      .then(res => res.json())
      .then(
        result => {
          console.log("result: ", result);
          this.setState({
            isLoading: false,
            items: result.result,
            totalSize: result.total_size
          });
        },
        error => {
          this.setState({
            isLoading: false,
            error
          });
        }
      );
  }

  onHandleItemSelected = (items) => {
    this.setState({
      selects: items
    })

  }

  handleOpenModal = () => {
    if (this.state.selects.length > 0) {
      this.setState({
        openModal: true,
      });
    }
  };

  handleCloseModal = () => {
    this.setState({
      openModal: false,
      clearSelected: true
    }, () => {
      this.setState({
        clearSelected: false
      })

    });
  };

  handleChangePage = (event, index) => {
    const { page, offset, limit } = this.state
    this.setState({
      offset: page > index ? (offset - limit) : (limit + offset),
      page: index
    }, () => {
      this.getRecruimentsPerOffset()
    })
  };

  handleCareerGroupChanged = (event) => {
    var { searchParams } = this.state

    this.setState({
      searchParams: {
        ...searchParams,
        career_group: event.target.value,
        career: '-1'
      },
      defaultValueCarrer: 'Tất cả'
    }, () => {
      this.setState({
        careers: this.getCareersInCareerGroup()
      })
    })
  }

  handleCareerChanged = (event) => {
    var { searchParams } = this.state
    this.setState({
      searchParams: {
        ...searchParams,
        career: event.target.value
      },
      defaultValueCarrer: event.target.value
    })
  }

  handleAddressChanged = (event) => {
    var { searchParams } = this.state
    this.setState({
      searchParams: {
        ...searchParams,
        address: event.target.value
      }
    })
  }

  handleSalaryChanged = (event) => {
    var { searchParams } = this.state
    this.setState({
      searchParams: {
        ...searchParams,
        salary: event.target.value
      }
    })
  }

  handleExpChanged = (event) => {
    var { searchParams } = this.state
    this.setState({
      searchParams: {
        ...searchParams,
        exp: event.target.value
      }
    })
  }

  handleTextChanged = (event) => {
    var { searchParams } = this.state
    this.setState({
      searchParams: {
        ...searchParams,
        query: event.target.value
      }
    })
  }

  onSearchClicked = () => {
    let { searchParams } = this.state
    console.log('search params: ', searchParams);

    this.setState({
      page: 0
    }, () => {
      this.getRecruimentsPerOffset()
    })

  }

  onInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      let { searchParams } = this.state
      console.log('search params: ', searchParams);
      this.getRecruimentsPerOffset()
    }
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      console.log('aaaa')
    }
  }

  render() {
    const { isLoading, items, careers, tinh_thphos, openModal, selects, limit,
      totalSize, page, career_groups, searchParams, clearSelected } = this.state;
    const { classes } = this.props;
    return (
      <div>
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

        <ul style={{ padding: 0 }}>
          <Search
            tinh_thphos={tinh_thphos}
            career_groups={this.getCareerGroups(career_groups)}
            careers={careers}
            onViewClicked={this.handleOpenModal.bind(this)}
            onCareerGroupChanged={this.handleCareerGroupChanged.bind(this)}
            careerChanged={this.handleCareerChanged.bind(this)}
            addressChanged={this.handleAddressChanged.bind(this)}
            salaryChanged={this.handleSalaryChanged.bind(this)}
            expChanged={this.handleExpChanged.bind(this)}
            textChanged={this.handleTextChanged.bind(this)}
            onSearchClicked={this.onSearchClicked.bind(this)}
            careerValue={searchParams.career}
            careerGroupValue={searchParams.career_group}
            addressValue={searchParams.address}
            salaryValue={searchParams.salary}
            expValue={searchParams.exp}
            onInputKeyDown={this.onInputKeyDown.bind(this)}
          />
          <br />
          <RecruimentTable
            style={{ marginRight: 20 }}
            data={items}
            totalSize={totalSize}
            page={page}
            rowsPerPage={limit}
            handleChangePage={this.handleChangePage}
            onHandleItemChecked={this.onHandleItemSelected}
            clearSelected={clearSelected}
          />
        </ul>
        <RecrumentModal isOpen={openModal} recruments={selects}
          closeModal={() => {
            this.handleCloseModal()
          }}
        />
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing.unit * 2,
  },
  placeholder: {
    height: `100%`,
    width: `100%`,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'fixed',
    zIndex: 999999999,
    top: 0,
    left: 0,
  },
  loaded: {
    height: 40,
    width: 40,
    top: `50%`,
    left: `50%`,
    marginTop: -20,
    marginLeft: -20,
    position: 'relative'
  }
});

RecuimentPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecuimentPage);