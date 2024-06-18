import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from '@mui/material/Button';
import { tokens } from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { createFaq, getFaqs } from "../../redux/action/faq";
import { useEffect, useState } from "react";
import {  TextField, Modal } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { updateFaq } from '../../redux/action/faq';
// import CreateFaqModal from "../../components/Modals/CreateFaqModal";
// import UpdateFaqModal from "../../components/Modals/UpdateFaqModal";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const faqs = useSelector((state) => state.faqs.list);
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);

  useEffect(() => {
    dispatch(getFaqs()); // Fetch FAQs on component mount
  }, [dispatch]);


  const handleOpenUpdate = (faq) => {
    setSelectedFaq(faq);
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => setOpenUpdate(false);
 
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

      <Button variant="contained" onClick={handleOpen}>
        Create FAQ
      </Button>

      <CreateFaqModal open={open} handleClose={handleClose} />
      {selectedFaq && (
        <UpdateFaqModal open={openUpdate} handleClose={handleCloseUpdate} faq={selectedFaq} />
      )}

      {faqs.map((faq, index) => (
        <Accordion key={index} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
              {faq.question}
            </Typography>
            <Button
              variant="contained"
              onClick={() => handleOpenUpdate(faq)}
              style={{ marginLeft: 'auto' }}
            >
              Update
            </Button>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FAQ;

const CreateFaqModal = ({ open, handleClose }) => {
  const { control, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(createFaq(data));
    dispatch(getFaqs());
    handleClose();
    reset();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Create FAQ
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="question"
            control={control}
            defaultValue=""
            rules={{ required: 'Question is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Question"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : null}
              />
            )}
          />
          <Controller
            name="answer"
            control={control}
            defaultValue=""
            rules={{ required: 'Answer is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Answer"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : null}
              />
            )}
          />
          <Box mt={2}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
            <Button variant="outlined" onClick={handleClose} style={{ marginLeft: '10px' }}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const UpdateFaqModal = ({ open, handleClose, faq }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: faq,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    reset(faq); // Reset form values when `faq` changes
  }, [faq, reset]);

  const onSubmit = (data) => {
    dispatch(updateFaq(faq.id, data));
    handleClose();
    reset(); // Reset form after submission
  };

  return (
    <Modal
      open={open}
      onClose={() => { handleClose(); reset(faq); }} // Reset form when modal closes
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Update FAQ
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="question"
            control={control}
            rules={{ required: 'Question is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Question"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : null}
              />
            )}
          />
          <Controller
            name="answer"
            control={control}
            rules={{ required: 'Answer is required' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Answer"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : null}
              />
            )}
          />
          <Box mt={2}>
            <Button variant="contained" color="primary" type="submit">
              Update
            </Button>
            <Button variant="outlined" onClick={() => { handleClose(); reset(faq); }} style={{ marginLeft: '10px' }}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};
