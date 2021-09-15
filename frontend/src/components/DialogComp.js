import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import Service from "../service";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, addOrder } = props;
  return (
    <MuiDialogTitle id="customized-dialog-title">
      {children}
      <IconButton className={classes.closeButton} onClick={addOrder}>
        <AddCircleOutlineIcon color="primary" />
      </IconButton>
    </MuiDialogTitle>
  );
});

const DialogComp = ({ id, isOpen, closeDialog }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    Service.getOrders(id)
      .then((res) => setOrders(res.data))
      .catch((e) => console.log(e));
  }, []);

  const addOrder = () => {
    setOrders([
      ...orders,
      {
        _id: new Date().getTime(),
        id,
        message: "",
      },
    ]);
  };

  const editMessage = (e, idx) => {
    const newData = [...orders];
    newData[idx].message = e.target.value;
    setOrders(newData);
  };

  const deleteMessage = (id) => {
    setOrders(orders.filter((item) => item._id !== id));
  };

  const postData = async () => {
    try {
      if (orders.length === 0) await Service.deleteOrders(id);
      else await Service.updateOrders(orders);
      closeDialog();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Dialog
        onClose={closeDialog}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <DialogTitle addOrder={addOrder}>Orders</DialogTitle>
        <DialogContent>
          {orders.map((order, idx) => (
            <div
              key={order._id}
              style={{ display: "flex", alignItems: "center" }}
            >
              <TextField
                style={{ margin: "0.2rem 0" }}
                id="outlined-basic"
                label="Message"
                value={order.message}
                fullWidth
                onChange={(e) => editMessage(e, idx)}
              />
              <IconButton
                style={{ marginLeft: "1rem", marginTop: "20px" }}
                onClick={() => deleteMessage(order._id)}
              >
                <DeleteIcon color="primary" />
              </IconButton>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={closeDialog}>
            Back
          </Button>
          <div>
            <Button variant="outlined" onClick={postData} color="primary">
              Save
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogComp;
