// import React, { useState } from 'react';
// import { Button, Card, CircularProgress, Grid, TextField, Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

// const defaultTheme = createTheme();

// export default function SignInForm({ onLogin }) {
//   const [credentials, setCredentials] = useState({
//     Usuario: '',
//     Password: '',
//     Nombre: ''
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setLoading(true);

//     try {
//       // Replace this with your actual API call
//       const response = await fetch('https://deploy-mysql-proyectograduacion-production.up.railway.app/api/recepcionistas');
//       const data = await response.json();

//       // Simulating the login process by matching credentials from API response
//       const matchingUser = data.find(user => user.Usuario === credentials.Usuario && user.Password === credentials.Password);

//       if (matchingUser) {
//         // Successful login
//         setError(null);
//         console.log('Logged in successfully');
//         onLogin(matchingUser.Nombre); // Pasa el nombre del usuario al onLogin
//         localStorage.setItem('userName', matchingUser.Nombre); // Store the username
//         navigate('/ver/cita');
//       } else {
//         setError('Usuario o contraseña incorrectos');
//       }
//     } catch (error) {
//       console.error(error);
//       setError('Ocurrió un error al iniciar sesión');
//     }

//     setLoading(false);
//   };

//   const handleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Grid container>
//         <Grid item xs={6}>
//           {/* Imagen */}
//           <div
//             style={{
//               backgroundImage: 'url(https://mibluemedical.com/wp-content/uploads/2021/02/Captura-de-Pantalla-2021-01-28-a-las-09.35.49-1024x676.png)',
//               backgroundRepeat: 'no-repeat',
//               backgroundSize: 'cover',
//               backgroundPosition: 'center',
//               width: '100%',
//               height: '100vh',
//             }}
//           />
//         </Grid>
//         <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//           {/* Formulario de inicio de sesión */}
//           <Card
//             sx={{
//               width: '80%',
//               padding: '2rem',
//             }}
//           >
//                  <div
//                   style={{
//                     backgroundImage: 'url(https://cdn-icons-png.flaticon.com/512/2771/2771402.png)',
//                     backgroundRepeat: 'no-repeat',
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                     width: '15%',
//                     height: '10vh',
//                     display: 'flex',
//                     margin: 'auto',
//                   }}
//                 />

//             <Typography variant="h5" textAlign="center" gutterBottom>
//               Iniciar Sesión
//             </Typography>
            

//             <form onSubmit={handleSubmit}>
//               <TextField
//                 variant="outlined"
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="Usuario"
//                 label="Usuario"
//                 name="Usuario"
//                 autoComplete="off"
//                 autoFocus
//                 value={credentials.Usuario}
//                 onChange={handleChange}
//               />
//               <TextField
//                 variant="outlined"
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="Password"
//                 label="Contraseña"
//                 type="password"
//                 id="Password"
//                 autoComplete="current-password"
//                 value={credentials.Password}
//                 onChange={handleChange}
//               />
//               {error && (
//                 <Typography variant="body2" color="error" sx={{ marginBottom: '1rem' }}>
//                   {error}
//                 </Typography>
//               )}
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 color="primary"
//                 sx={{ mt: 3 }}
//                 disabled={!credentials.Usuario || !credentials.Password || loading}
//               >
//                 {loading ? <CircularProgress color="inherit" size={24} /> : 'Iniciar Sesión'}
//               </Button>
//             </form>
//           </Card>
//         </Grid>
//       </Grid>
//     </ThemeProvider>
//   );
// }




import React, { useState } from 'react';
import { Button, Card, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function SignInForm({ onLogin }) {
  const [credentials, setCredentials] = useState({
    Usuario: '',
    Password: '',
    Nombre: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // Replace this with your actual API call
      const response = await fetch('https://deploy-mysql-proyectograduacion-production.up.railway.app/api/recepcionistas');
      const data = await response.json();

      // Simulating the login process by matching credentials from API response
      const matchingUser = data.find(user => user.Usuario === credentials.Usuario && user.Password === credentials.Password);

      if (matchingUser) {
        // Successful login
        setError(null);
        console.log('Logged in successfully');
        onLogin(matchingUser.Nombre); // Pasa el nombre del usuario al onLogin
        localStorage.setItem('userName', matchingUser.Nombre); // Store the username
        navigate('/bienvenido');
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error(error);
      setError('Ocurrió un error al iniciar sesión');
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container>
        <Grid item xs={6}>
          {/* Imagen */}
          <div
            style={{
              backgroundImage: 'url(https://mibluemedical.com/wp-content/uploads/2021/02/Captura-de-Pantalla-2021-01-28-a-las-09.35.49-1024x676.png)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100%',
              height: '100vh',
            }}
          />
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Formulario de inicio de sesión */}
          <Card
            sx={{
              width: '80%',
              padding: '2rem',
            }}
          >
                 <div
                  style={{
                    backgroundImage: 'url(https://cdn-icons-png.flaticon.com/512/2771/2771402.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '15%',
                    height: '10vh',
                    display: 'flex',
                    margin: 'auto',
                  }}
                />

            <Typography variant="h5" textAlign="center" gutterBottom>
              Iniciar Sesión
            </Typography>
            
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Usuario"
                label="Usuario"
                name="Usuario"
                autoComplete="off"
                autoFocus
                value={credentials.Usuario}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="Password"
                label="Contraseña"
                type="password"
                id="Password"
                autoComplete="current-password"
                value={credentials.Password}
                onChange={handleChange}
              />
              {error && (
                <Typography variant="body2" color="error" sx={{ marginBottom: '1rem' }}>
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
                disabled={!credentials.Usuario || !credentials.Password || loading}
              >
                {loading ? <CircularProgress color="inherit" size={24} /> : 'Iniciar Sesión'}
              </Button>
            </form>
          </Card>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

