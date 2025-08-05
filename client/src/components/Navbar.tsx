import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Avatar, Badge, Menu, MenuItem, } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useSelector } from 'react-redux';
import { selectNotifications } from '../features/forms/meetingSlice';
// import { useTheme } from '@mui/material/styles';

const Navbar: React.FC = () => {
  // const theme = useTheme();
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const userDetails = useSelector((state: any) => state.userDetails);
  const notifications = useSelector(selectNotifications(userDetails?.userId));

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    window.location.href = '/login';
    handleClose();
  };

  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e0e0e0',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: { xs: 2, sm: 3 },
          minHeight: { xs: 56, sm: 64 },
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              fontWeight: 'bold',
              letterSpacing: 1,
              color: '#1f2937',
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
            }}
          >
            COMS
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2.5 } }}>
          {/* Notifications */}
          <IconButton
            sx={{ color: '#4b5563' }}
            onClick={(e) => setAnchorEl({ type: 'notifications', target: e.currentTarget } as any)}
            aria-label="show notifications"
          >
            <Badge color="error" badgeContent={notifications?.length || 0}>
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={anchorEl && (anchorEl as any).type === 'notifications' ? (anchorEl as any).target : null}
            open={Boolean(anchorEl && (anchorEl as any).type === 'notifications')}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: {
          mt: 1,
          minWidth: 250,
              },
            }}
          >
            {notifications && notifications.length > 0 ? (
              notifications.map((notif: any, idx: number) => (
          <MenuItem key={idx}>
            <Box>
              <Typography variant="subtitle2">{notif.title}</Typography>
              <Typography variant="caption" color="text.secondary">
                {notif.message}
              </Typography>
            </Box>
          </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No notifications</MenuItem>
            )}
          </Menu>

          {/* Avatar/Profile */}
          <IconButton onClick={(e) => setAnchorEl({ type: 'profile', target: e.currentTarget } as any)}>
            <Avatar
              alt="Profile"
              src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"
              sx={{
          width: { xs: 30, sm: 36 },
          height: { xs: 30, sm: 36 },
              }}
            />
          </IconButton>
          <Menu
            anchorEl={anchorEl && (anchorEl as any).type === 'profile' ? (anchorEl as any).target : null}
            open={Boolean(anchorEl && (anchorEl as any).type === 'profile')}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: {
          mt: 1,
          minWidth: 150,
              },
            }}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
