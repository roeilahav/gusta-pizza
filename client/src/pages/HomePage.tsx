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
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 50%, #7C1D33 100%)`,
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
            background: 'radial-gradient(ellipse at 30% 20%, rgba(252, 211, 77, 0.3) 0%, transparent 40%), radial-gradient(ellipse at 70% 80%, rgba(220, 38, 38, 0.2) 0%, transparent 50%)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '-30%',
            right: '-15%',
            width: '60%',
            height: '150%',
            background: 'conic-gradient(from 45deg, rgba(252, 211, 77, 0.1) 0deg, transparent 90deg, rgba(255,255,255,0.05) 180deg, transparent 270deg)',
            animation: 'rotate 30s linear infinite',
            borderRadius: '50%',
          },
          '@keyframes rotate': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
          },
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
            '50%': { transform: 'translateY(-20px) rotate(10deg)' },
          },
          '@keyframes spin': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
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
                      fontSize: { xs: '3.5rem', md: '6rem' },
                      fontWeight: 900,
                      mb: 3,
                      textShadow: '4px 4px 12px rgba(0,0,0,0.4)',
                      lineHeight: 0.9,
                      background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, #FFF59D 50%, ${theme.palette.secondary.light} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      position: 'relative',
                      '&::before': {
                        content: '"GustaPizza"',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: -1,
                        background: 'rgba(255,255,255,0.1)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        transform: 'translate(4px, 4px)',
                      },
                    }}
                  >
                    GustaPizza
                  </Typography>
                  
                  <Typography
                    variant="h4"
                    sx={{
                      mb: 5,
                      fontSize: { xs: '1.8rem', md: '2.5rem' },
                      opacity: 0.95,
                      fontWeight: 400,
                      textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
                      '& .highlight': {
                        color: theme.palette.secondary.main,
                        fontWeight: 600,
                        textShadow: '3px 3px 10px rgba(252, 211, 77, 0.4)',
                      },
                    }}
                  >
                    הפיצה האיטלקית
                    <br />
                    <Box component="span" className="highlight">
                      האותנטית בבאר שבע
                    </Box>
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
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

                  <Box sx={{ display: 'flex', gap: { xs: 2, md: 4 }, mt: 5, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.05)' } }}>
                      <CheckCircle sx={{ color: theme.palette.secondary.main, fontSize: '1.4rem' }} />
                      <Typography sx={{ fontWeight: 600, fontSize: '1.1rem' }}>כשר</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.05)' } }}>
                      <CheckCircle sx={{ color: theme.palette.secondary.main, fontSize: '1.4rem' }} />
                      <Typography sx={{ fontWeight: 600, fontSize: '1.1rem' }}>משלוח חינם מ-₪50</Typography>
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
      <Box sx={{ py: { xs: 10, md: 16 }, backgroundColor: '#FAFAFA', position: 'relative' }}>
        <Container maxWidth="lg">
          <Fade in={loaded} timeout={2000}>
            <Box>
              <Typography
                variant="h2"
                align="center"
                sx={{
                  mb: 3,
                  fontSize: { xs: '2.8rem', md: '4rem' },
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 50%, #7C1D33 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 80,
                    height: 4,
                    background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
                    borderRadius: 2,
                  },
                }}
              >
                למה אנחנו מיוחדים?
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                sx={{ mb: 12, maxWidth: 700, mx: 'auto', fontSize: { xs: '1.3rem', md: '1.6rem' }, lineHeight: 1.6 }}
              >
                חוויה קולינרית איטלקית אותנטית עם נגיעה ישראלית ייחודית
              </Typography>

            <Grid container spacing={5}>
              {features.map((feature, index) => (
                <Grid size={{ xs: 12, md: 4 }} key={index}>
                  <Zoom in={loaded} timeout={1200 + index * 300}>
                    <Card
                      sx={{
                        height: '100%',
                        textAlign: 'center',
                        py: 6,
                        px: 4,
                        background: 'linear-gradient(145deg, #FFFFFF 0%, #F9FAFB 100%)',
                        position: 'relative',
                        overflow: 'visible',
                        border: '2px solid transparent',
                        borderRadius: 3,
                        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: `linear-gradient(135deg, ${feature.color}10 0%, transparent 100%)`,
                          opacity: 0,
                          transition: 'opacity 0.4s ease',
                          borderRadius: 'inherit',
                        },
                        '&:hover': {
                          transform: 'translateY(-15px) scale(1.02)',
                          borderColor: feature.color,
                          boxShadow: `0 25px 50px -12px ${feature.color}30, 0 0 0 1px ${feature.color}20`,
                          '&::before': {
                            opacity: 1,
                          },
                          '& .feature-icon': {
                            transform: 'scale(1.3) rotate(15deg)',
                            backgroundColor: feature.color,
                            color: 'white',
                            boxShadow: `0 10px 25px ${feature.color}40`,
                          },
                          '& .feature-title': {
                            color: feature.color,
                          },
                        },
                      }}
                    >
                      <Box
                        className="feature-icon"
                        sx={{
                          width: 120,
                          height: 120,
                          borderRadius: '25% 75% 75% 25% / 25% 25% 75% 75%',
                          backgroundColor: `${feature.color}15`,
                          color: feature.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 4,
                          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                          position: 'relative',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: '-5px',
                            left: '-5px',
                            right: '-5px',
                            bottom: '-5px',
                            borderRadius: 'inherit',
                            background: `conic-gradient(from 0deg, ${feature.color}30, transparent, ${feature.color}30)`,
                            zIndex: -1,
                            opacity: 0,
                            animation: 'spin 3s linear infinite',
                          },
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography 
                        variant="h5" 
                        className="feature-title"
                        gutterBottom 
                        sx={{ fontWeight: 700, mb: 2, transition: 'color 0.3s ease' }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        color="text.secondary"
                        sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}
                      >
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
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            right: '-5%',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${theme.palette.secondary.main}20 0%, transparent 70%)`,
            opacity: 0.6,
            animation: 'float 8s ease-in-out infinite',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '15%',
            left: '-3%',
            width: 150,
            height: 150,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${theme.palette.primary.main}15 0%, transparent 70%)`,
            opacity: 0.7,
            animation: 'float 6s ease-in-out infinite reverse',
          }}
        />
      </Box>

      {/* Testimonials Section */}
      <Box 
        sx={{ 
          background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, #FEF3E2 50%, ${theme.palette.background.default} 100%)`,
          py: { xs: 10, md: 16 },
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'60\' viewBox=\'0 0 60 60\'%3E%3Cg fill-rule=\'evenodd\'%3E%3Cg fill=\'%23FCD34D\' fill-opacity=\'0.05\'%3E%3Cpath d=\'m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            sx={{
              mb: 4,
              fontSize: { xs: '2.5rem', md: '3.8rem' },
              fontWeight: 800,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-15px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 100,
                height: 4,
                background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
                borderRadius: 2,
              },
            }}
          >
            מה אומרים עלינו?
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ mb: 10, fontSize: '1.3rem', maxWidth: 600, mx: 'auto' }}
          >
            שימו לב למה שהלקוחות שלנו אומרים עלינו
          </Typography>
          
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Fade in={loaded} timeout={1800 + index * 300}>
                  <Card
                    sx={{
                      p: 5,
                      height: '100%',
                      textAlign: 'center',
                      background: 'linear-gradient(145deg, #FFFFFF 0%, #FEFEFE 100%)',
                      border: '1px solid',
                      borderColor: 'rgba(220, 38, 38, 0.1)',
                      borderRadius: 4,
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      '&::before': {
                        content: '"\"201C"',
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        fontSize: '4rem',
                        color: theme.palette.secondary.main,
                        opacity: 0.3,
                        fontFamily: 'Georgia, serif',
                        lineHeight: 1,
                      },
                      '&:hover': {
                        borderColor: theme.palette.secondary.main,
                        transform: 'translateY(-10px) scale(1.03)',
                        boxShadow: `0 20px 40px -10px rgba(220, 38, 38, 0.2), 0 0 0 1px ${theme.palette.secondary.main}20`,
                        '& .testimonial-avatar': {
                          transform: 'scale(1.1)',
                          boxShadow: `0 8px 25px ${theme.palette.primary.main}30`,
                        },
                        '& .testimonial-rating': {
                          '& .MuiRating-iconFilled': {
                            color: theme.palette.secondary.main,
                            transform: 'scale(1.1)',
                          },
                        },
                      },
                    }}
                  >
                    <Avatar
                      className="testimonial-avatar"
                      sx={{
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 3,
                        bgcolor: theme.palette.primary.main,
                        fontSize: '2rem',
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease',
                        border: `3px solid ${theme.palette.secondary.main}30`,
                      }}
                    >
                      {testimonial.name[0]}
                    </Avatar>
                    <Rating 
                      className="testimonial-rating"
                      value={testimonial.rating} 
                      readOnly 
                      sx={{ 
                        mb: 3,
                        '& .MuiRating-iconFilled': {
                          color: theme.palette.primary.main,
                          transition: 'all 0.3s ease',
                        },
                        '& .MuiRating-iconEmpty': {
                          color: 'rgba(220, 38, 38, 0.2)',
                        },
                      }} 
                    />
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        mb: 3, 
                        fontStyle: 'italic',
                        fontSize: '1.1rem',
                        lineHeight: 1.6,
                        position: 'relative',
                        zIndex: 1,
                        '&::before': {
                          content: '"\"201C"',
                          fontSize: '1.5rem',
                          color: theme.palette.secondary.main,
                          marginRight: '0.2rem',
                        },
                        '&::after': {
                          content: '"\"201D"',
                          fontSize: '1.5rem',
                          color: theme.palette.secondary.main,
                          marginLeft: '0.2rem',
                        },
                      }}
                    >
                      {testimonial.text}
                    </Typography>
                    <Typography 
                      variant="h6" 
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.primary.main,
                        position: 'relative',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: '-10px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 30,
                          height: 2,
                          backgroundColor: theme.palette.secondary.main,
                          borderRadius: 1,
                        },
                      }}
                    >
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
        <Box
          sx={{
            position: 'absolute',
            top: '5%',
            left: '5%',
            fontSize: '6rem',
            opacity: 0.1,
            animation: 'float 4s ease-in-out infinite',
          }}
        >
          🍕
        </Box>
        <Box
          sx={{
            position: 'absolute',
            bottom: '10%',
            right: '8%',
            fontSize: '4rem',
            opacity: 0.1,
            animation: 'float 5s ease-in-out infinite reverse',
          }}
        >
          🍴
        </Box>
      </Box>
    </>
  );
};

export default HomePage;