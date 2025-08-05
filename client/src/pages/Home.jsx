
import { Box } from '@mui/material';
import { FaUserPlus, FaTasks, FaEdit, FaHistory } from 'react-icons/fa';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          justifyContent: 'center',
        }}
      >
        <Box onClick={()=>navigate('/visitor')} sx={{ flex: '1 1 250px', maxWidth: '280px' }}>
          
          <Card

            title="Visitor Entry"
            description="Add and manage visitor entries."
            icon={<FaUserPlus size={32} color="#06506d" />}
          />
        </Box>

        <Box sx={{ flex: '1 1 250px', maxWidth: '280px' }} onClick={() => navigate('/meeting')}>
          <Card
            title="Add The Meeting Entry"
            description="add and view meetings Entry."
            icon={<FaTasks size={32} color="#06506d" />}
          />
        </Box>

        <Box  onClick={() => navigate('/visitor-list')} sx={{ flex: '1 1 250px', maxWidth: '280px' }}>
          <Card
            title="Visitor List & Update"
            description="View and edit visitor records."
            icon={<FaEdit size={32} color="#06506d" />}
           
          />
        </Box>

        <Box sx={{ flex: '1 1 250px', maxWidth: '280px' }}>
          <Card
            title="Visitor History"
            description="Track past visitor data."
            icon={<FaHistory size={32} color="#06506d" />}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
