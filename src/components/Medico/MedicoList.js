// import React, { useEffect, useState } from 'react';
// import {
//   Divider,
//   Button,
//   Card,
//   CardContent,
//   Typography,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   InputAdornment,
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import { useNavigate } from 'react-router-dom';

// export default function MedicoList() {
//   const [medicos, setMedicos] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const navigate = useNavigate();

//   const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
//   const [credentials, setCredentials] = useState({ Usuario: '', Password: '' });
//   const [selectedMedicoId, setSelectedMedicoId] = useState(null);
//   const [isValidCredentials, setIsValidCredentials] = useState(true);

//   const loadMedicos = async () => {
//     const response = await fetch('https://deploy-mysql-proyectograduacion-production.up.railway.app/api/medicos');
//     const data = await response.json();
//     setMedicos(data);
//   };

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleEnterKey = (event) => {
//     if (event.key === 'Enter') {
//       filterMedicos(); // Filtrar médicos al presionar "Enter"
//     }
//   };

//   const filterMedicos = () => {
//     const filteredMedicos = medicos.filter((medico) =>
//       medico.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     return filteredMedicos;
//   };

//   const handleDelete = async (IdMedico) => {
//     setSelectedMedicoId(IdMedico);
//     setDeleteConfirmationOpen(true);
//   };

//   const closeDeleteConfirmationDialog = () => {
//     setDeleteConfirmationOpen(false);
//     setCredentials({ Usuario: '', Password: '' });
//     setSelectedMedicoId(null);
//     setIsValidCredentials(true);
//   };

//   const handleCredentialChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials((prevCredentials) => ({
//       ...prevCredentials,
//       [name]: value,
//     }));
//     setIsValidCredentials(true);
//   };

//   const handleDeleteConfirmation = async () => {
//     try {
//       // Lógica de validación de las credenciales en la API
//       const response = await fetch('https://deploy-mysql-proyectograduacion-production.up.railway.app/api/recepcionistas');
//       const data = await response.json();

//       const validCredentials = data.some(
//         (user) =>
//           user.Usuario === credentials.Usuario &&
//           user.Password === credentials.Password
//       );

//       if (validCredentials) {
//         await fetch(`https://deploy-mysql-proyectograduacion-production.up.railway.app/api/medicos/${selectedMedicoId}`, {
//           method: 'DELETE',
//         });
//         setMedicos(medicos.filter((medico) => medico.IdMedico !== selectedMedicoId));
//         closeDeleteConfirmationDialog();
//       } else {
//         setIsValidCredentials(false);
//       }
//     } catch (error) {
//       console.error(error);
//       // Mostrar mensaje de error
//     }
//   };

//   useEffect(() => {
//     loadMedicos();
//   }, []);

  

//   return (
//     <>
//       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}>
//         <div style={{ marginRight: '8px' }}>
//           <h1>Lista de Médicos</h1>
//         </div>
//         <TextField
//           label="Buscar por nombre"
//           value={searchTerm}
//           onChange={handleSearch}
//           onKeyPress={handleEnterKey}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//           fullWidth
//         />
//       </div>

//       <Divider sx={{ marginY: '0.5rem' }} />


//       {filterMedicos().map((medico) => (
//         <Card
//           key={medico.IdMedico}
//           style={{
//             marginBottom: '.7rem',
//             backgroundColor: '#1e272e',
//           }}
//         >
//           <CardContent
//             style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//             }}
//           >
//             <div style={{ color: 'white' }}>
//               <Typography>{`Nombre: ${medico.Nombre}`}</Typography>
//               <Typography>{`Dirección: ${medico.Direccion}`}</Typography>
//               <Typography>{`Teléfono: ${medico.Telefono}`}</Typography>
//               <Typography>{`NIT: ${medico.NIT}`}</Typography>
//               <Typography>{`DPI: ${medico.DPI}`}</Typography>
//               <Typography>{`Especialidad: ${medico.IdEspecialidad}`}</Typography>
//             </div>

//             <div>
//               <Button
//                 variant='contained'
//                 color='inherit'
//                 onClick={() => navigate(`/medico/${medico.IdMedico}/edit`)}
//               >
//                 Editar
//               </Button>

//               <Button
//                 variant='contained'
//                 color='warning'
//                 onClick={() => handleDelete(medico.IdMedico)}
//                 style={{ marginLeft: '.5rem' }}
//               >
//                 Eliminar
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       ))}

