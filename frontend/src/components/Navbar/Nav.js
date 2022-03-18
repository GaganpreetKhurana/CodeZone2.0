import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import { logoutUser } from "../actions/auth";
// import Avatar from '@mui/material/Avatar';
import logo from "../../static/logo.png";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import { Paper } from "@mui/material";
import {CssBaseline} from '@mui/material';
// import HowToRegIcon from "@mui/icons-material/HowToReg";
// import LogoutIcon from "@mui/icons-material/Logout";
class Nav extends React.Component {
  state = {
    create: false,
    join: false,
  };
  logout = () => {
    localStorage.removeItem("token");
    // this.props.dispatch(logoutUser());
  };
  toggleCreateButton = () => {
    this.setState({
      create: !this.state.create,
    });
  };
  toggleJoinButton = () => {
    this.setState({
      join: !this.state.join,
    });
  };

  render() {
    // const { auth } = this.props;
    return (
      <>
        <CssBaseline />
        <Paper elevation={7}>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ background: "#0053A7" }}>
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <Link to="/">
                    <img src={logo} alt="logo" width="150" height="50" />
                  </Link>
                </Typography>

                {/* {!auth.isLoggedIn && ( */}
                {true && (
                  <Button>
                    <Link to="/login" id="login-button">
                      <LoginIcon color="action" fontSize="small" />
                    </Link>
                  </Button>
                )}
                {/* {auth.isLoggedIn && (
                <Button onClick={this.logout}>
                  <Link to="/" id="logout-button">
                    <LogoutIcon color="action" fontSize="small" />
                  </Link>
                </Button>
              )} */}

                {/* {auth.isLoggedIn && (
                <div>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                  >
                    <Grid item m={0.25}>
                      <Link to="/settings" id="profile-settings">
                        <Avatar
                          src={auth?.user?.avatar}
                          sx={{ width: 35, height: 35 }}
                          id="profile-page"
                        />
                      </Link>
                    </Grid>
                  </Grid>
                </div>
              )} */}
              </Toolbar>
            </AppBar>
          </Box>
        </Paper>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    // auth: state.auth,
  };
}

export default connect(mapStateToProps)(Nav);
