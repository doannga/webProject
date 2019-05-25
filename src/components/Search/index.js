import React from "react";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import InputBase from "@material-ui/core/InputBase";
import Fab from "@material-ui/core/Fab";
import {
  Search,
  LocationOn,
  Menu,
  AttachMoney,
  GroupWork
} from "@material-ui/icons";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const BootstrapInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing.unit * 3
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing.unit
  },
  bootstrapFormLabel: {
    fontSize: 18
  },
});

class CustomizedSelects extends React.Component {

  handleChange = event => {
    this.setState({ age: event.target.value });
  };

  render() {
    const { classes, careers, career_groups, tinh_thphos, onViewClicked, careerChanged, addressChanged,
      salaryChanged, expChanged, textChanged, onSearchClicked, onCareerGroupChanged,
      careerValue, careerGroupValue, addressValue, salaryValue, expValue, onInputKeyDown } = this.props;

    return (
      <form className={classes.root} autoComplete="off" onSubmit={(e)=> {
        e.preventDefault()
      }}>
        <FormControl className={classes.margin} style={{ width: 200 }} >
          <InputLabel
            htmlFor="age-customized-native-simple"
            className={classes.bootstrapFormLabel}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Menu />
            Chọn nhóm ngành
          </InputLabel>
          <Select input={<BootstrapInput />}
            onChange={onCareerGroupChanged}
            value={careerGroupValue}>
            <MenuItem value="-1" key="-1">
              Tất cả
            </MenuItem>

            {
              career_groups.map((value, index) => {
                return (
                  <MenuItem value={value} key={index}>
                    {value}
                  </MenuItem>
                );
              })
            }
          </Select>
        </FormControl>
        <FormControl className={classes.margin} style={{ width: 200 }}>
          <InputLabel
            htmlFor="age-customized-native-simple"
            className={classes.bootstrapFormLabel}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Menu />
            Chọn ngành nghề
          </InputLabel>
          <Select input={<BootstrapInput />} onChange={careerChanged}
            value={careerValue}>
            <MenuItem value="-1" key="-1">
              Tất cả
            </MenuItem>
            {careers.map((value, index) => {
              return (
                <MenuItem value={value} key={index}>
                  {value}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl className={classes.margin} style={{ width: 200 }}>
          <InputLabel
            htmlFor="age-customized-native-simple"
            className={classes.bootstrapFormLabel}
            style={{ display: "flex", alignItems: "center" }}
          >
            <LocationOn />
            Chọn tỉnh thành
          </InputLabel>
          <Select input={<BootstrapInput />} onChange={addressChanged} value={addressValue}>
            <MenuItem value="-1" key="-1">
              Tất cả
            </MenuItem>
            {tinh_thphos.map((value, index) => {
              return (
                <MenuItem value={value} key={index}>
                  {value}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl className={classes.margin} style={{ width: 200 }}>
          <InputLabel
            htmlFor="age-customized-native-simple"
            className={classes.bootstrapFormLabel}
            style={{ display: "flex", alignItems: "center" }}
          >
            <AttachMoney />
            Chọn mức lương
          </InputLabel>
          <Select input={<BootstrapInput />} onChange={salaryChanged} value={salaryValue}>
            <MenuItem value='-1' key={-1}>Tất cả mức lương</MenuItem>
            <MenuItem value="1000000-3000000" key={0}>1 - 3 triệu</MenuItem>
            <MenuItem value="4000000-7000000" key={1}>4 - 7 triệu</MenuItem>
            <MenuItem value="8000000-12000000" key={2}>8 - 12 triệu</MenuItem>
            <MenuItem value="13000000-20000000" key={3}>13 - 20 triệu</MenuItem>
            <MenuItem value="20000000-9999999999999" key={4}>Trên 20 triệu</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.margin} style={{ width: 200 }}>
          <InputLabel
            htmlFor="age-customized-native-simple"
            className={classes.bootstrapFormLabel}
            style={{ display: "flex", alignItems: "center" }}
          >
            <GroupWork />
            Chọn kinh nghiem
          </InputLabel>
          <Select input={<BootstrapInput />} onChange={expChanged} value={expValue}>
            <MenuItem value='-1' key={-1}>Tất cả kinh nghiệm</MenuItem>
            <MenuItem value='Không yêu cầu' key={0}>Không yêu cầu</MenuItem>
            <MenuItem value='Dưới 1 năm' key={1}>Dưới 1 năm</MenuItem>
            <MenuItem value='1 năm' key={2}>1 năm</MenuItem>
            <MenuItem value='2 năm' key={3}>2 năm</MenuItem>
            <MenuItem value='3 năm' key={4}>3 năm</MenuItem>
            <MenuItem value='4 năm' key={5}>4 năm</MenuItem>
            <MenuItem value='Trên 5 năm' key={6}>Trên 5 năm</MenuItem>
          </Select>
        </FormControl>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <FormControl
            className={classes.margin}
            style={{ width: 350, margin: "0px 8px" }}
          >
            <InputLabel
              htmlFor="age-customized-select"
              className={classes.bootstrapFormLabel}
              style={{
                display: "flex",
                alignItems: "center"
              }}
            >
              Tìm kiếm nâng cao
            </InputLabel>
            <BootstrapInput onChange={textChanged} onKeyDown={onInputKeyDown} />
          </FormControl>
          <Fab variant="extended" aria-label="Delete" className={classes.fab}
            onClick={onSearchClicked}>
            <Search />
            Tìm kiếm
          </Fab>
          <Fab variant="extended" aria-label="Delete" className={classes.fab}
            style={{ marginLeft: 20, width: 150 }}
            onClick={onViewClicked}>
            Xem chi tiết
          </Fab>
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(CustomizedSelects);
