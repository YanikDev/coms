import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import FollowUpDialog from "../../components/FollowUpDialog";
import SearchNavbar from "../../components/SearchNavbar";
import { addFollowUpToVisitor } from "../../features/forms/formsSlice";

const VisitorList = () => {
  const visitors = useSelector((state: RootState) => state.forms.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [followUpIndex, setFollowUpIndex] = useState<number | null>(null);
  const [searchName, setSearchName] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [searchMonth, setSearchMonth] = useState("");
  const [searchDay, setSearchDay] = useState("");

  const handleAddFollowUp = (index: number) => {
    setFollowUpIndex(index);
  };

  const handleFollowUpSubmit = (followUp: { date: string; summary: string }) => {
    if (followUpIndex !== null) {
      dispatch(addFollowUpToVisitor({ index: followUpIndex, followUp }));
      setFollowUpIndex(null);
    }
  };

  const handleSearchChange = (field: string, value: string) => {
    if (field === "name") setSearchName(value);
    else if (field === "year") setSearchYear(value);
    else if (field === "month") setSearchMonth(value);
    else if (field === "day") setSearchDay(value);
  };

  const filteredVisitors = visitors.filter((visitor) => {
    const nameMatch = visitor.name.toLowerCase().includes(searchName.toLowerCase());

    const dateObj = new Date(visitor.visit_date);
    const year = dateObj.getFullYear().toString();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");

    const yearMatch = searchYear ? year === searchYear : true;
    const monthMatch = searchMonth ? month === searchMonth : true;
    const dayMatch = searchDay ? day === searchDay : true;

    return nameMatch && yearMatch && monthMatch && dayMatch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <SearchNavbar
        title="Visitor List"
        name={searchName}
        year={searchYear}
        month={searchMonth}
        day={searchDay}
        onSearchChange={handleSearchChange}
      />

      <div className="bg-white dark:bg-gray-900 mt-4 p-4 rounded-md shadow-md">
        {filteredVisitors.length === 0 ? (
          <p className="text-center text-gray-500">No visitors found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-black-700 uppercase">
                <tr>
                  <th className="px-4 py-2 center">Name</th>
                  <th className="px-4 py-2 center">Contact</th>
                  <th className="px-4 py-2 center">Visit Date</th>
                  <th className="px-4 py-2 center">Purpose</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredVisitors.map((visitor, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{visitor.name}</td>
                    <td className="px-4 py-2">{visitor.contact}</td>
                    <td className="px-4 py-2">
                      {new Date(visitor.visit_date).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 capitalize">{visitor.purpose}</td>
                    <td className="px-4 py-2 text-right">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => navigate(`/visitor/${index}`)}
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

export default VisitorList;
