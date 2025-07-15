import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField
} from "@mui/material";

interface FollowUpDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { date: string; summary: string }) => void;
}

const FollowUpDialog: React.FC<FollowUpDialogProps> = ({ open, onClose, onSubmit }) => {
  const [date, setDate] = useState("");
  const [summary, setSummary] = useState("");

  const handleSubmit = () => {
    if (!date || !summary.trim()) return;
    onSubmit({ date, summary });
    setDate("");
    setSummary("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Follow-up</DialogTitle>
      <DialogContent>
        <TextField
          label="Follow-up Date"
          type="datetime-local"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          label="Summary"
          multiline
          rows={3}
          fullWidth
          margin="normal"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="contained">Add</Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FollowUpDialog;
