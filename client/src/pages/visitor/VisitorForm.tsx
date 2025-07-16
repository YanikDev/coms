import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Checkbox, Button, FormControlLabel,Box, Typography,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { VisitorFormData, visitorSchema } from "../../schema/visitorSchema";
import { addVisitor } from "../../features/forms/formsSlice";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./VisitorForm.css"; 

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
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className="visitor-form shadow-lg bg-white rounded-4 animate-fadeIn"
    >
      <Typography className="form-title mb-4 "><h1>Visitor Form</h1></Typography>

      <div className="mb-3">
        <TextField
          label="Full Name"
          fullWidth
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
          className="custom-input"
        />
      </div>

      <div className="mb-3">
        <TextField
          label="Contact (Phone or Email)"
          fullWidth
          {...register("contact")}
          error={!!errors.contact}
          helperText={errors.contact?.message}
          className="custom-input"
        />
      </div>

      <div className="mb-3">
        <TextField
          label="Visit Date"
          type="datetime-local"
          fullWidth
          InputLabelProps={{ shrink: true }}
          {...register("visit_date", { valueAsDate: true })}
          error={!!errors.visit_date}
          helperText={errors.visit_date?.message}
          className="custom-input"
        />
      </div>

      <div className="mb-3">
        <TextField
          label="Purpose"
          multiline
          rows={3}
          fullWidth
          {...register("purpose")}
          error={!!errors.purpose}
          helperText={errors.purpose?.message}
          className="custom-input"
        />
      </div>

      <div className="mb-3">
        <TextField
          label="Outcome / Notes"
          multiline
          rows={3}
          fullWidth
          {...register("outcome")}
          className="custom-input"
        />
      </div>

      <div className="mb-3">
        <FormControlLabel
          control={<Checkbox {...register("has_commitment")} />}
          label="Any commitment made?"
        />
      </div>

      <Button
        type="submit"
        variant="contained"
        className="submit-btn w-100"
        color="primary"
      >
        Submit
      </Button>

      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default VisitorForm;
