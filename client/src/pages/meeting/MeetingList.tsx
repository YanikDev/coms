import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";

import { useNavigate } from "react-router-dom";
import FollowUpDialog from "../../components/FollowUpDialog";
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { addTheFollowUpToMeeting } from "../../features/forms/meetingSlice";

const MeetingList = () => {
  const meetings = useSelector((state: RootState) => state.meeting.meetings);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [followUpIndex, setFollowUpIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const handleAddFollowUp = (index: number) => {
    setFollowUpIndex(index);
  };

  const handleFollowUpSubmit = (followUp: { date: string; summary: string }) => {
    if (followUpIndex !== null) {
      dispatch(addTheFollowUpToMeeting({ index: followUpIndex, followUp }));
      setFollowUpIndex(null);
    }
  };

  const filteredMeetings = meetings.filter((meeting) => {
    const matchAgenda = meeting.agenda.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDate = searchDate
      ? new Date(meeting.date).toISOString().slice(0, 10) === searchDate
      : true;
    return matchAgenda && matchDate;
  });

  return (
    <Container sx={{ py: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" textAlign="center" color="primary" fontWeight="bold" mb={4}>
          Meeting List
        </Typography>

        <Box display="flex" gap={2} justifyContent="center" mb={3}>
          <TextField
            variant="outlined"
            label="Search by Agenda"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
          />
          <TextField
            type="date"
            label="Search by Date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        {filteredMeetings.length === 0 ? (
          <Typography textAlign="center" color="text.secondary">
            No meetings found.
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
                  <TableCell>Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Agenda</TableCell>
                  <TableCell>MoM</TableCell>
                  <TableCell>Assigned To</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredMeetings.map((meeting, index) => (
                  <TableRow key={index}>
                    <TableCell>{new Date(meeting.date).toLocaleString()}</TableCell>
                    <TableCell>{meeting.type}</TableCell>
                    <TableCell>{meeting.agenda}</TableCell>
                    <TableCell>{meeting.mom}</TableCell>
                    <TableCell>{meeting.assignedTo}</TableCell>
                    <TableCell align="right">
                      <Box display="flex" gap={1} justifyContent="flex-end">
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => navigate(`/meeting/${index}`)}
                        >
                          View
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          color="success"
                          onClick={() => handleAddFollowUp(index)}
                        >
                          Follow-up
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <FollowUpDialog
          open={followUpIndex !== null}
          onClose={() => setFollowUpIndex(null)}
          onSubmit={handleFollowUpSubmit}
        />
      </Paper>
    </Container>
  );
};

export default MeetingList;
