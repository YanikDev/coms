import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { addFollowUpToVisitor } from "../../features/forms/formsSlice";
import { useNavigate } from "react-router-dom";
import FollowUpDialog from "../../components/FollowUpDialog";


const VisitorList = () => {
  const visitors = useSelector((state: RootState) => state.forms.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [followUpIndex, setFollowUpIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const handleAddFollowUp = (index: number) => {
    setFollowUpIndex(index);
  };

  const handleFollowUpSubmit = (followUp: { date: string; summary: string }) => {
    if (followUpIndex !== null) {
      dispatch(addFollowUpToVisitor({ index: followUpIndex, followUp }));
      setFollowUpIndex(null);
    }
  };

  const filteredVisitors = visitors.filter((visitor) => {
    const matchName = visitor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDate = searchDate
      ? new Date(visitor.visit_date).toISOString().slice(0, 10) === searchDate
      : true;
    return matchName && matchDate;
  });

  return (
    <div className="container py-5">
      <div className="card shadow p-4">
        <h2 className="text-center text-primary fw-bold mb-4">Visitor List</h2>

        
        <div className="row g-3 justify-content-center mb-4">
          <div className="col-md-5">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search by Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <input
              type="date"
              className="form-control form-control-lg"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
          </div>
        </div>

        {filteredVisitors.length === 0 ? (
          <p className="text-center text-muted fs-5">No visitors found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead className="table-primary">
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Visit Date</th>
                  <th>Purpose</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredVisitors.map((visitor, index) => (
                  <tr key={index}>
                    <td>{visitor.name}</td>
                    <td>{visitor.contact}</td>
                    <td>{new Date(visitor.visit_date).toLocaleString()}</td>
                    <td className="text-capitalize fw-medium">{visitor.purpose}</td>
                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-2">
                        <button
                          className="btn btn-outline-primary btn-sm px-3"
                          onClick={() => navigate(`/visitor/${index}`)}
                        >
                          View
                        </button>
                        <button
                          className="btn btn-success btn-sm px-3 text-white"
                          onClick={() => handleAddFollowUp(index)}
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

    
        <FollowUpDialog
          open={followUpIndex !== null}
          onClose={() => setFollowUpIndex(null)}
          onSubmit={handleFollowUpSubmit}
        />
      </div>
    </div>
  );
};

export default VisitorList;
