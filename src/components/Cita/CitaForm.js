import { Autocomplete, Button, Card, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";

export default function CitaForm() {
  const [cita, setClinica] = useState({
    FechaCita: '',
    Mensaje: '',
    IdPaciente: '',
    IdMedico: '',
    IdRecepcionista: '',
    IdHorario: '',
    IdEspecialidad: ''
  });

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  //constantes para traer los ID´s
  const [Idmedicos, setIdmedicos] = useState([]);
  const [Idpacientes, setIdpacientes] = useState([]);
  const [IdRecepcionistas, setIdRecepcionistas] = useState([]);
  const [IdHorarios, setIdHorarios] = useState([]);
  const [IdEspecialidads, setIdEspecialidads] = useState([]);

  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);

  //validacion de horarios
  const [horariosOcupados, setHorariosOcupados] = useState([]);
  const [horariosOcupadosPorMedico, setHorariosOcupadosPorMedico] = useState({});
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);


  const [citasExistentes, setCitasExistentes] = useState([]);

  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setLoading(true);
  
    if (editing) {
      // Tu código para editar la cita existente
    } else {
      await fetch('https://deploy-mysql-proyectograduacion-production.up.railway.app/api/citas', {
        method: 'POST',
        body: JSON.stringify(cita),
        headers: { 'Content-Type': 'application/json' },
      });
    }
  
    setLoading(false);
    navigate('/ver/cita');
  };
  
  const handleChange = (event, value) => {
    const { name, value: inputValue } = event.target;
    const newValue = value ? value.Id : inputValue;
    setClinica((prevClinica) => ({ ...prevClinica, [name]: newValue }));
  };
  
  const handleClinicaChange = (value) => {
    setClinica((prevClinica) => ({ ...prevClinica, IdMedico: value ? value.IdMedico : '' }));
  };
  
  const handlePacienteChange = (value) => {
    setClinica((prevClinica) => ({ ...prevClinica, IdPaciente: value ? value.IdPaciente : '' }));
  };

  const handleRecepcionistaChange = (value) => {
    setClinica((prevClinica) => ({ ...prevClinica, IdRecepcionista: value ? value.IdRecepcionista : '' }));
  };

  const handleHorarioChange = (value) => {
    setClinica((prevClinica) => ({ ...prevClinica, IdHorario: value ? value.IdHorario : '' }));
  };

  const handleEspecialidadChange = (value) => {
    setClinica((prevClinica) => ({
      ...prevClinica,
      IdEspecialidad: value ? value.IdEspecialidad : '',
      IdMedico: '' // Borrar el médico seleccionado cuando cambie la especialidad
    }));
  
    if (value) {
      const especialidadId = value.IdEspecialidad;
      const filteredDoctors = Idmedicos.filter((doctor) => doctor.IdEspecialidad === especialidadId);
      setFilteredDoctors(filteredDoctors);
    } else {
      setFilteredDoctors([]);
    }
  };
  

  
  const loadCita = async (IdCita) => {
    const res = await fetch(`https://deploy-mysql-proyectograduacion-production.up.railway.app/api/citas/${IdCita}`);
    const data = await res.json();
    setClinica(data);
  
    // Cargar los datos de los médicos desde la API
    fetch('https://deploy-mysql-proyectograduacion-production.up.railway.app/api/medicos')
      .then((response) => response.json())
      .then((medicosData) => {
        setIdmedicos(medicosData);
  
        // Filtrar médicos según la especialidad de la cita cargada
        if (data.IdEspecialidad) {
          const especialidadId = data.IdEspecialidad;
          const filteredDoctors = medicosData.filter((doctor) => doctor.IdEspecialidad === especialidadId);
          setFilteredDoctors(filteredDoctors);
        }
        
        // Seleccionar el médico de la cita cargada
        const selectedDoctor = medicosData.find((doctor) => doctor.IdMedico === data.IdMedico);
        if (selectedDoctor) {
          handleClinicaChange(selectedDoctor);
        }
  
        setEditing(true);
      });
  };
  
  
  useEffect(() => {
    fetch('https://deploy-mysql-proyectograduacion-production.up.railway.app/api/citas') // Ajusta la URL de la API según tu configuración
      .then((response) => response.json())
      .then((citasData) => {
        const horariosOcupados = citasData.map((cita) => cita.IdHorario);
        setHorariosOcupados(horariosOcupados);
        // ... Resto de tu lógica para cargar los datos y establecer estados
      })
      .catch((error) => {
        console.error('Error al cargar las citas:', error);
        // Aquí podrías mostrar un mensaje de error al usuario si la carga de citas falla.
      });
  
    // Resto de tus llamadas API para cargar otros datos
  }, []);
  
  
  useEffect(() => {
    // Cargar las citas existentes desde la API
    fetch('https://deploy-mysql-proyectograduacion-production.up.railway.app/api/citas')
      .then((response) => response.json())
      .then((citasData) => {
        setCitasExistentes(citasData);
  
        // Crear un objeto para almacenar los horarios ocupados por médico
        const horariosOcupadosPorMedico = {};
  
        // Iterar sobre las citas para registrar los horarios ocupados por cada médico
        citasData.forEach((cita) => {
          const { IdHorario, IdMedico, FechaCita } = cita;
  
          // Si ya existe una entrada para este médico, se agrega el horario a la lista
          if (horariosOcupadosPorMedico[IdMedico]) {
            horariosOcupadosPorMedico[IdMedico].push({ IdHorario, FechaCita });
          } else {
            horariosOcupadosPorMedico[IdMedico] = [{ IdHorario, FechaCita }];
          }
        });
  
        setHorariosOcupadosPorMedico(horariosOcupadosPorMedico);
      })
      .catch((error) => {
        console.error('Error al cargar las citas:', error);
        // Mostrar mensaje de error al usuario si la carga de citas falla.
      });
  
    // Resto de tus llamadas API para cargar otros datos
    fetch('https://deploy-mysql-proyectograduacion-production.up.railway.app/api/medicos')
      .then((response) => response.json())
      .then((medicosData) => {
        setIdmedicos(medicosData);
        // Resto de tu lógica para cargar los datos de médicos
      });
  
    fetch('https://deploy-mysql-proyectograduacion-production.up.railway.app/api/especialidades')
      .then((response) => response.json())
      .then((especialidadesData) => {
        setEspecialidades(especialidadesData);
        // Resto de tu lógica para cargar los datos de especialidades
      });
  
    fetch('https://deploy-mysql-proyectograduacion-production.up.railway.app/api/pacientes')
      .then((response) => response.json())
      .then((pacientesData) => {
        setIdpacientes(pacientesData);
        // Resto de tu lógica para cargar los datos de pacientes
      });
  
    fetch('https://deploy-mysql-proyectograduacion-production.up.railway.app/api/recepcionistas')
      .then((response) => response.json())
      .then((recepcionistasData) => {
        setIdRecepcionistas(recepcionistasData);
        // Resto de tu lógica para cargar los datos de recepcionistas
      });
  
    fetch('https://deploy-mysql-proyectograduacion-production.up.railway.app/api/horarios')
      .then((response) => response.json())
      .then((horariosData) => {
        setIdHorarios(horariosData);
        // Resto de tu lógica para cargar los datos de horarios
      });
  
  }, []);
  

  useEffect(() => {
    if (params.IdCita) {
      loadCita(params.IdCita);
    }
  }, [params.IdCita]);

  useEffect(() => {
    // Cargar los datos de los tipos de medico desde la API
    fetch('https://deploy-mysql-proyectograduacion-production.up.railway.app/api/medicos')
      .then((response) => response.json())
      .then((data) => {
        setIdmedicos(data);
      });

      fetch('https://deploy-mysql-proyectograduacion-production.up.railway.app/api/especialidades')
      .then((response) => response.json())
      .then((data) => {
        setEspecialidades(data);
      });

    // Cargar los datos de los tipos de paciente desde la API
    fetch('https://deploy-mysql-proyectograduacion-production.up.railway.app/api/pacientes')
      .then((response) => response.json())
      .then((data) => {
        setIdpacientes(data);
      });

          // Cargar los datos de los tipos de recepcionista desde la API
    fetch('https://deploy-mysql-proyectograduacion-production.up.railway.app/api/recepcionistas')
    .then((response) => response.json())
    .then((data) => {
      setIdRecepcionistas(data);
    });

    // Cargar los datos de los tipos de Idhorario desde la API
    fetch('https://deploy-mysql-proyectograduacion-production.up.railway.app/api/horarios')
    .then((response) => response.json())
    .then((data) => {
      data.sort((a, b) => a.HoraInicio.localeCompare(b.HoraInicio));
      setHorariosDisponibles(data);
    });

      // Cargar los datos de los tipos de Idhorario desde la API
      fetch('https://deploy-mysql-proyectograduacion-production.up.railway.app/api/especialidades')
      .then((response) => response.json())
      .then((data) => {
        setIdEspecialidads(data);
      });

  }, []);

