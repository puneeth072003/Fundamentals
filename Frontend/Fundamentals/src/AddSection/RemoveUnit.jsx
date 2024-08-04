import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import LogoImg from "../assets/plainlogo.png";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

// CustomizedDeleteDialog component
export default function CustomizedDeleteDialog({ showdeldialog, handleClose }) {
  const [open, setOpen] = React.useState(showdeldialog);
  const [selectedclass, setSelectedclass] = React.useState("");
  const [selectedsubject, setSelectedsubject] = React.useState("");
  const [unitname, setUnitname] = React.useState("");
  const [state, setState] = React.useState({
    open: false,
    Transition: Slide,
    message: "",
  });

  const handleAlertClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  const handleClassChange = (event) => {
    setSelectedclass(event.target.value);
  };

  const handleUnitChange = (event) => {
    setUnitname(event.target.value);
  };

  const handleDelete = async (Transition) => {
    if (!selectedclass || !selectedsubject || !unitname) {
      setState({
        open: true,
        Transition,
        message: "All fields are required",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/v1/deleteunit", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title2: unitname,
          class: selectedclass,
          subject: selectedsubject,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setState({
          open: true,
          Transition,
          message: data.message,
        });
      } else {
        const errorData = await response.json();
        setState({
          open: true,
          Transition,
          message: errorData.error,
        });
      }
    } catch (error) {
      setState({
        open: true,
        Transition,
        message: "An error occurred",
      });
    }
  };

  const handleSubjectChange = (event) => {
    setSelectedsubject(event.target.value);
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 ,fontFamily:"'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",color:"#1e90ff"}} id="customized-dialog-title">
        <div style={{ display: "flex", flexDirection: "row" ,alignItems:"center"}}>
            <img src={LogoImg} alt="Fundamentals-logo" style={{ width: "40px", height: "40px", marginRight: "10px" }} />
            Delete Unit
        </div>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Typography gutterBottom style={{ fontFamily:"'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",color:"black",fontSize:"19px" }}>
          It is necessary to fill in the following details in order to delete.
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label" style={{ fontFamily:"'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif"}}>Class</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={selectedclass}
            label="Class"
            onChange={handleClassChange}
            style={{ fontFamily:"'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif"}}
          >
            <MenuItem value={11} style={{ fontFamily:"'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif"}}>Class 11</MenuItem>
            <MenuItem value={12} style={{ fontFamily:"'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif"}}>Class 12</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label" style={{ fontFamily:"'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif"}}>Subject</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={selectedsubject}
            label="Class"
            onChange={handleSubjectChange}
            style={{ fontFamily:"'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif"}}
          >
            <MenuItem value={"physics"} style={{ fontFamily:"'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif"}}>Physics</MenuItem>
            <MenuItem value={"chemistry"} style={{ fontFamily:"'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif"}}>Chemistry</MenuItem>
            <MenuItem value={"maths"} style={{ fontFamily:"'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif"}}>Maths</MenuItem>
            <MenuItem value={"biology"} style={{ fontFamily:"'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif"}}>Biology</MenuItem>
          </Select>
        </FormControl>
        <br />
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "32ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Unit Name"
            variant="outlined"
            value={unitname}
            onChange={handleUnitChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => handleDelete(Slide)}
          style={{ color: "red",fontSize:"18px",fontFamily:"'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif" }}
        >
          Delete unit
        </Button>
        <Snackbar
          open={state.open}
          onClose={handleAlertClose}
          TransitionComponent={state.Transition}
          message={state.message}
          key={state.Transition.name}
          autoHideDuration={1200}
        />
      </DialogActions>
    </BootstrapDialog>
  );
}