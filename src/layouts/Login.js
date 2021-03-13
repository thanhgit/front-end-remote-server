import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";
import jwt from 'jwt-decode'
import jwtDecode from 'jwt-decode';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Remote server
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [isRemember, setIsRemember] = React.useState(false)

  const signIn = () => {
    console.log(email)
    console.log(password)
    console.log("Remember: " + isRemember)

    const params = new URLSearchParams();
    params.append('client_id', 'login-app');
    params.append('username', 'thanhuit');
    params.append('password', '1234')
    params.append('grant_type', 'password')

    axios.post('http://192.168.1.193/auth/realms/gokeycloak/protocol/openid-connect/token',
        params).then(res => {
        console.log(res.data)
        const access_token = res.data.access_token
        const info = jwt(access_token)
        console.log(info)
        if(info.realm_access.roles.includes("user")) {
            alert("Right")
        } else {
            alert("wrong")
        }
    }) 

    //window.location.reload()
  } 
 
  const onChange = (e, name) => {
    if(name == "email") {
        setEmail(e.target.value)
    } else if (name == "password"){
        setPassword(e.target.value)
    } else if (name == "remember") {
        setIsRemember(!isRemember)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={email}
            onChange={(e)=> onChange(e, "email")}
            id="email"
            label="Email Or Username"
            name="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={password}
            onChange={(e) => onChange(e, "password")}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me" onChange={(e) => onChange(e, "remember")}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={signIn}
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}