return (
  <Grid container 
  direction="column" 
  alignItems="center" 
  justifyContent="center"
  >
    <Grid item xs={8}>
      <Card
        sx={{ mt: 8 }}
        style={{
          backgroundColor: '#1e272e',
          padding: '4rem',
          width: '30rem'
        }}
      >
        <Typography variant="h5" textAlign="center" color="white">
          {editing ? 'Editar Datos de Cita' : 'Añadir Nueva Cita medica'}
        </Typography>
        <form onSubmit={handleSubmit}>
          
            <TextField
              variant='filled'
              label='Fecha'
              sx={{
                display: 'block',
                margin: '.5rem 0'
              }}
              name="FechaCita"
              type="date" // Cambiado a tipo "date" para que acepte fechas
              value={cita.FechaCita}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true, // Encoge la etiqueta para que no se superponga
                style: { color: "white" }
              }}
              inputProps={{
                style: { color: "white" }
              }}
            />

            <TextField
              variant="filled"
              label="Estado del paciente"
              multiline  // Activa el modo multiline
              rows={3}   // Ajusta la cantidad de líneas según tus necesidades
              sx={{
                display: 'block',
                margin: '.5rem 0',
              }}
              autoComplete="off"
              name="Mensaje"
              value={cita.Mensaje}
              onChange={handleChange}
              inputProps={{
                style: {
                  color: "white",
                  width: '28.5rem',
                },
              }}
              InputLabelProps={{
                style: { color: "white" },
              }}
            />

        <Autocomplete
          options={especialidades}
          getOptionLabel={(option) => option.Nombre}
          value={especialidades.find((option) => option.IdEspecialidad === cita.IdEspecialidad) || null}
          onChange={(event, value) => handleEspecialidadChange(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="Especialidad"
              sx={{
                display: 'block',
                margin: '.5rem 0'
              }}
              name="IdEspecialidad"
              inputProps={{ ...params.inputProps, style: { color: 'white' } }}
              InputLabelProps={{ style: { color: 'white' } }}
            />
          )}
        />

          <Autocomplete
            options={filteredDoctors}
            getOptionLabel={(doctor) => doctor.Nombre}
            value={filteredDoctors.find((doctor) => doctor.IdMedico === cita.IdMedico) || null}
            onChange={(event, value) => handleClinicaChange(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                label="Médico"
                sx={{
                  display: 'block',
                  margin: '.5rem 0'
                }}
                name="IdMedico"
                inputProps={{ ...params.inputProps, style: { color: 'white' } }}
                InputLabelProps={{ style: { color: 'white' } }}
              />
            )}
          />

          <Autocomplete
            options={Idpacientes}
            getOptionLabel={(option) => option.Nombre}
            value={Idpacientes.find((option) => option.IdPaciente === cita.IdPaciente) || null}
            onChange={(event, value) => handlePacienteChange(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                label="Paciente"
                sx={{
                  display: 'block',
                  margin: '.5rem 0'
                }}
                name="IdPaciente"
                inputProps={{ ...params.inputProps, style: { color: 'white' } }}
                InputLabelProps={{ style: { color: 'white' } }}
              />
            )}
          />
          
          <Autocomplete
            options={IdRecepcionistas}
            getOptionLabel={(option) => option.Nombre}
            value={IdRecepcionistas.find((option) => option.IdRecepcionista === cita.IdRecepcionista) || null}
            onChange={(event, value) => handleRecepcionistaChange(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                label="Recepcionista"
                sx={{
                  display: 'block',
                  margin: '.5rem 0'
                }}
                name="IdRecepcionista"
                inputProps={{ ...params.inputProps, style: { color: 'white' } }}
                InputLabelProps={{ style: { color: 'white' } }}
              />
            )}
          />

