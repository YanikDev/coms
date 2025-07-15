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
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Visitor List
      </Typography>

      {visitors.length === 0 ? (
        <Typography>No visitors submitted yet.</Typography>
      ) : (
        <List>
          {visitors.map((visitor, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={`${visitor.name} (${visitor.contact})`}
                  secondary={
                    <>
                      <Typography>
                        <strong>Visit Date:</strong>{" "}
                        {new Date(visitor.visit_date).toLocaleString()}
                      </Typography>
                      <Typography>
                        <strong>Purpose:</strong> {visitor.purpose}
                      </Typography>
                    </>
                  }
                />
                <Stack direction="column" spacing={1}>
                  
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() =>  navigate(`/visitor/${index}`)}
                  >
                    View Details
                  </Button>

                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleAddFollowUp(index)}
                  >
                    Add Follow-up
                  </Button>
                </Stack>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
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
