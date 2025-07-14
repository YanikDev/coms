import React, { useState, useRef, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Box, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  const [sidebarWidth, setSidebarWidth] = useState<number>(180);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const isResizing = useRef<boolean>(false);
  const navbarHeight = 64;

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 600;
      setIsMobile(mobile);
      setSidebarWidth(mobile ? 60 : 180);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    isResizing.current = true;
    setIsDragging(true);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return;
    const newWidth = e.clientX;

    if (isMobile) {
      if (newWidth >= 60 && newWidth <= 140) {
        setSidebarWidth(newWidth);
      }
    } else {
      if (newWidth >= 60 && newWidth <= 300) {
        setSidebarWidth(newWidth);
      }
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    setIsDragging(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <CssBaseline />

      <Box
        sx={{
          height: `${navbarHeight}px`,
          width: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Navbar />
      </Box>

      <Box sx={{ display: 'flex', flexGrow: 1, mt: `${navbarHeight}px` }}>
        <Box
          sx={{
            width: `${sidebarWidth}px`,
            position: 'fixed',
            top: `${navbarHeight}px`,
            bottom: 0,
            left: 0,
            zIndex: (theme) => theme.zIndex.drawer,
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Sidebar width={sidebarWidth} />

          <Box
            onMouseDown={handleMouseDown}
            sx={{
              width: '4px',
              cursor: 'col-resize',
              position: 'relative',
              backgroundColor: 'black',
              '&:hover::after': {
                opacity: 1,
              },
              '&::after': {
                content: isDragging ? '"⬌"' : '""',
                color: 'green',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '16px',
                fontWeight: 'bold',
                opacity: isDragging ? 1 : 0,
                pointerEvents: 'none',
                transition: 'opacity 0.2s',
              },
            }}
          />
        </Box>


        <Box
          component="main"
          sx={{
            ml: `${sidebarWidth}px`,
            width: `calc(100% - ${sidebarWidth}px)`,
            height: `calc(100vh - ${navbarHeight}px)`,
            overflowY: 'auto',
            bgcolor: 'grey.100',
            p: { xs: 2, sm: 3 },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
