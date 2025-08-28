import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ggImg from '../assets/gg.webp'; // adjust path as needed

import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  useTheme,
  Fade,
  Zoom,
  Chip,
  Rating,
  Avatar,
  IconButton,
} from '@mui/material';
import {
  LocalPizza,
  AccessTime,
  LocalShipping,
  Restaurant,
  Star,
  WhatsApp,
  Phone,
  ArrowForward,
  CheckCircle,
  Favorite,
} from '@mui/icons-material';

const HomePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const features = [
    {
      icon: <LocalPizza sx={{ fontSize: 48 }} />,
      title: 'פיצות טריות',
      description: 'נאפות במקום עם המרכיבים הטריים ביותר',
      color: '#DC2626',
    },
    {
      icon: <AccessTime sx={{ fontSize: 48 }} />,
      title: 'משלוח מהיר',
      description: 'עד 30 דקות והפיצה אצלכם',
      color: '#F59E0B',
    },
    {
      icon: <Restaurant sx={{ fontSize: 48 }} />,
      title: 'תפריט מגוון',
      description: 'פיצות, סלטים, קינוחים ומשקאות',
      color: '#10B981',
    },
  ];

  const testimonials = [
    { name: 'יוסי כהן', rating: 5, text: 'הפיצה הכי טובה בבאר שבע!' },
    { name: 'מיכל לוי', rating: 5, text: 'שירות מעולה ומשלוח מהיר' },
    { name: 'דני אברהם', rating: 5, text: 'טעים, טרי ומגיע חם' },
  ];

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '100vh',
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 80%, rgba(252, 211, 77, 0.2) 0%, transparent 50%)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            right: '-20%',
            width: '80%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
            animation: 'float 20s ease-in-out infinite',
          },
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
            '50%': { transform: 'translateY(-20px) rotate(10deg)' },
          },
        }}
      >
        <Container maxWidth="lg" sx={{ zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Fade in={loaded} timeout={1000}>
                <Box>
                  <Chip
                    icon={<Star />}
                    label="מסעדה מומלצת 2024"
                    sx={{
                      mb: 3,
                      backgroundColor: 'rgba(252, 211, 77, 0.2)',
                      color: theme.palette.secondary.main,
                      fontWeight: 'bold',
                      '& .MuiChip-icon': { color: theme.palette.secondary.main },
                    }}
                  />
                  
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: '3rem', md: '5rem' },
                      fontWeight: 800,
                      mb: 2,
                      textShadow: '3px 3px 6px rgba(0,0,0,0.3)',
                      lineHeight: 1.1,
                    }}
                  >
                    <Box component="span" sx={{ color: theme.palette.secondary.main }}>
                      GustaPizza
                    </Box>
                  </Typography>
                  
                  <Typography
                    variant="h4"
                    sx={{
                      mb: 4,
                      fontSize: { xs: '1.5rem', md: '2rem' },
                      opacity: 0.95,
                      fontWeight: 300,
                    }}
                  >
                    הפיצה האיטלקית האותנטית
                    <br />
                    <Box component="span" sx={{ color: theme.palette.secondary.main, fontWeight: 500 }}>
                      בבאר שבע
                    </Box>
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => navigate('/menu')}
                      endIcon={<ArrowForward />}
                      sx={{
                        backgroundColor: theme.palette.secondary.main,
                        color: theme.palette.secondary.contrastText,
                        fontSize: '1.3rem',
                        py: 2,
                        px: 4,
                        borderRadius: 3,
                        boxShadow: '0 8px 32px rgba(252, 211, 77, 0.4)',
                        '&:hover': {
                          backgroundColor: theme.palette.secondary.dark,
                          transform: 'translateY(-3px)',
                          boxShadow: '0 12px 48px rgba(252, 211, 77, 0.5)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      הזמינו עכשיו
                    </Button>
                    
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<WhatsApp />}
                      onClick={() => window.open('https://wa.me/972523918447', '_blank')}
                      sx={{
                        color: 'white',
                        borderColor: 'rgba(255,255,255,0.5)',
                        fontSize: '1.2rem',
                        py: 2,
                        px: 4,
                        borderRadius: 3,
                        backdropFilter: 'blur(10px)',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        '&:hover': {
                          borderColor: 'white',
                          backgroundColor: 'rgba(255,255,255,0.2)',
                          transform: 'translateY(-3px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      WhatsApp
                    </Button>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 3, mt: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircle sx={{ color: theme.palette.secondary.main }} />
                      <Typography>כשר</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircle sx={{ color: theme.palette.secondary.main }} />
                      <Typography>משלוח חינם מ-₪50</Typography>
                    </Box>
                  </Box>
                </Box>
              </Fade>
            </Grid>
            
            <Grid size={{ xs: 12, md: 6 }}>
              <Zoom in={loaded} timeout={1500}>
                <Box
                  sx={{
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '120%',
                      height: '120%',
                      background: 'radial-gradient(circle, rgba(252, 211, 77, 0.3) 0%, transparent 70%)',
                      filter: 'blur(40px)',
                      zIndex: -1,
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={ggImg}
                    alt="GustaPizza"
                    sx={{
                      width: '100%',
                      maxWidth: 600,
                      height: 'auto',
                      filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))',
                      animation: 'float 6s ease-in-out infinite',
                      borderRadius: '20px',
                    }}
                  />
                  {/* <IconButton
                    sx={{
                      position: 'absolute',
                      top: 20,
                      right: 20,
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      color: theme.palette.primary.main,
                      '&:hover': {
                        backgroundColor: 'white',
                        transform: 'scale(1.1)',
                      },
                    }}
                  >
                    <Favorite />
                  </IconButton> */}
                </Box>
              </Zoom>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Fade in={loaded} timeout={2000}>
          <Box>
            <Typography
              variant="h2"
              align="center"
              sx={{
                mb: 2,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 'bold',
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              למה אנחנו מיוחדים?
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="text.secondary"
              sx={{ mb: 8, maxWidth: 600, mx: 'auto' }}
            >
              חוויה קולינרית איטלקית אותנטית עם נגיעה ישראלית
            </Typography>

            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid size={{ xs: 12, md: 4 }} key={index}>
                  <Zoom in={loaded} timeout={1000 + index * 200}>
                    <Card
                      sx={{
                        height: '100%',
                        textAlign: 'center',
                        py: 5,
                        px: 3,
                        background: 'white',
                        position: 'relative',
                        overflow: 'visible',
                        border: '2px solid transparent',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-10px)',
                          borderColor: feature.color,
                          boxShadow: `0 20px 40px ${feature.color}20`,
                          '& .feature-icon': {
                            transform: 'scale(1.2) rotate(10deg)',
                            backgroundColor: feature.color,
                            color: 'white',
                          },
                        },
                      }}
                    >
                      <Box
                        className="feature-icon"
                        sx={{
                          width: 100,
                          height: 100,
                          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                          backgroundColor: `${feature.color}15`,
                          color: feature.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 3,
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </Card>
                  </Zoom>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>
      </Container>

      {/* Testimonials Section */}
      <Box sx={{ backgroundColor: 'grey.50', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="md">
          <Typography
            variant="h3"
            align="center"
            sx={{
              mb: 6,
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 'bold',
              color: theme.palette.primary.main,
            }}
          >
            מה אומרים עלינו?
          </Typography>
          
          <Grid container spacing={3}>
            {testimonials.map((testimonial, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Fade in={loaded} timeout={1500 + index * 200}>
                  <Card
                    sx={{
                      p: 3,
                      height: '100%',
                      textAlign: 'center',
                      border: '2px solid',
                      borderColor: 'grey.200',
                      '&:hover': {
                        borderColor: theme.palette.secondary.main,
                        transform: 'translateY(-5px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                        mx: 'auto',
                        mb: 2,
                        bgcolor: theme.palette.primary.main,
                      }}
                    >
                      {testimonial.name[0]}
                    </Avatar>
                    <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />
                    <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic' }}>
                      "{testimonial.text}"
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {testimonial.name}
                    </Typography>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
          py: { xs: 8, md: 10 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            left: '-20%',
            width: '60%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            transform: 'rotate(45deg)',
          },
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Zoom in={loaded} timeout={2000}>
            <Box>
              <Typography
                variant="h2"
                sx={{
                  mb: 3,
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  fontWeight: 'bold',
                  color: theme.palette.primary.main,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                רעבים? הזמינו עכשיו!
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 5,
                  color: theme.palette.text.primary,
                  opacity: 0.9,
                }}
              >
                משלוחים כל יום בין השעות 11:00-23:00
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/menu')}
                  endIcon={<LocalPizza />}
                  sx={{
                    fontSize: '1.4rem',
                    py: 2.5,
                    px: 5,
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 4,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 12px 48px rgba(0,0,0,0.4)',
                    },
                  }}
                >
                  הזמינו אונליין
                </Button>
                
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Phone />}
                  onClick={() => window.location.href = 'tel:0523918447'}
                  sx={{
                    fontSize: '1.4rem',
                    py: 2.5,
                    px: 5,
                    backgroundColor: 'white',
                    color: theme.palette.primary.main,
                    borderRadius: 4,
                    '&:hover': {
                      backgroundColor: 'grey.100',
                      transform: 'translateY(-3px)',
                    },
                  }}
                >
                  052-391-8447
                </Button>
              </Box>
            </Box>
          </Zoom>
        </Container>
      </Box>
    </>
  );
};

export default HomePage;