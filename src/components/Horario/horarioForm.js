import { Autocomplete, Button, Card, CircularProgress, Grid, TextField, Typography,MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/styles.css'; 


export default function HorarioForm() {
  const [horario, setHorario] = useState({
    HoraInicio: '',
    HoraFin: '',
    IdDia: ''
    });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false)

  const [dias, setDias] = useState([]);

const hoursList = Array.from({ length: 12 }, (_, index) => {
  const hour = (index + 7).toString().padStart(2, '0');
  return `${hour}:00`;
});

  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Consultar todos los horarios existentes en la API
      const horariosResponse = await fetch("https://deploy-mysql-proyectograduacion-production.up.railway.app/api/horarios");
      const horariosData = await horariosResponse.json();

      // Verificar si ya existe un horario con la misma HoraInicio
      const horarioExistente = horariosData.find(
        (horarioExistente) =>
          horarioExistente.HoraInicio.slice(0, 5) === horario.HoraInicio.slice(0, 5)
      );

      if (horarioExistente) {
        setLoading(false);
        alert('Ya existe un horario con esta HoraInicio.');
        return;
      }

      if (editing) {
        await fetch(`https://deploy-mysql-proyectograduacion-production.up.railway.app/api/horarios/${params.IdHorario}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(horario),
        });
      } else {
        await fetch("https://deploy-mysql-proyectograduacion-production.up.railway.app/api/horarios", {
          method: "POST",
          body: JSON.stringify(horario),
          headers: { "Content-Type": "application/json" },
        });
      }

      setLoading(false);
      navigate('/ver/horario');
    } catch (error) {
      setLoading(false);
      console.error('Error al guardar el horario:', error);
      // Puedes mostrar un mensaje de error en la interfaz si lo deseas
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHorario({ ...horario, [name]: value });
  };

  const handleHorario = (value) => {
    setHorario((prevhorario) => ({ ...prevhorario, IdDia: value ? value.IdDia : '' }));
  };

  const loadHorario = async (IdHorario) => {
    const res = await fetch (`https://deploy-mysql-proyectograduacion-production.up.railway.app/api/horarios/${IdHorario}`)
    const data = await res.json()
    setHorario(data)
    setEditing(true)
  }
  
  useEffect(() => {
    if (params.IdHorario) {
      loadHorario(params.IdHorario);
    }
  }, [params.IdHorario]);


  useEffect(() => {
    fetch('https://deploy-mysql-proyectograduacion-production.up.railway.app/api/dias')
      .then((response) => response.json())
      .then((data) => {
        setDias(data);
      });

  }, []);

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item xs={8}>
        <Card
          sx={{ mt: 8 }}
          style={{
            backgroundColor: '#1e272e',
            padding: '4rem',
            width: '30rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 'bold',
              fontSize: '28px',
              marginBottom: '2rem',
            }}
          >
            <Typography variant="5" textAlign="center" color="white">
            {editing? "Editar Datos de horario" : "Añadir nuevo horario"}
            </Typography>
          </div>
          <form onSubmit={handleSubmit}>

          <TextField
                    select
                    variant="filled"
                    label="Hora Inicio"
                    sx={{
                      display: 'block',
                      margin: '.5rem 0',
                      backgroundColor: 'transparent',
                      width: '100%', // Ajusta el ancho al 100%
                    }}
                    className="wide-select"
                    autoComplete="off"
                    name="HoraInicio"
                    value={horario.HoraInicio}
                    onChange={handleChange}
                    InputLabelProps={{
                      style: {
                        color: 'white',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        width: '100%',
                      },
                    }}
                    SelectProps={{
                      classes: {
                        icon: 'select-icon',
                      },
                      MenuProps: {
                        classes: { paper: 'menu-paper' },
                      },
                      renderValue: (selectedValue) => (
                        <span style={{ color: selectedValue ? 'white' : 'black' }}>{selectedValue}</span>
                      ),
                    }}
                  >
              {hoursList.map((hour) => (
                <MenuItem
                  key={hour}
                  value={hour}
                  style={{
                    width: '100px',
                  }}
                  className="menu-item"
                >
                  {hour}
                </MenuItem>
              ))}
            </TextField>

            <TextField
                    select
                    variant="filled"
                    label="Hora Fin"
                    sx={{
                      display: 'block',
                      margin: '.5rem 0',
                      backgroundColor: 'transparent',
                    }}
                    className="wide-select"
                    autoComplete="off"
                    name="HoraFin"
                    value={horario.HoraFin}
                    onChange={handleChange}
                    InputLabelProps={{
                      style: {
                        color: 'white',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        width: '100%',
                      },
                    }}
                    SelectProps={{
                      classes: {
                        icon: 'select-icon',
                      },
                      MenuProps: {
                        classes: { paper: 'menu-paper' },
                      },
                      renderValue: (selectedValue) => (
                        <span style={{ color: selectedValue ? 'white' : 'black' }}>{selectedValue}</span>
                      ),
                    }}
                  >
              {hoursList.map((hour) => (
                <MenuItem
                  key={hour}
                  value={hour}
                  style={{
                    width: '5rem',
                  }}
                  className="menu-item"
                >
                  {hour}
                </MenuItem>
              ))}
            </TextField>
            
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={
                  !horario.HoraInicio || 
                  !horario.HoraFin}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {loading ? <CircularProgress color="inherit" size={25} /> : 'Guardar'}
              </Button>
            </div>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
}
