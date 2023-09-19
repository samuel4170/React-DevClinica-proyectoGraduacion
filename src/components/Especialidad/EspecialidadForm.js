import { Button, Card, CircularProgress, Grid, TextField, Typography} from '@mui/material'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";

export default function EspecialidadForm(){

  const [Especialidad, setEspecialidad] = useState({
    Nombre: '',
  })
  
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)

  const navigate = useNavigate()
  const params = useParams()

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true)

    if (editing) {
      await fetch(`https://deploy-mysql-proyectograduacion-production.up.railway.app/api/especialidades/${params.IdEspecialidad}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Especialidad),
      });
    } else {
      await fetch("https://deploy-mysql-proyectograduacion-production.up.railway.app/api/especialidades", {
        method: "POST",
        body: JSON.stringify(Especialidad),
        headers: { "Content-Type": "application/json" },
      });
    }
    

    setLoading(false)
    navigate('/ver/especialidad')
  }

  const handleChange = e => {
    setEspecialidad({ ...Especialidad, [e.target.name]: e.target.value})
  }

  const loadEspecialidad = async (IdEspecialidad) => {
    const res = await fetch(`https://deploy-mysql-proyectograduacion-production.up.railway.app/api/especialidades/${IdEspecialidad}`)
    const data = await res.json()
    setEspecialidad(data) // Incluye la propiedad Id en el estado
    setEditing(true)
  }
  

  useEffect(()=> {
    if(params.IdEspecialidad){
      loadEspecialidad(params.IdEspecialidad)
    }
  }, [params.IdEspecialidad])

  return(
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >

        <Grid item xs ={3}>
          <Card
            sx={{ mt: 8 }} 
            style={{
              backgroundColor: "#1e272e",
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
             <Typography variant='5' textAlign='center' color='white'> 
            {editing? "Editar Especialidades" : "Añadir nueva Especialidad"}
             </Typography>
          </div>
          <form onSubmit={handleSubmit}>

                  <TextField
                  variant='filled'
                  label='Nombre de especialidad'
                  sx={{
                    display: 'block',
                    margin: '.5rem 0',
                  }}
                  autoComplete="off"
                  name = "Nombre"
                  value={Especialidad.Nombre}
                  onChange={handleChange}
                  inputProps={{style: {
                  color: "white",
                  width: '27rem',
                }}}
                  InputLabelProps={{style: {color: "white"}}}
                />

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
                  !Especialidad.Nombre}
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
  )
}
