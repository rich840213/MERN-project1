import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ItemComp from "./ItemComp";
import Service from "../service";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    maxWidth: 360,
  },
}));

const ListComp = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    Service.getPatients()
      .then((res) => setPatients(res.data))
      .catch((e) => console.log(e));
  }, []);

  const classes = useStyles();

  return (
    <div>
      <List
        component="nav"
        className={classes.root}
        aria-label="mailbox folders"
      >
        {patients.map((item) => (
          <ItemComp key={item.id} data={item} />
        ))}
      </List>
    </div>
  );
};

export default ListComp;
