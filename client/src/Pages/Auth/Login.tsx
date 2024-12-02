import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import loginImage from "./assets/login.jpg";
import { useDispatch } from "react-redux";
import { login } from "../../Store/slices/auth/auth";
import { useLoginApiMutation } from "../../Store/api/auth/authSlice";
import { useNavigate } from "react-router-dom";
import useAuthRedirect from "../../hooks/useAuthRedirect";
interface LoginFormInputs {
  email: string;
  password: string;
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#1e3a8a", // Tailwind Blue 800
    },
    secondary: {
      main: "#9333ea", // Tailwind Purple 600
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif", // Tailwind's default font family
  },
});

const Login: React.FC = () => {
  useAuthRedirect();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const dispatch = useDispatch();

  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [loginApi] = useLoginApiMutation();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      console.log(data);

      // Call the login API
      const response = await loginApi(data).unwrap();

      // Extract and log the token
      console.log(response);
      const token = response.accessToken; // Assumes response contains the accessToken
      console.log("Token received:", token);

      // Dispatch the token to Redux
      dispatch(login({ token }));
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      // Optional: Handle login failure (e.g., show an error message)
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="flex h-screen">
        {/* Left Side: Image */}
        <div className="w-[70%] hidden md:block">
          <img
            src={loginImage}
            alt="Professional workspace"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Side: Login Form */}
        <div className="flex items-center justify-center w-full md:w-[30%] bg-white px-8">
          <div className="w-full max-w-xl">
            {/* Company Logo */}
            <div className="flex justify-center mb-6">
              <img src="/beWi.svg" alt="icon" width="100" />
            </div>

            {/* Welcome Message */}
            <h2 className="mb-6 text-3xl font-semibold text-center text-blue-800">
              Welcome Back To BeWi
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Input */}
              <TextField
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              {/* Password Input with Toggle Visibility */}
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                variant="outlined"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={togglePasswordVisibility}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className="transition-all hover:scale-105 focus:scale-105"
              >
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Login;
