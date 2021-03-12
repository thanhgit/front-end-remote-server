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
import EllipsisText from "react-ellipsis-text";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor, tableIds } = props;

  //region edit button
  var [editID, setEditID] = React.useState(-1);

  var [editUrl, setEditUrl] = React.useState("")
  var [editUsername, setEditUsername] = React.useState("")
  var [editPassword, setEditPassword] = React.useState("")
  var [editNote, setEditNote] = React.useState("")
  const [open, setOpen] = React.useState(false);

  const handleClickOpenDialogEdit = (key) => {

    setEditID(parseInt(key))
    setEditUrl(tableData[editID][0])
    setEditUsername(tableData[editID][1])
    setEditPassword(tableData[editID][2])
    setEditNote(tableData[editID][3])

    setOpen(true);
  };

  const handleCloseDialogEdit = () => {
    setOpen(false);
  };

  const handleClickEdit = (key) => {
    let body = {
      Url: editUrl,
      Username: editUsername,
      Password: editPassword,
      Note: editNote
    }

    axios.post('/api/websites/'+tableIds[editID], body).then(res => {
      console.log(res.data)
    })    

    window.location.reload();
    handleCloseDialogEdit()
  };

  //endregion 

  //region create button

  var createUrl = ""
  var createUsername = ""
  var createPassword = "" 
  var createNote = ""

  const [openCreate, setOpenCreate] = React.useState(false);

  const handleClickOpenDialogCreate = (key) => {
    setOpenCreate(true);
  };

  const handleCloseDialogCreate = () => {
    setOpenCreate(false);
  };
  const handleClickCreate = () => {
    let body = {
      Url: createUrl,
      Username: createUsername,
      Password: createPassword,
      Note: createNote
    }

    axios.post('/api/websites', body).then(res => {
    console.log(res.data)
    window.location.reload();
  })
  }
  //end region

  //region open web
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
          `${tableData[key][0]}`,
          '_blank' // <- This is what makes it open in a new window.
      );
      
    } else {
      window.open(
        `${tableData[key][0]}`,
        '_blank' // <- This is what makes it open in a new window.
      );
    }
    
  };

  //end region ssh

  const handleClickDelete = (key) => {
    axios.delete("/api/websites/"+tableIds[key])

    window.location.reload();

  };

  // utils functions
  const onChange = (e, name) => {

    if (name === "editUrl") {
      setEditUrl(e.target.value)
    }
    if (name === "editUsername") {
      setEditUsername(e.target.value)
    }
    if (name === "editPassword") {
      setEditPassword(e.target.value)
    }
    if (name === "editNote") {
      setEditNote(e.target.value)
    }

    if (name === "createUrl") {
      createUrl = e.target.value
    }
    if (name === "createUsername") {
      createUsername = e.target.value
    }
    if (name === "createPassword") {
      createPassword = e.target.value
    }
    if (name === "createNote") {
      createNote = e.target.value
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
        <DialogTitle id="form-dialog-title">Nhập thông tin để cập nhật website</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Nhập thông tin website
          </DialogContentText>
          <TextField
            autoFocus
            id="url"
            label="URL"
            type="text"
            value={editUrl}
            onChange={(e)=> onChange(e, "editUrl")}
            fullWidth
          />
          <TextField
            id="username"
            label="USER NAME"
            type="text"
            value={editUsername}
            onChange={(e)=> onChange(e, "editUsername")}
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
          <TextField
            id="note"
            label="NOTE"
            type="text"
            value={editNote}
            onChange={(e)=> onChange(e, "editNote")}
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
        <DialogTitle id="form-dialog-title-create">Nhập thông tin để  tạo website</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Nhập thông tin website 
          </DialogContentText>
          <TextField
            autoFocus
            id="url"
            label="URL"
            type="text"
            onChange={(e)=> onChange(e, "createUrl")}
            fullWidth
          />
          <TextField
            id="username"
            label="USER NAME"
            type="text"
            onChange={(e)=> onChange(e, "createUsername")}
            fullWidth
          />
          <TextField
            id="password"
            label="PASSWORD"
            type="password"
            onChange={(e)=> onChange(e, "createPassword")}
            fullWidth
          />
          <TextField
            id="note"
            label="NOTE"
            type="text"
            onChange={(e)=> onChange(e, "createNote")}
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
                      {(keyCol == 0) ? <EllipsisText text={prop} length={"50"} /> : null}
                      {(keyCol == 1) ? prop : null}
                      {(keyCol == 2) ? "********" : null}
                      {(keyCol == 3) ? prop : null}
                      {(keyCol == 4) ? <Button color="primary" className={classes.button} onClick={()=> handleClickOpenWeb(key)} >Open Web</Button> : null}
                      {(keyCol == 4) ? <Button variant="contained" color="inherit" style={{margin: "0px 30px"}} className={classes.button} onClick={()=> handleClickOpenDialogEdit(key)} onMouseEnter={() => { setEditID(key) }} >Edit</Button> : null}
                      {(keyCol == 4) ? <Button variant="contained" color="secondary" className={classes.button} onClick={()=> handleClickDelete(key)} >Delete</Button> : null}
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
