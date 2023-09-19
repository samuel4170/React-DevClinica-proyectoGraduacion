import React from 'react';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton({ onLogout }) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate(); 

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    handleClose();
    navigate('/iniciosesion/new'); // Redirige a la página deseada después de cerrar sesión
  };

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'Left'}}>
    <IconButton color="primary" onClick={handleOpen}>
        <ExitToAppIcon />
    </IconButton>
    </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>¿Desea salir del sistema?</DialogTitle>
        <DialogContent>
          Se cerrará la sesión actual. Si desea continuar, haga clic en "Cerrar sesión".
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleLogout} color="primary">
            Cerrar sesión
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

