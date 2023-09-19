import { Button, Card, CircularProgress, Grid, TextField, Typography} from '@mui/material'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";

export default function PacienteForm(){

  const [paciente, setPaciente] = useState({
    Nombre: '',
    Direccion: '',
    Telefono: '',
    DPI: '',
    Edad: '',
    DPIReferencia: ''
  })
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)
  
  //valida DPI
  const [dpiError, setDpiError] = useState('');


  const navigate = useNavigate()
  const params = useParams()

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true)

    if(editing) {
        await fetch(`https://deploy-mysql-proyectograduacion-production.up.railway.app/api/pacientes/${params.IdPaciente}`,{
        method: "PUT",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paciente),
      });
    } else {
        await fetch("https://deploy-mysql-proyectograduacion-production.up.railway.app/api/pacientes",{
        method: "POST",
        body: JSON.stringify(paciente),
        headers: { "Content-Type": "application/json"},
      });
    }

    setLoading(false)
    navigate('/ver/paciente')
  }


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'DPI') {
      const numericValue = value.replace(/\D/g, '');
      setPaciente({ ...paciente, [name]: numericValue });

      // Validar DPI y actualizar el mensaje de error
      if (numericValue.length !== 13) {
        setDpiError('El DPI debe tener 13 dígitos');
      } else {
        setDpiError('');
      }
    } else {
      setPaciente({ ...paciente, [name]: value });
    }
  };

  const loadTasks = async (IdPaciente) => {
    const res = await fetch (`https://deploy-mysql-proyectograduacion-production.up.railway.app/api/pacientes/${IdPaciente}`)
    const data = await res.json()
    setPaciente({Nombre: data.Nombre, Direccion: data.Direccion, Telefono: data.Telefono, DPI: data.DPI, Edad: data.Edad, DPIReferencia: data.DPIReferencia})
    setEditing(true)
  }

  useEffect(() => {
    if (params.IdPaciente) {
      loadTasks(params.IdPaciente);
    }
  }, [params.IdPaciente]);

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
              {editing? "Editar Datos de paciente" : "Añadir nuevo paciente"}
              </Typography>
            </div>
              <form onSubmit={handleSubmit}>

                <TextField
                  variant='filled'
                  label='Nombre de paciente'
                  sx={{
                    display: 'block',
                    margin: '.5rem 0',
                    backgroundColor: 'transparent',
                  }}
                  autoComplete="off"
                  
                  name = "Nombre"
                  value={paciente.Nombre}
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
                  value={paciente.Direccion}
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
                  value={paciente.Telefono}
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
                    value={paciente.DPI}
                    onChange={handleChange}
                    // error={paciente.DPI.length !== 13} // Agregar la propiedad 'error' según la longitud del DPI
                    // helperText={paciente.DPI.length !== 13 ? 'El DPI debe tener 13 dígitos' : ''}
                    inputProps={{
                      style: {
                        color: "white",
                        width: '20rem',
                      },
                    }}
                    InputLabelProps={{ style: { color: "white" } }}
              />


                <TextField
                  variant='filled'
                  label='Edad'
                  sx={{
                    display: 'block',
                    margin: '.5rem 0',
                    width: '27rem',
                  }}
                  autoComplete="off"
                  name = "Edad"
                  value={paciente.Edad}
                  onChange={handleChange}
                  inputProps={{style: {
                  color: "white",
                  width: '15rem',
                }}}
                  InputLabelProps={{style: {color: "white"}}}
                />

                <TextField
                  variant='filled'
                  label='DPI de referencia'
                  sx={{
                    display: 'block',
                    margin: '.5rem 0',
                    width: '27rem',
                    marginBottom: '3rem',  // Agregar margen inferior
                  }}
                  autoComplete="off"
                  name = "DPIReferencia"
                  value={paciente.DPIReferencia}
                  onChange={handleChange}
                  inputProps={{style: {
                  color: "white",
                  width: '20rem',
                  
                }}}
                  InputLabelProps={{style: {color: "white"}}}

                />

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> 
                <Button 
                  variant='contained'
                  color='secondary' 
                  type='submit'
                  disabled = {!paciente.Nombre || !paciente.Direccion || !paciente.Telefono || !paciente.DPI || !paciente.Edad || !paciente.DPIReferencia}
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

