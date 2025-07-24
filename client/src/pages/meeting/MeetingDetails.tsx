import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button, List, ListItem } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { addTheFollowUpToMeeting, selectMeetingByIndex } from "../../features/forms/meetingSlice";

import FollowUpDialog from "../../components/FollowUpDialog";

const MeetingDetails = () => {
  const { id } = useParams();
  const meetingIndex = Number(id);
const currentMeeting = useSelector(selectMeetingByIndex(meetingIndex));
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleAddFollowUp = (followUp: { date: string; summary: string }) => {
    dispatch(addTheFollowUpToMeeting({ index: meetingIndex, followUp }));
    setOpen(false);
  };

  if (!currentMeeting) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6" color="error">
          Meeting not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="container mt-4">
      <div className="row">
        <div className="col-md-6 mb-4">
          <Box className="p-4 shadow rounded bg-white">
            <Typography variant="h5" className="mb-4 text-primary fw-bold text-center">
              Meeting Details
            </Typography>

            <div className="mb-3">
              <strong>Date:</strong> {new Date(currentMeeting.date).toLocaleString()}
            </div>

            <div className="mb-3">
              <strong>Type:</strong> {currentMeeting.type}
            </div>

            <div className="mb-3">
              <strong>Agenda:</strong> {currentMeeting.agenda}
            </div>

            <div className="mb-3">
              <strong>MoM:</strong> {currentMeeting.mom}
            </div>

            <div className="mb-3">
              <strong>Action Points:</strong> {currentMeeting.actionPoints}
            </div>

            <div className="mb-4">
              <strong>Assigned To:</strong> {currentMeeting.assignedTo}
            </div>

            <Button
              variant="outlined"
              onClick={() => setOpen(true)}
              fullWidth
            >
              Add Follow-up
            </Button>
          </Box>
        </div>

        <div className="col-md-6">
          <Box className="p-4 shadow rounded bg-white h-100 d-flex flex-column">
            <Typography variant="h6" className="mb-3 text-success fw-bold">
              Follow-ups
            </Typography>

            {currentMeeting?.followUps && currentMeeting.followUps.length > 0 ?  (
              <List className="flex-grow-1 overflow-auto">
                {currentMeeting?.followUps?.map((fup: { date: string | number | Date; summary: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }, i: React.Key | null | undefined) => (
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
          </Box>
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

export default MeetingDetails;
