
import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Stack,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { addFollowUpToVisitor } from "../../features/forms/formsSlice";
import FollowUpDialog from "../../components/FollowUpDialog";
import { useNavigate } from "react-router-dom";

import './VisitorList.css';
 

const VisitorList = () => {
  const visitors = useSelector((state: RootState) => state.forms.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [followUpIndex, setFollowUpIndex] = useState<number | null>(null);

  const handleAddFollowUp = (index: number) => {
    setFollowUpIndex(index);
  };

  const handleFollowUpSubmit = (followUp: { date: string; summary: string }) => {
    if (followUpIndex !== null) {
      dispatch(addFollowUpToVisitor({ index: followUpIndex, followUp }));
      setFollowUpIndex(null);
    }
  };

  return (
<Box className="container my-5">
  <Typography variant="h4" className="text-center fw-bold text-primary mb-4">
    Visitor List
  </Typography>

  {visitors.length === 0 ? (
    <Typography className="text-muted text-center">No visitors submitted yet.</Typography>
  ) : (
    <div className="d-flex flex-wrap justify-content-center gap-4">
      {visitors.map((visitor, index) => (
        <div key={index} className="visitor-card card p-4 shadow-sm">
          <div className="text-start">
            <h5 className="fw-bold mb-2">{visitor.name}</h5>
            <p className="mb-1">
              <strong>Contact:</strong> {visitor.contact}
            </p>
            <p className="mb-1">
              <strong>Visit Date:</strong>{" "}
              {new Date(visitor.visit_date).toLocaleString()}
            </p>
            <p className="mb-3">
              <strong>Purpose:</strong>{" "}
              <span className="badge bg-info text-dark">{visitor.purpose}</span>
            </p>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <Button
              variant="outlined"
              size="small"
              className="btn btn-outline-primary"
              onClick={() => navigate(`/visitor/${index}`)}
            >
              View Details
            </Button>
            <Button
              variant="contained"
              size="small"
              className="btn btn-success"
              onClick={() => handleAddFollowUp(index)}
            >
              Add Follow-up
            </Button>
          </div>
        </div>
      ))}
    </div>
  )}

  <FollowUpDialog
    open={followUpIndex !== null}
    onClose={() => setFollowUpIndex(null)}
    onSubmit={handleFollowUpSubmit}
  />
</Box>

  );
};

export default VisitorList;



