
import React, { useEffect, useState } from 'react';
import {
  Divider,
  Button,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function HorarioList() {
  const [horarios, setHorarios] = useState([]);
  const [dias, setDias] = useState([]); // Agrega esta línea

  const navigate = useNavigate();

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [credentials, setCredentials] = useState({ Usuario: '', Password: '' });
  const [selectedHorarioId, setSelectedHorarioId] = useState(null);
  const [isValidCredentials, setIsValidCredentials] = useState(true);

  const loadHorarios = async () => {
    const response = await fetch('https://deploy-mysql-proyectograduacion-production.up.railway.app/api/horarios');
    const data = await response.json();
    setHorarios(data);
  };

  const handleDelete = async (IdHorario) => {
    setSelectedHorarioId(IdHorario);
    setDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmationDialog = () => {
    setDeleteConfirmationOpen(false);
    setCredentials({ Usuario: '', Password: '' });
    setSelectedHorarioId(null);
    setIsValidCredentials(true);
  };

  const handleCredentialChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
    setIsValidCredentials(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      // Lógica de validación de las credenciales en la API
      const response = await fetch('https://deploy-mysql-proyectograduacion-production.up.railway.app/api/recepcionistas');
      const data = await response.json();

      const validCredentials = data.some(
        (user) =>
          user.Usuario === credentials.Usuario &&
          user.Password === credentials.Password
      );

      if (validCredentials) {
        await fetch(`https://deploy-mysql-proyectograduacion-production.up.railway.app/api/horarios/${selectedHorarioId}`, {
          method: 'DELETE',
        });
        setHorarios(horarios.filter((horario) => horario.IdHorario !== selectedHorarioId));
        closeDeleteConfirmationDialog();
      } else {
        setIsValidCredentials(false);
      }
    } catch (error) {
      console.error(error);
      // Mostrar mensaje de error
    }
  };

  useEffect(() => {
    loadHorarios();
    fetch('https://deploy-mysql-proyectograduacion-production.up.railway.app/api/dias') // Cargar días
    .then((response) => response.json())
    .then((data) => {
      setDias(data);
    });
  }, []);

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}>
        <div style={{ marginRight: '8px' }}>
          <h1>Lista de Horarios</h1>
        </div>
      </div>

      <Divider sx={{ marginY: '0.5rem' }} />

      {horarios.map((horario) => (
  <Card
    key={horario.IdHorario}
    style={{
      marginBottom: '.7rem',
      backgroundColor: '#1e272e',
    }}
  >
    <CardContent
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ color: 'white' }}>
        <Typography>{`Hora de Inicio: ${horario.HoraInicio}`}</Typography>
        <Typography>{`Hora Fin: ${horario.HoraFin}`}</Typography>
      </div>

      <div>
      <Button
                variant='contained'
                color='inherit'
                onClick={() => navigate(`/horario/${horario.IdHorario}/edit`)}
              >
                Editar
              </Button>

              <Button
                variant='contained'
                color='warning'
                onClick={() => handleDelete(horario.IdHorario)}
                style={{ marginLeft: '.5rem' }}
              >
                Eliminar
              </Button>
      </div>
    </CardContent>
  </Card>
))}

      {/* Diálogo de confirmación */}
      <Dialog open={deleteConfirmationOpen} onClose={closeDeleteConfirmationDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <TextField
            label='Usuario'
            name='Usuario'
            value={credentials.Usuario}
            onChange={handleCredentialChange}
            error={!isValidCredentials && credentials.Usuario !== ''}
            helperText={!isValidCredentials && credentials.Usuario !== '' ? 'Usuario o contraseña incorrectos' : ''}
          />
          <TextField
            label='Contraseña'
            name='Password'
            type='password'
            value={credentials.Password}
            onChange={handleCredentialChange}
            error={!isValidCredentials && credentials.Password !== ''}
            helperText={!isValidCredentials && credentials.Password !== '' ? 'Usuario o contraseña incorrectos' : ''}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirmationDialog} color='primary'>
            Cancelar
          </Button>
          <Button onClick={handleDeleteConfirmation} color='primary'>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
