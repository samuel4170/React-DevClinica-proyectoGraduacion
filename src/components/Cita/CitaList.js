import React, { useEffect, useState } from 'react';
import './styles.css'
import {
  Button,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputLabel,
  Container
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DateTime } from "luxon";


export default function CitaList() {
  const [IdPacientes, setIdPacientes] = useState([]);
  const [IdMedicos, setIdMedicos] = useState([]);
  const [IdRecepcionistas, setIdRecepcionistas] = useState([]);
  const [IdHorarios, setIdHorarios] = useState([]);
  const [IdEspecialidads, setIdEspecialidads] = useState([]);

  const [citas, setCitas] = useState([]);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [selectedCitaId, setSelectedCitaId] = useState(null);
  const [credentials, setCredentials] = useState({ Usuario: '', Password: '' });
  const [isValidCredentials, setIsValidCredentials] = useState(true);
  const [especialidades, setEspecialidades] = useState([]); 
  const [pacientes, setPaceintes] = useState([]); 
  const [horarios, setHorarios] = useState([]); 
  const [filterDate, setFilterDate] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(null);

  const handleFilterChange = (e) => {
    setFilterDate(e.target.value);
  };
  const filterCitas = () => {
    return filterDate
      ? citas.filter((cita) => new Date(cita.FechaCita).toISOString().startsWith(filterDate))
      : citas;
  };

  const navigate = useNavigate();

  const loadCitas = async () => {
    const response = await fetch('https://deploy-mysql-proyectograduacion-production.up.railway.app/api/citas');
    const data = await response.json();
    setCitas(data);
    calculateTimeRemaining(); // Llama a calculateTimeRemaining después de cargar las citas
  };

  const citaHaPasado = (fechaCita, horaInicio) => {
    const now = DateTime.local(); // Obtiene la hora actual en la zona horaria local
  
    // Combina la fecha y la hora de inicio en una fecha completa
    const fechaHoraInicio = DateTime.fromISO(`${fechaCita}T${horaInicio}`);
  
    if (fechaHoraInicio < now) {
      return 'pasada'; // Cita en el pasado
    } else {
      return 'futura'; // Cita en el futuro
    }
  };
  
  const loadIdPacientes = async () => {
    const response = await fetch('https://deploy-mysql-proyectograduacion-production.up.railway.app/api/pacientes');
    const data = await response.json();
    setIdPacientes(data);
  };

  const loadIdEspecialidad = async () => {
    const response = await fetch('https://deploy-mysql-proyectograduacion-production.up.railway.app/api/especialidades');
    const data = await response.json();
    setIdEspecialidads(data);
  };

  const loadIdMedico = async () => {
    const response = await fetch('https://deploy-mysql-proyectograduacion-production.up.railway.app/api/medicos');
    const data = await response.json();
    setIdMedicos(data);
  };

  const loadIdRecepcionista = async () => {
    const response = await fetch('https://deploy-mysql-proyectograduacion-production.up.railway.app/api/recepcionistas');
    const data = await response.json();
    setIdRecepcionistas(data);
  };

  const loadIdHorario = async () => {
    const response = await fetch('https://deploy-mysql-proyectograduacion-production.up.railway.app/api/horarios');
    const data = await response.json();
    setIdHorarios(data);
  };


  const handleDelete = async (IdCita) => {
    setSelectedCitaId(IdCita);
    setDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmationDialog = () => {
    setDeleteConfirmationOpen(false);
    setCredentials({ Usuario: '', Password: '' });
    setSelectedCitaId(null);
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
      const response = await fetch('https://deploy-mysql-proyectograduacion-production.up.railway.app/api/recepcionistas');
      const data = await response.json();

      const validCredentials = data.some(
        (user) =>
          user.Usuario === credentials.Usuario &&
          user.Password === credentials.Password
      );

      if (validCredentials) {
        await fetch(`https://deploy-mysql-proyectograduacion-production.up.railway.app/api/citas/${selectedCitaId}`, {
          method: 'DELETE',
        });
        setCitas(citas.filter((cita) => cita.IdCita !== selectedCitaId));
        closeDeleteConfirmationDialog();
      } else {
        setIsValidCredentials(false);
      }
    } catch (error) {
      console.error(error);
      // Mostrar mensaje de error
    }
  };

  const calculateTimeRemaining = () => {
    const now = DateTime.local();
    const futurasCitas = citas.filter(
      (cita) =>
        citaHaPasado(cita.FechaCita, horarios.find((Horario) => Horario.IdHorario === cita.IdHorario)?.HoraInicio) ===
        'futura'
    );
  
    if (futurasCitas.length === 0) {
      setTimeRemaining(null); // No hay citas futuras, por lo que no mostramos notificación
      return;
    }
  
    const nextCita = futurasCitas
      .map((cita) =>
        DateTime.fromISO(`${cita.FechaCita}T${horarios.find((Horario) => Horario.IdHorario === cita.IdHorario)?.HoraInicio}`)
      )
      .reduce((closest, cita) => {
        return cita < closest && cita > now ? cita : closest;
      }, DateTime.fromISO('9999-12-31T23:59:59'));
  
    const timeDifference = nextCita.diff(now, 'minutes').minutes;
  
    if (timeDifference <= 15 && timeDifference > 13) {
      setTimeRemaining(timeDifference);
    } else {
      setTimeRemaining(null);
    }
  };
  
  useEffect(() => {
    loadCitas();
    loadIdPacientes();
    loadIdMedico();
    loadIdRecepcionista();
    loadIdHorario();
    loadIdEspecialidad();

    fetch('https://deploy-mysql-proyectograduacion-production.up.railway.app/api/pacientes') // Cargar especialidades
    .then((response) => response.json())
    .then((data) => {
      setPaceintes(data);
    });

    fetch('https://deploy-mysql-proyectograduacion-production.up.railway.app/api/especialidades') // Cargar especialidades
    .then((response) => response.json())
    .then((data) => {
      setEspecialidades(data);
    });

    fetch('https://deploy-mysql-proyectograduacion-production.up.railway.app/api/horarios') // Cargar especialidades
    .then((response) => response.json())
    .then((data) => {
      setHorarios(data);
    });

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate()); // Subtract one day
    const formattedDate = currentDate.toISOString().substr(0, 10); // Format: YYYY-MM-DD
    setFilterDate(formattedDate);

  // Establece un intervalo para volver a calcular el tiempo restante cada minuto
  const intervalId = setInterval(calculateTimeRemaining, 60000);

  calculateTimeRemaining(); // Llama a la función para calcular el tiempo restante inicial

  return () => clearInterval(intervalId); // Limpia el intervalo cuando el componente se desmonta
  }, []);


  const getNombrepaciente = (IdPaciente) => {
    const paciente = IdPacientes.find((tipo) => tipo.Id === IdPaciente);
    return paciente ? paciente.Nombre : '';
  };

  const getNombreEspecialidad = (IdEspecialidad) => {
    const especialidad = IdEspecialidads.find((tipo) => tipo.Id === IdEspecialidad);
    return especialidad ? especialidad.Nombre : '';
  };

  const getnombremedico = (IdMedico) => {
    const medico = IdMedicos.find((tipo) => tipo.IdMedico === IdMedico);
    return medico ? medico.Nombre : '';
  };
  

  const getnombrerecepcionista = (IdRecepcionista) => {
    const recepcionista = IdRecepcionistas.find((tipo) => tipo.Id === IdRecepcionista);
    return recepcionista ? recepcionista.Nombre : '';
  };

  const gethorario = (IdHorario) => {
    const Horario = IdHorarios.find((tipo) => tipo.Id === IdHorario);
    return Horario ? Horario.HoraInicio : '';
  };

  //filtrar las citas por medicos
  const citasPorMedico = {};
  citas.forEach((cita) => {
    if (!citasPorMedico[cita.IdMedico]) {
      citasPorMedico[cita.IdMedico] = [];
    }
    citasPorMedico[cita.IdMedico].push(cita);
  });