{/* validacion del horario  */}
          <Autocomplete
            options={horariosDisponibles.filter((horario) => {
              const isHorarioOcupado = horariosOcupadosPorMedico[cita.IdMedico]?.some(
                (ocupado) => ocupado.FechaCita === cita.FechaCita && ocupado.IdHorario === horario.IdHorario
              );
              return !isHorarioOcupado;
            })}
            getOptionLabel={(option) => option.HoraInicio}
            value={horariosDisponibles.find((option) => option.IdHorario === cita.IdHorario) || null}
            onChange={(event, value) => handleHorarioChange(value)}
            renderInput={(params) => (
              <div>
                <TextField
                  {...params}
                  variant="filled"
                  label="Horario"
                  sx={{
                    display: 'block',
                    margin: '.5rem 0'
                  }}
                  name="Idhorario"
                  inputProps={{ ...params.inputProps, style: { color: 'white' } }}
                  InputLabelProps={{ style: { color: 'white' } }}
                />
                {cita.IdMedico && cita.FechaCita && (
                  <>
                    {horariosDisponibles.length === 0 ? (
                      <Typography variant="body2" color="info">
                        Horarios no disponibles en este día
                      </Typography>
                    ) : (
                      <>
                    {horariosDisponibles.every((horario) =>
                      (horariosOcupadosPorMedico[cita.IdMedico]?.some(
                        (ocupado) =>
                          ocupado.FechaCita === cita.FechaCita &&
                          ocupado.IdHorario === horario.IdHorario
                      ) && horario.IdHorario !== cita.IdHorario) || // Agregar esta condición para evitar el mensaje
                      !horariosOcupadosPorMedico[cita.IdMedico] // Agregar esta condición para permitir horarios vacíos
                    ) ? (
                      <Typography variant="body2" color="error">
                        Horario ocupado para esta fecha y médico.
                      </Typography>
                    ) : null}

                      </>
                    )}
                  </>
                )}
              </div>
            )}
          />

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={
              !cita.FechaCita ||
              !cita.Mensaje ||
              !cita.IdPaciente ||
              !cita.IdEspecialidad ||
              !cita.IdMedico ||
              !cita.IdRecepcionista ||
              !cita.IdHorario 
            }
          >
                    {loading ? (
                      <CircularProgress color="inherit" size={25}/>
                    ) : (
                      editing? "Guardar Cambios" : "Guardar"
                    )}
          </Button>
          </div>
        </form>
      </Card>
      </Grid>
      </Grid>
);
}