import { ReactNode } from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';
import { LayoutProps } from '../../types';


const Layout = ({ children }: LayoutProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, mt: 8 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;