import {useEffect, useState} from 'react'
import {Button, Card, CardContent, Typography} from '@mui/material'
import {useNavigate} from 'react-router-dom'

export default function EspecialidadList() {

  const [Especialidad, setEspecialidad] = useState([])
  const navigate = useNavigate()

  const loadespecialidad = async() => {
    const response = await fetch('https://deploy-mysql-proyectograduacion-production.up.railway.app/api/especialidades')
    const data = await response.json()
    setEspecialidad(data)
  }
 
  const handleDelete = async (IdEspecialidad) => {
      await fetch(`https://deploy-mysql-proyectograduacion-production.up.railway.app/api/especialidades/${IdEspecialidad}`, {
      method: "DELETE",
    })
    setEspecialidad(Especialidad.filter((Especialidad) => Especialidad.IdEspecialidad !== IdEspecialidad));
  }

  useEffect(() => {
    loadespecialidad()
  }, [])

  return (
    <>
      <h1>Lista de Especialidad</h1>
      {
      Especialidad.map((Especialidad) => (
        <Card style={{
          marginBottom: ".7rem",
          backgroundColor: '#1e272e'
        }}>
        <CardContent style={{
          display: "flex",
          justifyContent: "space-between"
        }}
        >
          <div style={{color: 'white'}}>
            <Typography >{Especialidad.Nombre}</Typography>
          </div>
          
          <div>
            <Button
                  variant='contained' 
                  color='inherit' 
                  onClick={()=> navigate(`/especialidad/${Especialidad.IdEspecialidad}/edit`)}
            >
              Editar
            </Button>

            <Button
                  variant='contained' 
                  color='warning' 
                  onClick={()=> handleDelete(Especialidad.IdEspecialidad)}
                  style={{ marginLeft: ".5rem"}}          
            >
              Eliminar 
            </Button>
          </div>

        </CardContent>
      </Card>
      ))}
    </>
  )
}


