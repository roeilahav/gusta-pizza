import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Tab,
  Tabs,
  Link,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Login as LoginIcon,
  PersonAdd,
  Visibility,
  VisibilityOff,
  Email,
  Phone,
  Lock,
  Person,
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import { TabPanelProps } from '../types';
import { useAuth } from '../contexts/AuthContext';


const TabPanel = ({ children, value, index }: TabPanelProps) => {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [tab, setTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();


  // Login form
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  // Register form
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

const handleLoginSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  const result = await login(loginForm.email, loginForm.password);

  setLoading(false);

  if (result.success) {
    if (loginForm.email === 'admin@gustapizza.com') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  }
};


  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (registerForm.password !== registerForm.confirmPassword) {
      enqueueSnackbar('הסיסמאות אינן תואמות', { variant: 'error' });
      return;
    }

    setLoading(true);

    // כאן תוסיף את הלוגיקה של הרשמה
    // לדוגמה: await authAPI.register(registerForm)

    setTimeout(() => {
      enqueueSnackbar('נרשמת בהצלחה!', { variant: 'success' });
      navigate('/');
    }, 1000);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10, mb: 6 }}>
      <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Box
          sx={{
            background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
            color: 'white',
            py: 3,
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            ברוכים הבאים ל-GustaPizza
          </Typography>
        </Box>

        <Tabs
          value={tab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="התחברות" icon={<LoginIcon />} iconPosition="start" />
          <Tab label="הרשמה" icon={<PersonAdd />} iconPosition="start" />
        </Tabs>

        {/* התחברות */}
        <TabPanel value={tab} index={0}>
          <form onSubmit={handleLoginSubmit}>
            <TextField
              fullWidth
              type="email"
              label="אימייל"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              label="סיסמה"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ textAlign: 'right', mt: 1 }}>
              <Link
                component="button"
                variant="body2"
                onClick={(e) => {
                  e.preventDefault();
                  enqueueSnackbar('אפשרות זו תהיה זמינה בקרוב', { variant: 'info' });
                }}
              >
                שכחת סיסמה?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              התחבר
            </Button>

            <Divider sx={{ my: 2 }}>או</Divider>

            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate('/')}
              sx={{ mb: 2 }}
            >
              המשך כאורח
            </Button>

            {/* כפתורי התחברות מהירה לבדיקות */}
            <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                sx={{ mb: 1 }}
              >
                לבדיקות - התחבר כ:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    setLoginForm({ email: 'admin@gustapizza.com', password: '123456' });
                  }}
                >
                  מנהל
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    setLoginForm({ email: 'user@example.com', password: '123456' });
                  }}
                >
                  לקוח
                </Button>
              </Box>
            </Box>
          </form>
        </TabPanel>

        {/* הרשמה */}
        <TabPanel value={tab} index={1}>
          <form onSubmit={handleRegisterSubmit}>
            <TextField
              fullWidth
              label="שם מלא"
              value={registerForm.name}
              onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              type="email"
              label="אימייל"
              value={registerForm.email}
              onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="טלפון"
              value={registerForm.phone}
              onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              label="סיסמה"
              value={registerForm.password}
              onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              label="אימות סיסמה"
              value={registerForm.confirmPassword}
              onChange={(e) =>
                setRegisterForm({ ...registerForm, confirmPassword: e.target.value })
              }
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Alert severity="info" sx={{ mt: 2 }}>
              בהרשמה אתה מסכים לתנאי השימוש ומדיניות הפרטיות שלנו
            </Alert>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              הירשם
            </Button>
          </form>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default LoginPage;
