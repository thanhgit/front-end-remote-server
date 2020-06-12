import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/TableForWebsite.js";
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

function RenderQuicklyAccess(websites, ids) {
  //const classes = useStyles();

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4>Danh sách Websites</h4>
            <p>
              Đây là danh sách các website cần quản lý 
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Url", "User name", "Password", "Note","Action"]}
              tableData={websites}
              tableIds={ids}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}


class QuicklyAccess extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      websites: [],
      ids: []
    }
  }

  componentDidMount() {
    axios.get("/api/websites").then((res) => {
      let _websites = []
      let _ids = []
      res.data.websites.map((item, index) => {
        _websites[index] = [item.Url, item.Username,item.Password,item.Note,""]
        _ids[index] = item.ID
      })

      this.setState({websites: _websites, ids: _ids})
    })
  }

  render() {
    return RenderQuicklyAccess(this.state.websites, this.state.ids)
  }
}

export default QuicklyAccess
