import React from 'react';
import { Divider, AppBar, Box, Button, Container, Drawer, List, ListItem, ListItemText, Toolbar, Typography, Collapse } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutButton from './Cerrarsesion/LogoutButton';

export default function Navbar({ isLoggedIn, onLogout, userName  }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [pacientesOpen, setPacientesOpen] = React.useState(false);
  const [medicosOpen, setMedicosOpen] = React.useState(false);
  const [citasOpen, setCitasOpen] = React.useState(false);
  const [horarioOpen, sethorarioOpen] = React.useState(false);
  const [especialidadOpen, setespecialidadOpen] = React.useState(false);
  const [diaOpen, setdiaOpen] = React.useState(false);
  const [welcomeOpen, setwelcomeOpen] = React.useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const togglePacientes = () => {
    setPacientesOpen(!pacientesOpen);
  };

  const toggleMedicos = () => {
    setMedicosOpen(!medicosOpen);
  };

  const toggleCitas = () => {
    setCitasOpen(!citasOpen);
  };

  const toggleespecialidad = () => {
    setespecialidadOpen(!especialidadOpen);
  };

  const togglehorario = () => {
    sethorarioOpen(!horarioOpen);
  };

  const toggledia = () => {
    setdiaOpen(!diaOpen);
  };

  const togglewelcome = () => {
    setwelcomeOpen(!welcomeOpen);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>

      <AppBar position="sticky" color="transparent">
         <Container>
           <Toolbar>
             {isLoggedIn ? (
              <>  
                <Button
                  onClick={toggleMenu}
                  color="primary"
                  variant="contained"
                  style={{ 
                  marginRight: '.5rem' 
                
                  }}
                >
                  <MenuIcon />
                </Button>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                 Bienvenido, {userName}
                </Typography>
                <LogoutButton onLogout={onLogout} />
              </>
            ) : null}
          </Toolbar>
        </Container>
      </AppBar>
      
      {isLoggedIn ? (
        <Drawer
          anchor="left"
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          PaperProps={{ style: { width: '250px' } }}
        >
          <List>
            <ListItem>
              <ListItemText
                disableTypography
                primary={
                  <Typography
                    variant="h6"
                    style={{ textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase' }}
                  >
                    Menú
                  </Typography>
                }
              />
            </ListItem>
            <div
                  style={{
                    backgroundImage: 'url(https://cdn-icons-png.flaticon.com/128/4193/4193443.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '40%',
                    height: '10vh',
                    display: 'flex',
                    margin: 'auto',
                  }}
            />

            <ListItem button onClick={togglePacientes}
             sx={{ backgroundColor: 'grey' }}>
              <ListItemText primary="Pacientes" />
            </ListItem>

            <Divider sx={{ marginY: '0.5rem' }} />

            <Collapse in={pacientesOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>

                <ListItem button onClick={() => handleMenuItemClick('/ver/paciente')}
                sx={{ backgroundColor: '#D3DCCB', borderRadius: '10px' }}>
                  <ListItemText style={{ paddingLeft: '16px' }} primary="Ver Paciente" />
                </ListItem>

                <Divider sx={{ marginY: '0.05rem' }} /> {/* Línea divisora */}

                <ListItem button onClick={() => handleMenuItemClick('/paciente/new')}
                sx={{ backgroundColor: '#D3DCCB', borderRadius: '10px' }}>
                  <ListItemText style={{ paddingLeft: '16px' }} primary="Agregar Paciente" />
                </ListItem>

              </List>
            </Collapse>

            <ListItem button onClick={toggleMedicos}
             sx={{ backgroundColor: 'grey' }}>
              <ListItemText primary="Medicos" />
            </ListItem>

            <Divider sx={{ marginY: '0.5rem' }} />

            <Collapse in={medicosOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>

                <ListItem button onClick={() => handleMenuItemClick('/ver/medico')}
                sx={{ backgroundColor: '#D3DCCB', borderRadius: '10px' }}>
                  <ListItemText style={{ paddingLeft: '16px' }} primary="Ver medicos" />
                </ListItem>

                <Divider sx={{ marginY: '0.05rem' }} /> {/* Línea divisora */}

                <ListItem button onClick={() => handleMenuItemClick('/medico/new')}
                sx={{ backgroundColor: '#D3DCCB', borderRadius: '10px' }}>
                  <ListItemText style={{ paddingLeft: '16px' }} primary="Agregar medicos" />
                </ListItem>

              </List>
            </Collapse>


            <ListItem button onClick={toggleCitas}
             sx={{ backgroundColor: 'grey' }}>
              <ListItemText primary="Citas" />
            </ListItem>

            <Divider sx={{ marginY: '0.5rem' }} />

            <Collapse in={citasOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>

              <ListItem button onClick={() => handleMenuItemClick('/ver/cita')}
                sx={{ backgroundColor: '#D3DCCB', borderRadius: '10px' }}>
                  <ListItemText style={{ paddingLeft: '16px' }} primary="Ver Citas" />
                </ListItem>

                <Divider sx={{ marginY: '0.05rem' }} /> {/* Línea divisora */}

                <ListItem button onClick={() => handleMenuItemClick('/cita/new')}
                sx={{ backgroundColor: '#D3DCCB', borderRadius: '10px' }}>
                  <ListItemText style={{ paddingLeft: '16px' }} primary="Agregar Citas" />
                </ListItem>

              </List>
            </Collapse>

            <ListItem button onClick={toggleespecialidad}
             sx={{ backgroundColor: 'grey' }}>
              <ListItemText primary="Especialidades" />
            </ListItem>

            <Divider sx={{ marginY: '0.5rem' }} />

            <Collapse in={especialidadOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>

                <ListItem button onClick={() => handleMenuItemClick('/ver/especialidad')}
                sx={{ backgroundColor: '#D3DCCB', borderRadius: '10px' }}>
                  <ListItemText style={{ paddingLeft: '16px' }} primary="Ver Especialidades" />
                </ListItem>

                <Divider sx={{ marginY: '0.05rem' }} /> {/* Línea divisora */}

                <ListItem button onClick={() => handleMenuItemClick('/especialidad/new')}
                sx={{ backgroundColor: '#D3DCCB', borderRadius: '10px' }}>
                  <ListItemText style={{ paddingLeft: '16px' }} primary="Agregar Especialidad" />
                </ListItem>

              </List>
            </Collapse>

            <ListItem button onClick={togglehorario}
             sx={{ backgroundColor: 'grey' }}>
              <ListItemText primary="Horarios" />
            </ListItem>

            <Divider sx={{ marginY: '0.5rem' }} />

            <Collapse in={horarioOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>

                <ListItem button onClick={() => handleMenuItemClick('/ver/horario')}
                sx={{ backgroundColor: '#D3DCCB', borderRadius: '10px' }}>
                  <ListItemText style={{ paddingLeft: '16px' }} primary="Ver Horarios" />
                </ListItem>

                <Divider sx={{ marginY: '0.05rem' }} /> {/* Línea divisora */}

                <ListItem button onClick={() => handleMenuItemClick('/horario/new')}
                sx={{ backgroundColor: '#D3DCCB', borderRadius: '10px' }}>
                  <ListItemText style={{ paddingLeft: '16px' }} primary="Agregar horario" />
                </ListItem>

              </List>
            </Collapse>

{/* 
            <ListItem button onClick={toggledia}  
             sx={{ backgroundColor: 'grey' }}>
              <ListItemText primary="dias" />
            </ListItem> */}

          </List>
        </Drawer>
      ) : null}
    </Box>
  );
}

