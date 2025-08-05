
import MeetingList from "./MeetingList";
import MeetNavbar from "../../components/MeetNavbar";


const MeetHome = () => {
  
    return (
        <>
        <MeetNavbar title={"Meeting Management"} btnText={"Create Meeting"}/>
        
        <div className="bg-white  px-4 py-3 shadow-lg mt-4 rounded-lg">
            <div><MeetingList/></div>
        </div>
        </>
    )
}

export default MeetHome;