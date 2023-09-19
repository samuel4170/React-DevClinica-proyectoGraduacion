import { Autocomplete,Button, Card, CircularProgress, Grid, TextField, Typography} from '@mui/material'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";

export default function MedicoForm(){

  const [medico, setmedico] = useState({
    Nombre: '',
    Direccion: '',
    Telefono: '',
    NIT: '',
    DPI: '',
    IdEspecialidad: '',
  })
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)
  
  const [Especialidad, setEspecialidad] = useState([]);

  //valida DPI
  const [dpiError, setDpiError] = useState('');


  const navigate = useNavigate()
  const params = useParams()

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true)

    if(editing) {
        await fetch(`https://deploy-mysql-proyectograduacion-production.up.railway.app/api/medicos/${params.IdMedico}`,{
        method: "PUT",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(medico),
      });
    } else {
        await fetch("https://deploy-mysql-proyectograduacion-production.up.railway.app/api/medicos",{
        method: "POST",
        body: JSON.stringify(medico),
        headers: { "Content-Type": "application/json"},
      });
    }

    setLoading(false)
    navigate('/ver/medico')
  }


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'DPI') {
      const numericValue = value.replace(/\D/g, '');
      setmedico({ ...medico, [name]: numericValue });

      // Validar DPI y actualizar el mensaje de error
      if (numericValue.length !== 13) {
        setDpiError('El DPI debe tener 13 dígitos');
      } else {
        setDpiError('');
      }
    } else {
      setmedico({ ...medico, [name]: value });
    }
  };

  const handleEspecialidad = (value) => {
    setmedico((prevMedico) => ({ ...prevMedico, IdEspecialidad: value ? value.IdEspecialidad : '' }));
  };

  const loadmedico = async (IdMedico) => {
    const res = await fetch (`https://deploy-mysql-proyectograduacion-production.up.railway.app/api/medicos/${IdMedico}`)
    const data = await res.json()
    setmedico(data)
    setEditing(true)
  }

  useEffect(() => {
    if (params.IdMedico) {
      loadmedico(params.IdMedico);
    }
  }, [params.IdMedico]);

  useEffect(() => {
    fetch('https://deploy-mysql-proyectograduacion-production.up.railway.app/api/especialidades')
      .then((response) => response.json())
      .then((data) => {
        setEspecialidad(data);
      });
  }, []);


  return(
    <Grid
      container
      direction="column"
      alignItems="center"
    >

        <Grid item xs ={8}>
          <Card
            sx={{ mt: 8 }} 
            style={{
              backgroundColor: "#1e272e",
              padding: "4rem",
              width: '30rem'
            }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',fontWeight: 'bold',fontSize: '28px' , marginBottom: '2rem',}}>
              <Typography variant='5' textAlign='center' color='white'> 
              {editing? "Editar Datos de medico" : "Añadir nuevo medico"}
              </Typography>
            </div>
              <form onSubmit={handleSubmit}>

                <TextField
                  variant='filled'
                  label='Nombre de medico'
                  sx={{
                    display: 'block',
                    margin: '.5rem 0',
                    backgroundColor: 'transparent',
                  }}
                  autoComplete="off"
                  
                  name = "Nombre"
                  value={medico.Nombre}
                  onChange={handleChange}
                  inputProps={{
                    style: {
                      color: "white",
                      width: '27rem',

                    }
                  }}
                  InputLabelProps={{style: {color: "white"}}}
                />

                <TextField
                  variant='filled'
                  label='Direccion'
                  sx={{
                    display: 'block',
                    margin: '.5rem 0',
                  }}
                  autoComplete="off"
                  name = "Direccion"
                  value={medico.Direccion}
                  onChange={handleChange}
                  inputProps={{style: {
                  color: "white",
                  width: '27rem',
                }}}
                  InputLabelProps={{style: {color: "white"}}}
                />

                <TextField
                  variant='filled'
                  label='Telefono'
                  sx={{
                    display: 'block',
                    margin: '.5rem 0',
                  }}
                  autoComplete="off"
                  name = "Telefono"
                  value={medico.Telefono}
                  onChange={handleChange}
                  inputProps={{style: {
                  color: "white",
                  width: '20rem',
                }}}
                  InputLabelProps={{style: {color: "white"}}}
                />

                  <TextField
                  variant='filled'
                  label='NIT'
                  sx={{
                    display: 'block',
                    margin: '.5rem 0',
                  }}
                  autoComplete="off"
                  name = "NIT"
                  value={medico.NIT}
                  onChange={handleChange}
                  inputProps={{style: {
                  color: "white",
                  width: '20rem',
                }}}
                  InputLabelProps={{style: {color: "white"}}}
                />  

              <TextField
                    variant='filled'
                    label='DPI'
                    sx={{
                      display: 'block',
                      margin: '.5rem 0',
                      width: '27rem',
                    }}
                    error={dpiError !== ''}
                    helperText={dpiError}
                    autoComplete="off"
                    name="DPI"
                    value={medico.DPI}
                    onChange={handleChange}
                    inputProps={{
                      style: {
                        color: "white",
                        width: '20rem',
                      },
                    }}
                    InputLabelProps={{ style: { color: "white" } }}
              />

            <Autocomplete
              options={Especialidad}
              getOptionLabel={(option) => option.Nombre}
              value={Especialidad.find((option) => option.IdEspecialidad === medico.IdEspecialidad) || null}
              onChange={(event, value) => handleEspecialidad(value)}
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

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> 
                <Button 
                  variant='contained'
                  color='secondary' 
                  type='submit'
                  disabled = {
                    !medico.Nombre || 
                    !medico.Direccion || 
                    !medico.Telefono || 
                    !medico.NIT || 
                    !medico.DPI || 
                    !medico.IdEspecialidad
                  }
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                  }}  
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
  )
}

