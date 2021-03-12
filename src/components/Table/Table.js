import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from '@material-ui/core/Button';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import axios from "axios";

// add custom
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ContactsOutlined } from "@material-ui/icons";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor, tableIds } = props;

  //region edit button
  var [editID, setEditID] = React.useState(-1);

  var [editUser, setEditUser] = React.useState("")
  var [editIp, setEditIp] = React.useState("")
  var [editPort, setEditPort] = React.useState("")
  var [editPassword, setEditPassword] = React.useState(0)
  const [open, setOpen] = React.useState(false);

  const handleClickOpenDialogEdit = (key) => {
    editID = key
    setEditUser(tableData[editID][0])
    setEditIp(tableData[editID][1])
    setEditPort(parseInt(tableData[editID][2]))
    setEditPassword(tableData[editID][3])
    setOpen(true);
  };

  const handleCloseDialogEdit = () => {
    setOpen(false);
  };

  const handleClickEdit = (key) => {
    let body = {
      Name: editUser,
      Ip: editIp,
      Port: editPort,
      Password: editPassword
    }

    axios.post('/api/servers/'+tableIds[editID], body).then(res => {
      console.log(res.data)
      
    })    
    window.location.reload();
    handleCloseDialogEdit()
  };

  //endregion 

  //region create button

  var createUser = ""
  var createIp = ""
  var createPort = "" 
  var createPassword = ""

  const [openCreate, setOpenCreate] = React.useState(false);

  const handleClickOpenDialogCreate = (key) => {
    setOpenCreate(true);
    console.log(tableData)
  };

  const handleCloseDialogCreate = () => {
    setOpenCreate(false);
  };
  const handleClickCreate = () => {
    let body = {
      Name: createUser,
      Ip: createIp,
      Port: createPort,
      Password: createPassword
    }

    axios.post('/api/servers', body).then(res => {
    console.log(res.data)
    window.location.reload();
  })
  }
  //end region
  
  //region open ssh
  const handleClickOpenWeb = (key) => {
    var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'],
      os = null;

    if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'Windows';
      window.open(
          `http://${tableData[key][3]}:${tableData[key][4]}@127.0.0.1:2222/ssh/host/${tableData[key][1]}?port=${tableData[key][2]}&header=${tableData[key][1]}&headerBackground=red`,
          '_blank' // <- This is what makes it open in a new window.
      );
      
    } else {
      window.open(
        `http://${tableData[key][3]}:${tableData[key][4]}@127.0.0.1:2222/ssh/host/${tableData[key][1]}?port=${tableData[key][2]}&header=${tableData[key][1]}&headerBackground=red`,
        '_blank' // <- This is what makes it open in a new window.
      );
    }
    
    //window.location.href = `http://localhost:2222/ssh/host/${tableData[key][1]}?port=${tableData[key][2]}&header=My%20Header&headerBackground=red`
  };

  //end region ssh

  const handleClickDelete = (key) => {
    axios.delete("/api/servers/"+tableIds[key])

    window.location.reload();

  };

  // utils functions
  const onChange = (e, name) => {

    if (name === "editUser") {
      setEditUser(e.target.value)
    }
    if (name === "editIp") {
      setEditIp(e.target.value)
    }
    if (name === "editPort") {
      setEditPort(e.target.value)
    }
    if (name === "editPassword") {
      setEditPassword(e.target.value)
    }

    if (name === "createUser") {
      createUser = e.target.value
    }
    if (name === "createIp") {
      createIp = e.target.value
    }
    if (name === "createPort") {
      createPort = e.target.value
    }
    if (name === "createPassword") {
      createPassword = e.target.value
    }
  }



  return (
    <div className={classes.tableResponsive}>
      <div style={{float: "right", padding: "0px 20px"}}>
        <Fab color="primary" aria-label="add" className={{...classes.fab}} onClick={()=> handleClickOpenDialogCreate()}>
          <AddIcon />
        </Fab>
      </div>
      <Dialog open={open} onClose={handleCloseDialogEdit} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Nhập thông tin để cập nhật server</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Nhập thông tin server 
          </DialogContentText>
          <TextField
            autoFocus
            id="username"
            label="USER NAME"
            type="text"
            value={editUser}
            onChange={(e)=> onChange(e, "editUser")}
            fullWidth
          />
          <TextField        
            id="ip"
            label="IP"
            type="text"
            value={editIp}
            onChange={(e)=> onChange(e, "editIp")}
            fullWidth
          />
          <TextField
            id="port"
            label="PORT"
            type="number"
            value={editPort}
            onChange={(e)=> onChange(e, "editPort")}
            fullWidth
          />
          <TextField
            id="password"
            label="PASSWORD"
            type="password"
            value={editPassword}
            onChange={(e)=> onChange(e, "editPassword")}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseDialogEdit()} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleClickEdit()} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      
      <Dialog open={openCreate} onClose={handleCloseDialogCreate} aria-labelledby="form-dialog-title-create">
        <DialogTitle id="form-dialog-title-create">Nhập thông tin để  tạo server</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Nhập thông tin server 
          </DialogContentText>
          <TextField
            autoFocus
            id="username"
            label="USER NAME"
            type="text"
            onChange={(e)=> onChange(e, "createUser")}
            fullWidth
          />
          <TextField
            id="ip"
            label="IP"
            type="text"
            onChange={(e)=> onChange(e, "createIp")}
            fullWidth
          />
          <TextField
            id="port"
            label="PORT"
            type="number"
            onChange={(e)=> onChange(e, "createPort")}
            fullWidth
          />
          <TextField
            id="password"
            label="PASSWORD"
            type="password"
            onChange={(e)=> onChange(e, "createPassword")}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseDialogCreate()} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleClickCreate()} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow} >
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow} hover>
                {prop.map((prop, keyCol) => {
                  return (
                    <TableCell className={classes.tableCell} key={keyCol}>
                      {(keyCol == 4) ? "******" : prop}
                      {(keyCol == 5) ? <Button color="primary" className={classes.button} onClick={()=> handleClickOpenWeb(key)} >Open Web SSH</Button> : null}
                      {(keyCol == 5) ? <Button variant="contained" color="inherit" style={{margin: "0px 30px"}} className={classes.button} onClick={()=> handleClickOpenDialogEdit(key)} onMouseEnter={() => { setEditID(key) }} >Edit</Button> : null}
                      {(keyCol == 5) ? <Button variant="contained" color="secondary" className={classes.button} onClick={()=> handleClickDelete(key)} >Delete</Button> : null}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
