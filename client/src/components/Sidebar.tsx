import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Home, Assignment, Dashboard, People } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  width: number;
}

const Sidebar: React.FC<SidebarProps> = ({ width }) => {
  const [activeLink, setActiveLink] = useState<string>('Home');
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600); 
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const links = [
    { name: 'Home', icon: <Home />, path: '/' },
    { name: 'Visitors', icon: <Assignment />, path: '/' },
    { name: 'History', icon: <Dashboard />, path: '/' },
    { name: 'Users', icon: <People />, path: '/' },
  ];

  const showText = width > 120;

  return (
    <Box
      sx={{
        width,
        minHeight: `calc(100vh - 64px)`,
        background: 'linear-gradient(to bottom, #032b40, #06506d)',
        display: 'flex',
        flexDirection: 'column',
        py: 2,
        overflow: 'hidden',
      }}
    >
      {links.map((item) => (
        <Button
          key={item.name}
          onClick={() => {
            setActiveLink(item.name);
            navigate(item.path);
          }}
          fullWidth
          sx={{
            justifyContent: showText ? 'flex-start' : 'center',
            color: 'white',
            fontWeight: activeLink === item.name ? 'bold' : 'normal',
            background:
              activeLink === item.name
                ? 'linear-gradient(to right, #f97316, #ef4444)'
                : 'transparent',
            mb: 1,
            borderRadius: 2,
            px: showText ? 2 : 0,
            py: 1.0,
            minWidth: 0,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textTransform: 'none',
            transition: '0.3s',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: showText ? 'flex-start' : 'center',
              width: '100%',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                minWidth: 24,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {item.icon}
            </Box>
            {showText && (
              <Typography
                variant="body1"
                sx={{
                  ml: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {item.name}
              </Typography>
            )}
          </Box>
        </Button>
      ))}
    </Box>
  );
};

export default Sidebar;
