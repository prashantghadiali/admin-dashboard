import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography
} from "@mui/material";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { authLogin } from "../redux/action/authentication";

const schema = yup.object().shape({
    mobile_number: yup.number().required("Mobile number is required"),
    password: yup.string().required("Password is required")
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema)
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const onFormSubmit = (data) => {
    authLogin(data, navigate)(dispatch);
  };

  const onErrors = (errors) => console.error("field error:", errors);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', minWidth:'200vh' }}>
       <Container component="main" maxWidth="xs" className="login">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
              bgcolor: 'secondary.main',
              padding:'2vh',
              borderRadius:'9px'
          }}
        >
          <Avatar sx={{ m: 1 }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onFormSubmit, onErrors)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="mobile_number"
              label="Mobile Number"
              autoComplete="mobile_number"
              autoFocus
              type="number"
              error={!!errors.mobile_number}
              helperText={errors.mobile_number?.message || ''}
              {...register("mobile_number")}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password?.message || ''}
              {...register("password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowClick}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Login;



// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// // import { authLogin } from "../../redux/action/authentication";
// import {
//   Avatar,
//   Box,
//   Button,
//   Container,
//   CssBaseline,
//   Grid,
//   IconButton,
//   InputAdornment,
//   Link,
//   TextField,
//   Typography
// } from "@mui/material";
// import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
// import { useNavigate } from 'react-router-dom';
// import { authLogin } from "../redux/action/authentication";

// const schema = yup.object().shape({
//   mobile: yup.number().required("Mobile number is required"),
//   password: yup.string().required("Password is required")
// });

// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     mode: "onBlur",
//     resolver: yupResolver(schema)
//   });
//   const [showPassword, setShowPassword] = useState(false);

//   const handleShowClick = () => setShowPassword(!showPassword);

//   const onFormSubmit = (data) => {
//     authLogin(data, navigate)(dispatch);
//   };

//   const onErrors = (errors) => console.error("field error:", errors);

//   return (
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />
//       <Box
//         sx={{
//           marginTop: 8,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//         }}
//       >
//         <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//           <LockOutlined />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Welcome
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit(onFormSubmit, onErrors)} noValidate sx={{ mt: 1 }}>
//           <TextField
//             margin="normal"
//             fullWidth
//             id="mobile"
//             label="Mobile Number"
//             name="mobile"
//             autoComplete="mobile"
//             autoFocus
//             type="number"
//             error={!!errors.mobile}
//             helperText={errors.mobile ? errors.mobile.message : ''}
//             {...register("mobile")}
//           />
//           <TextField
//             margin="normal"
//             fullWidth
//             name="password"
//             label="Password"
//             type={showPassword ? "text" : "password"}
//             id="password"
//             autoComplete="current-password"
//             error={!!errors.password}
//             helperText={errors.password ? errors.password.message : ''}
//             {...register("password")}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     aria-label="toggle password visibility"
//                     onClick={handleShowClick}
//                     edge="end"
//                   >
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             sx={{ mt: 3, mb: 2 }}
//           >
//             Login
//           </Button>
//           <Grid container>
//             <Grid item xs>
//               <Link href="#" variant="body2">
//                 Forgot password?
//               </Link>
//             </Grid>
//             <Grid item>
//               <Link href="#" variant="body2">
//                 {"Don't have an account? Sign Up"}
//               </Link>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default Login;