return (
<>
<Container maxWidth="100%">
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', width: '70.5rem'}}>
    <div style={{ marginRight: '8px' }}>
      <h1>Lista de citas</h1>
    </div>
    <InputLabel htmlFor="filter-date" style={{ position: 'absolute', top: '-20px', zIndex: 1 }}>
      Filtrar por fecha
    </InputLabel>
    <TextField
      type="date"
      value={filterDate}
      onChange={handleFilterChange}
    />
  </div>
  </Container>

<div style={{ display: 'grid', gridTemplateColumns: `repeat(${Object.keys(citasPorMedico).length}, 1fr)`, gap: '1rem' }}>
{Object.entries(citasPorMedico).map(([IdMedico, citasMedico]) => (
<div key={IdMedico}>
{citasMedico.length > 0 && (
<h2>Médico: {getnombremedico(parseInt(IdMedico))}</h2>
)}

{citasMedico
  .filter((cita) => new Date(cita.FechaCita).toISOString().startsWith(filterDate))
  .map((cita, index) => (
<Card
  key={cita.IdCita}
  style={{
    marginBottom: '1rem',
    backgroundColor: citaHaPasado(
      cita.FechaCita,
      horarios.find((Horario) => Horario.IdHorario === cita.IdHorario)?.HoraInicio
    ) === 'pasada'
      ? '#A9ACAD' // Color para citas pasadas
      : '#2C3439', // Color para citas futuras
    padding: '1rem',
  }}
>         
      <CardContent
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >

          <div style={{ color: 'white', fontWeight: 'bold', fontSize: '25px' }}>
            <Typography style={{ fontSize: '20px', fontWeight: 'bold' }}>{cita.FechaCita}</Typography>
            <Typography style={{ fontSize: '20px', fontWeight: 'bold' }}>{` ${
              horarios.find((Horario) => Horario.IdHorario === cita.IdHorario)?.HoraInicio || 'No especificada'
            }`}</Typography>
            <Typography>{cita.Mensaje}</Typography>
            <Typography>
              <strong>Nombre de paciente:</strong>{` ${
                pacientes.find((paciente) => paciente.IdPacinete === cita.IdPacinete)?.Nombre || 'No especificada'
              }`}
            </Typography>

            <Typography>
            <strong>Especialidad de cita:</strong>{
            ` ${
              especialidades.find((especialidad) => especialidad.IdEspecialidad === cita.IdEspecialidad)?.Nombre || 'No especificada'
            }`}</Typography>

            <Typography>{getNombrepaciente(cita.IdPaciente)}</Typography>
            <Typography>{getNombreEspecialidad(cita.IdEspecialidad)}</Typography>
            <Typography>{getnombrerecepcionista(cita.IdRecepcionista)}</Typography>
            <Typography>{gethorario(cita.IdHorario)}</Typography>
          </div>
          <div>
            <Button
              variant="contained"
              color="inherit"
              onClick={() => navigate(`/Cita/${cita.IdCita}/edit`)}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={() => handleDelete(cita.IdCita)}
              style={{ marginLeft: '.5rem' }}
            >
              Eliminar
            </Button>
          </div>
                </CardContent>
        </Card>
  ))}
  </div>
))}
</div>

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
            helperText={!isValidCredentials && credentials.Usuario !== '' ? 'Usuario o password incorrecto' : ''}
          />
          <TextField
            label='Contraseña'
            name='Password'
            type='password'
            value={credentials.Password}
            onChange={handleCredentialChange}
            error={!isValidCredentials && credentials.Password !== ''}
            helperText={!isValidCredentials && credentials.Password !== '' ? 'Usuario o password incorrecto' : ''}
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

      {timeRemaining !== null && timeRemaining <= 15 && (
          <Dialog open={true}>
            <DialogTitle>Notificación de Cita</DialogTitle>
            <DialogContent>
              Quedan {timeRemaining} minutos para la próxima cita.
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setTimeRemaining(null)} color='primary'>
                Cerrar
              </Button>
            </DialogActions>
          </Dialog>
        )}

    </>
  );
}