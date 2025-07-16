import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {TextField,Checkbox,Button,FormControlLabel,Box,Typography} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { VisitorFormData, visitorSchema } from "../../schema/visitorSchema";
import { addVisitor } from "../../features/forms/formsSlice";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
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
      className="visitor-form"
    >
      <Typography className="form-title mb-4 text-center">
        <h1>Visitor Form</h1>
      </Typography>

  
      <Box display="flex" gap={2} flexDirection={{ xs: "column", sm: "row" }} mb={3}>
        <Box width="100%">
          <label className="form-label">Full Name *</label>
          <TextField
            placeholder="John Snow"
            fullWidth
            size="small"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </Box>
        <Box width="100%">
          <label className="form-label">Contact (Phone or Email) *</label>
          <TextField
            placeholder="example@email.com / +91 9876543210"
            fullWidth
            size="small"
            {...register("contact")}
            error={!!errors.contact}
            helperText={errors.contact?.message}
          />
        </Box>
      </Box>

     
      <Box mb={3}>
        <label className="form-label">Visit Date *</label>
        <TextField
          type="datetime-local"
          fullWidth
          size="small"
          InputLabelProps={{ shrink: true }}
          {...register("visit_date", { valueAsDate: true })}
          error={!!errors.visit_date}
          helperText={errors.visit_date?.message}
        />
      </Box>

   
      <Box display="flex" gap={2} flexDirection={{ xs: "column", sm: "row" }} mb={3}>
        <Box width="100%">
          <label className="form-label">Purpose *</label>
          <TextField
            placeholder="Meeting / Inquiry / Discussion"
            multiline
            rows={3}
            fullWidth
            size="small"
            {...register("purpose")}
            error={!!errors.purpose}
            helperText={errors.purpose?.message}
          />
        </Box>
        <Box width="100%">
          <label className="form-label">Outcome / Notes</label>
          <TextField
            placeholder="Add any outcome or additional notes"
            multiline
            rows={3}
            fullWidth
            size="small"
            {...register("outcome")}
          />
        </Box>
      </Box>

  
      <Box mb={3}>
        <FormControlLabel
          control={<Checkbox {...register("has_commitment")} />}
          label="Any commitment made?"
          className="form-check-label"
        />
      </Box>

    
      <Box textAlign="center">
        <Button
          type="submit"
          variant="contained"
          className="submit-btn w-100"
          
        >
          Submit
        </Button>
      </Box>

      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default VisitorForm;
