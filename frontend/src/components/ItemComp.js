import React, { useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AirlineSeatIndividualSuiteIcon from "@material-ui/icons/AirlineSeatIndividualSuite";
import DialogComp from "./DialogComp";

const ItemComp = ({ data }) => {
  const { id, name } = data;
  const [open, setOpen] = useState(false);

  const openDialog = () => setOpen(true);

  const closeDialog = () => setOpen(false);

  return (
    <>
      <ListItem button divider onClick={openDialog}>
        <ListItemIcon>
          <AirlineSeatIndividualSuiteIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItem>
      {open && <DialogComp id={id} isOpen={open} closeDialog={closeDialog} />}
    </>
  );
};

export default ItemComp;