//       {/* Diálogo de confirmación */}
//       <Dialog open={deleteConfirmationOpen} onClose={closeDeleteConfirmationDialog}>
//         <DialogTitle>Confirmar Eliminación</DialogTitle>
//         <DialogContent>
//           <TextField
//             label='Usuario'
//             name='Usuario'
//             value={credentials.Usuario}
//             onChange={handleCredentialChange}
//             error={!isValidCredentials && credentials.Usuario !== ''}
//             helperText={!isValidCredentials && credentials.Usuario !== '' ? 'Usuario o password incorrecto' : ''}
//           />
//           <TextField
//             label='Contraseña'
//             name='Password'
//             type='password'
//             value={credentials.Password}
//             onChange={handleCredentialChange}
//             error={!isValidCredentials && credentials.Password !== ''}
//             helperText={!isValidCredentials && credentials.Password !== '' ? 'Usuario o password incorrecto' : ''}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeDeleteConfirmationDialog} color='primary'>
//             Cancelar
//           </Button>
//           <Button onClick={handleDeleteConfirmation} color='primary'>
//             Confirmar
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// }





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
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

export default function MedicoList() {
  const [medicos, setMedicos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [especialidades, setEspecialidades] = useState([]); // Agrega esta línea
  const navigate = useNavigate();

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [credentials, setCredentials] = useState({ Usuario: '', Password: '' });
  const [selectedMedicoId, setSelectedMedicoId] = useState(null);
  const [isValidCredentials, setIsValidCredentials] = useState(true);

  const loadMedicos = async () => {
    const response = await fetch('https://deploy-mysql-proyectograduacion-production.up.railway.app/api/medicos');
    const data = await response.json();
    setMedicos(data);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEnterKey = (event) => {
    if (event.key === 'Enter') {
      filterMedicos(); // Filtrar médicos al presionar "Enter"
    }
  };

  const filterMedicos = () => {
    const filteredMedicos = medicos.filter((medico) =>
      medico.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filteredMedicos;
  };

  const handleDelete = async (IdMedico) => {
    setSelectedMedicoId(IdMedico);
    setDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmationDialog = () => {
    setDeleteConfirmationOpen(false);
    setCredentials({ Usuario: '', Password: '' });
    setSelectedMedicoId(null);
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
        await fetch(`https://deploy-mysql-proyectograduacion-production.up.railway.app/api/medicos/${selectedMedicoId}`, {
          method: 'DELETE',
        });
        setMedicos(medicos.filter((medico) => medico.IdMedico !== selectedMedicoId));
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
    loadMedicos();
    fetch('https://deploy-mysql-proyectograduacion-production.up.railway.app/api/especialidades') // Cargar especialidades
      .then((response) => response.json())
      .then((data) => {
        setEspecialidades(data);
      });
  }, []);

  

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}>
        <div style={{ marginRight: '8px' }}>
          <h1>Lista de Médicos</h1>
        </div>
        <TextField
          label="Buscar por nombre"
          value={searchTerm}
          onChange={handleSearch}
          onKeyPress={handleEnterKey}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
        />
      </div>

      <Divider sx={{ marginY: '0.5rem' }} />


      {filterMedicos().map((medico) => (
  <Card
    key={medico.IdMedico}
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
        <Typography>{`Nombre: ${medico.Nombre}`}</Typography>
        <Typography>{`Dirección: ${medico.Direccion}`}</Typography>
        <Typography>{`Teléfono: ${medico.Telefono}`}</Typography>
        <Typography>{`NIT: ${medico.NIT}`}</Typography>
        <Typography>{`DPI: ${medico.DPI}`}</Typography>
        <Typography>{`Especialidad: ${
          especialidades.find((especialidad) => especialidad.IdEspecialidad === medico.IdEspecialidad)?.Nombre || 'No especificada'
        }`}</Typography> {/* Aquí se busca el nombre de la especialidad */}
      </div>
      
      <div>
             <Button
                variant='contained'
                color='inherit'
                onClick={() => navigate(`/medico/${medico.IdMedico}/edit`)}
              >
                Editar
              </Button>

              <Button
                variant='contained'
                color='warning'
                onClick={() => handleDelete(medico.IdMedico)}
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
    </>
  );
}





