import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import CustomizedDeleteDialog from '../AddSection/RemoveUnit';

export default function PositionedMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showdeldialog, setShowdeldialog] = React.useState(false);

  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCreateAccount = () => {
    handleClose();
    navigate('/signup');
  };

  const handleAddContent = () => {
    handleClose();
    navigate('/addsection');
  };

  const handleDeleteDialog = () => {
    setShowdeldialog(true);
    handleClose(); // Close the menu after selecting the item
  };

  const handleDialogClose = () => {
    setShowdeldialog(false);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="long-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleCreateAccount}>Create Account</MenuItem>
        <MenuItem onClick={handleAddContent}>Add Units</MenuItem>
        <MenuItem onClick={handleDeleteDialog}>Remove Unit</MenuItem>
        <MenuItem onClick={handleClose}>
          <a
            href="https://github.com/puneeth072003/Fundamentals/issues/new"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            Create Ticket
          </a>
        </MenuItem>
      </Menu>
      {showdeldialog && (
        <CustomizedDeleteDialog showdeldialog={showdeldialog} handleClose={handleDialogClose} />
      )}
    </div>
  );
}