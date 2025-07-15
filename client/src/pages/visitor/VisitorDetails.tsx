import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {Box, Typography, Button, List, ListItem, Divider,} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { addFollowUpToVisitor } from "../../features/forms/formsSlice";
import FollowUpDialog from "../../components/FollowUpDialog";


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
    <Box sx={{ maxWidth: 600, margin: "auto", p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Visitor Details
      </Typography>

      <Typography>
        <strong>Name:</strong> {visitor.name}
      </Typography>
      <Typography>
        <strong>Contact:</strong> {visitor.contact}
      </Typography>
      <Typography>
        <strong>Visit Date:</strong>{" "}
        {new Date(visitor.visit_date).toLocaleString()}
      </Typography>
      <Typography>
        <strong>Purpose:</strong> {visitor.purpose}
      </Typography>
      <Typography>
        <strong>Outcome:</strong> {visitor.outcome || "N/A"}
      </Typography>
      <Typography>
        <strong>Status:</strong> {visitor.status || "N/A"}
      </Typography>
      <Button
        variant="outlined"
        sx={{ mt: 2 }}
        onClick={() => setOpen(true)}
      >
        Add Follow-up
      </Button>

      <FollowUpDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleAddFollowUp}
      />

      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">Follow-ups</Typography>
        {visitor.followUps && visitor.followUps.length > 0 ? (
          <List>
            {visitor.followUps.map((fup, i) => (
              <ListItem key={i}>
                <Box>
                  <Typography>
                    <strong>Date:</strong>{" "}
                    {new Date(fup.date).toLocaleString()}
                  </Typography>
                  <Typography>
                    <strong>Summary:</strong> {fup.summary}
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No follow-ups yet.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default VisitorDetails;
