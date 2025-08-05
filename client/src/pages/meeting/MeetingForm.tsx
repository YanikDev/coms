
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


import { addMeeting } from "../../features/forms/meetingSlice";
import { users } from "../../constants/users";
import { MeetingFormData, meetingSchema } from "../../schema/meetingSchema";

const MeetingForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MeetingFormData>({
    resolver: zodResolver(meetingSchema),
  });

  const onSubmit = (data: MeetingFormData) => {
    dispatch(addMeeting(data));
    reset();
    navigate("/"); // redirect to home after submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 600, margin: "auto" }}>
      <TextField
        label="Date"
        type="date"
        fullWidth
        margin="normal"
        {...register("date")}
        InputLabelProps={{ shrink: true }}
        error={!!errors.date}
        helperText={errors.date?.message}
      />

      <FormControl fullWidth margin="normal" error={!!errors.type}>
        <InputLabel>Type</InputLabel>
        <Select defaultValue="" {...register("type")}>
          <MenuItem value="virtual">Virtual</MenuItem>
          <MenuItem value="physical">Physical</MenuItem>
        </Select>
        <FormHelperText>{errors.type?.message}</FormHelperText>
      </FormControl>

      <TextField
        label="Agenda / Subject"
        fullWidth
        margin="normal"
        {...register("agenda")}
        error={!!errors.agenda}
        helperText={errors.agenda?.message}
      />

      <TextField
        label="MoM - Discussed Points"
        fullWidth
        margin="normal"
        multiline
        rows={3}
        {...register("mom")}
        error={!!errors.mom}
        helperText={errors.mom?.message}
      />

      <TextField
        label="Action Points"
        fullWidth
        margin="normal"
        multiline
        rows={2}
        {...register("actionPoints")}
        error={!!errors.actionPoints}
        helperText={errors.actionPoints?.message}
      />

      <FormControl fullWidth margin="normal" error={!!errors.assignedTo}>
        <InputLabel>Assign to Officer</InputLabel>
        <Select defaultValue="" {...register("assignedTo")}>
          {users.map((user) => (
        <MenuItem key={user.id} value={user.id}>
          {user.name}
        </MenuItem>
          ))}
        </Select>
        <FormHelperText>{errors.assignedTo?.message}</FormHelperText>
      </FormControl>

      <Button type="submit" variant="contained" fullWidth>
        Submit Meeting
      </Button>
    </form>
  );
};

export default MeetingForm;
