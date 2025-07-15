import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Checkbox, Button, FormControlLabel, Box, Typography } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";

import { useDispatch } from "react-redux";
import { VisitorFormData, visitorSchema } from "../../schema/visitorSchema";
import { addVisitor } from "../../features/forms/formsSlice";
import { useNavigate } from "react-router-dom";

const VisitorForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VisitorFormData>({
    resolver: zodResolver(visitorSchema),
    defaultValues: {
      visit_date: new Date(),
      has_commitment: false,
    },
  });
  const navigate = useNavigate();
  const onSubmit = (data: VisitorFormData) => {
    try {
      dispatch(addVisitor(data));
      toast.success("Visitor details submitted successfully!");
      reset();
      navigate("/");
    } catch (err) {
      toast.error("Failed to submit visitor details.");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 600, margin: "auto", p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Visitor Form
      </Typography>

      <TextField
        label="Full Name"
        fullWidth
        margin="normal"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      <TextField
        label="Contact (Phone or Email)"
        fullWidth
        margin="normal"
        {...register("contact")}
        error={!!errors.contact}
        helperText={errors.contact?.message}
      />

      <TextField
        label="Visit Date"
        type="datetime-local"
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        {...register("visit_date", { valueAsDate: true })}
        error={!!errors.visit_date}
        helperText={errors.visit_date?.message}
      />

      <TextField
        label="Purpose"
        multiline
        rows={3}
        fullWidth
        margin="normal"
        {...register("purpose")}
        error={!!errors.purpose}
        helperText={errors.purpose?.message}
      />

      <TextField
        label="Outcome / Notes"
        multiline
        rows={3}
        fullWidth
        margin="normal"
        {...register("outcome")}
      />

      <FormControlLabel
        control={<Checkbox {...register("has_commitment")} />}
        label="Any commitment made?"
      />

      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Submit
      </Button>

      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default VisitorForm;
