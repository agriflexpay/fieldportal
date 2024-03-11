
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { handleSignIn} from "../../../lib/authApiRoutes";
import { useRouter } from "next/router";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignInSide() {
  const router = useRouter()
  const [error, setError] = useState("");

  const singinSchema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const handleFormSubmit = (values: any) => {
    const data:any ={
      email:values.email,
      password:values.password
    }
    handleSignIn(data)
  };
  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 8,
        }}
      >
        <Grid container>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(https://source.unsplash.com/random)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              {error && <Typography color="error">{error}</Typography>}
              <Formik
                initialValues={initialValues}
                validationSchema={singinSchema}
                onSubmit={handleFormSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <form
                    onSubmit={handleSubmit}
                  >
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      value={values.email}
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.email && errors.email)}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.password && errors.password)}
                    />
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In
                    </Button>

                    <Grid container>
                      <Grid item xs>
                        <Link href="#" variant="body2">
                          Forgot password?
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link href="/auth/signup" variant="body2">
                          {"Don't have an account? Sign Up"}
                        </Link>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
