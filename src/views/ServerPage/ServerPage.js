import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

// custom
import axios from "axios";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

function RenderServerPage(servers, ids) {
  //const classes = useStyles();

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4>Danh sách server</h4>
            <p>
              Đây là danh sách server bạn đang nắm giữ
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Tên server", "Địa chỉ IP", "Port", "User Name", "Password", "Action"]}
              tableData={servers}
              tableIds={ids}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}


class ServerPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      servers: [],
      ids: []
    }
  }

  componentDidMount() {
    axios.get("/api/servers").then((res) => {
      let _servers = []
      let _ids = []
      res.data.servers.map((item, index) => {
        _servers[index] = [item.Name, item.Ip,item.Port,item.Name,item.Password,""]
        _ids[index] = item.ID
      })

      this.setState({servers: _servers, ids: _ids})
    })
  }

  render() {
    return RenderServerPage(this.state.servers, this.state.ids)
  }
}

export default ServerPage
