import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button, List, ListItem, } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { addFollowUpToVisitor } from "../../features/forms/formsSlice";
import FollowUpDialog from "../../components/FollowUpDialog";
import "./VisitorDetails.css";

const VisitorDetails = () => {
  const { id } = useParams();
  const visitorIndex = Number(id);
  const visitor = useSelector(
    (state: RootState) => state.forms.data[visitorIndex]
  );
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleAddFollowUp = (followUp: { date: string; summary: string }) => {
    dispatch(addFollowUpToVisitor({ index: visitorIndex, followUp }));
    setOpen(false);
  };

  if (!visitor) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" color="error">
          Visitor not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="container mt-4 visitor-details-box">
      <div className="row animate-slide">
        <div className="col-md-6 mb-4">
          <div className="visitor-box p-4 shadow rounded bg-white animate-fade">
            <Typography variant="h5" className="mb-4 text-primary fw-bold text-center">
              Visitor Details
            </Typography>

            <div className="mb-3">
              <strong className="me-2">Name:</strong>
              <span className="text-dark">{visitor.name}</span>
            </div>

            <div className="mb-3">
              <strong className="me-2">Contact:</strong>
              <span className="text-dark">{visitor.contact}</span>
            </div>

            <div className="mb-3">
              <strong className="me-2">Visit Date:</strong>
              <span className="text-dark">{new Date(visitor.visit_date).toLocaleString()}</span>
            </div>

            <div className="mb-3">
              <strong className="me-2">Purpose:</strong>
              <span className="text-dark">{visitor.purpose}</span>
            </div>

            <div className="mb-3">
              <strong className="me-2">Outcome:</strong>
              <span className={visitor.outcome ? "text-dark" : "text-muted"}>
                {visitor.outcome || "N/A"}
              </span>
            </div>

            <div className="mb-4">
              <strong className="me-2">Status:</strong>
              <span className="fw-semibold text-warning">{visitor.status || "N/A"}</span>
            </div>

            <Button
              variant="outlined"
              onClick={() => setOpen(true)}
              className="w-100 btn btn-outline-primary animated-button"
            >
              Add Follow-up
            </Button>
          </div>
        </div>

        <div className="col-md-6">
          <div className="p-4 shadow rounded bg-white h-90 d-flex flex-column">
            <Typography variant="h6" className="mb-3 text-success fw-bold">
              Follow-ups
            </Typography>

            {visitor.followUps && visitor.followUps.length > 0 ? (
              <List className="flex-grow-1 overflow-auto">
                {visitor.followUps.map((fup, i) => (
                  <ListItem
                    key={i}
                    className="mb-3 px-0 border-bottom pb-2 d-block"
                    style={{ background: "#f9f9f9", borderRadius: "10px" }}
                  >
                    <div className="px-3 py-2">
                      <Typography className="mb-1">
                        <strong>Date:</strong> {new Date(fup.date).toLocaleString()}
                      </Typography>
                      <Typography>
                        <strong>Summary:</strong> {fup.summary}
                      </Typography>
                    </div>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography className="text-muted">No follow-ups yet.</Typography>
            )}
          </div>
        </div>

      </div>

      <FollowUpDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleAddFollowUp}
      />
    </Box>
  );
};

export default VisitorDetails;
