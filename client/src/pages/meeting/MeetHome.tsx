import { useNavigate } from "react-router-dom";
import MeetingList from "./MeetingList";


const MeetHome = () => {
    const navigate = useNavigate();
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <h1>Meeting Management</h1>
            <p>Manage your meetings efficiently with our platform.</p>
            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <button onClick={() => navigate("/meetingAdd")}>Add Meeting</button>
                
            </div>
            <div><MeetingList/></div>
        </div>
    )
}

export default MeetHome;