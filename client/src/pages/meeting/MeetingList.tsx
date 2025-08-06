import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import FollowUpDialog from "../../components/FollowUpDialog";
import SearchNavbar from "../../components/SearchNavbar";
import { addTheFollowUpToMeeting, selectedMeetingsBasedOnUserId } from "../../features/forms/meetingSlice";
import { selectCurrentUser } from "../../features/user/userSlice";

const MeetingList = () => {
  const userDetails = useSelector(selectCurrentUser);
  const meetings = useSelector(selectedMeetingsBasedOnUserId(userDetails?.id || "", userDetails?.role === "admin" ? "admin" : "user"));
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [followUpIndex, setFollowUpIndex] = useState<number | null>(null);
  const [searchType, setSearchType] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [searchMonth, setSearchMonth] = useState("");
  const [searchDay, setSearchDay] = useState("");

  const handleAddFollowUp = (index: number) => {
    setFollowUpIndex(index);
  };

  const handleFollowUpSubmit = (followUp: { date: string; summary: string }) => {
    if (followUpIndex !== null) {
      dispatch(addTheFollowUpToMeeting({ index: followUpIndex, followUp }));
      setFollowUpIndex(null);
    }
  };

  const handleSearchChange = (field: string, value: string) => {
    if (field === "name") setSearchType(value);
    else if (field === "year") setSearchYear(value);
    else if (field === "month") setSearchMonth(value);
    else if (field === "day") setSearchDay(value);
  };

  const filteredMeetings = meetings.filter((meeting) => {
    const agendaMatch =
      meeting.agenda.toLowerCase().includes(searchType.toLowerCase()) ||
      meeting.type.toLowerCase().includes(searchType.toLowerCase());

    const dateObj = new Date(meeting.date);
    const year = dateObj.getFullYear().toString();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");

    const yearMatch = searchYear ? searchYear === year : true;
    const monthMatch = searchMonth ? searchMonth === month : true;
    const dayMatch = searchDay ? searchDay === day : true;

    return agendaMatch && yearMatch && monthMatch && dayMatch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <SearchNavbar
        title="Meeting List"
        name={searchType}
        year={searchYear}
        month={searchMonth}
        day={searchDay}
        onSearchChange={handleSearchChange}
        search="type"
      />

      <div className="bg-white dark:bg-gray-900 mt-4 p-4 rounded-md shadow-md">
        {filteredMeetings.length === 0 ? (
          <p className="text-center text-gray-500">No meetings found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-black-700 uppercase">
                <tr>
                  <th className="px-4 py-2 center">Date</th>
                  <th className="px-4 py-2 center">Type</th>
                  <th className="px-4 py-2 center">Agenda</th>
                  <th className="px-4 py-2 center">MoM</th>
                  <th className="px-4 py-2 center">Assigned To</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredMeetings.map((meeting, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{new Date(meeting.date).toLocaleString()}</td>
                    <td className="px-4 py-2">{meeting.type}</td>
                    <td className="px-4 py-2">{meeting.agenda}</td>
                    <td className="px-4 py-2">{meeting.mom}</td>
                    <td className="px-4 py-2">{meeting.assignedTo}</td>
                    <td className="px-4 py-2 text-right">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => navigate(`/meeting/${index}`)}
                          className="px-3 py-2 text-md border-none rounded text-white-600 bg-yellow-300 hover:bg-yellow-500 whitespace-nowrap"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleAddFollowUp(index)}
                          className="px-3 py-2 text-md text-white bg-green-600 rounded hover:bg-green-700 whitespace-nowrap border-none"
                        >
                          Follow-up
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <FollowUpDialog
        open={followUpIndex !== null}
        onClose={() => setFollowUpIndex(null)}
        onSubmit={handleFollowUpSubmit}
      />
    </div>
  );
};

export default MeetingList;



