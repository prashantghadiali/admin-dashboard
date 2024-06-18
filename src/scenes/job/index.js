import React, { useState, useEffect } from "react";
import { IconButton } from '@mui/material';
import dayjs from "dayjs";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  createJob,
  getJobs,
  removeJob,
  updateJob,
} from "../../redux/action/job";
import { BsFillTrashFill, BsPencil } from "react-icons/bs";

const Job = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.list);

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [editedJob, setEditedJob] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  // Edit Handle
  const handleOpenEditModal = (job) => {
    setEditedJob(job);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setEditedJob(null);
  };

  // Delete handle
  const handleOpenDeleteModal = (jobId) => {
    setSelectedJobId(jobId);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedJobId(null);
  };

  const handleDeleteJob = () => {
    dispatch(removeJob(selectedJobId));
    handleCloseDeleteModal();
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.2 },
    { field: "JobTitle", headerName: "Job Title", flex: 1.5 },
    { field: "Location", headerName: "Location", flex: 1 },
    { field: "JobType", headerName: "Job Type", flex: 1 },
    { field: "Salary", headerName: "Salary", flex: 1 },
    { field: "Description", headerName: "Description", flex: 2 },
    { field: "Requirements", headerName: "Requirements", flex: 1 },
    { field: "DatePosted", headerName: "Date Posted", flex: 1 },
    {
      field: "ApplicationDeadline",
      headerName: "Application Deadline",
      flex: 1.5,
    },
    { field: "ContactEmail", headerName: "Contact Email", flex: 1.5 },
    { field: "ContactPhone", headerName: "Contact Phone", flex: 1.5 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1.5,
      renderCell: (job) => (
        <>
        <IconButton
          color="primary"
          onClick={() => handleOpenEditModal(job.row)}
        >
          <BsPencil />
        </IconButton>
        <IconButton
          color="secondary"
          onClick={() => handleOpenDeleteModal(job.row.id)}
          style={{ marginLeft: '10px' }} // Adjust margin as needed
        >
          <BsFillTrashFill />
        </IconButton>
      </>
      ),
    },
  ];

  const jobTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Temporary",
    "Internship",
  ];

  return (
    <Box m="20px">
      <Header
        title="Job Opportunity"
        subtitle="List of Job Opportunity which was created by us."
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenCreateModal}
          >
            Create New Job
          </Button>
        </Box>
        <DataGrid
          rows={jobs}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
      <JobCreateModal
        open={openCreateModal}
        handleClose={handleCloseCreateModal}
        dispatch={dispatch}
        jobTypes={jobTypes}
      />
      <JobEditModal
        open={openEditModal}
        handleClose={handleCloseEditModal}
        dispatch={dispatch}
        jobTypes={jobTypes}
        editedJob={editedJob}
      />
      <DeleteJobModal
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={handleDeleteJob}
      />
    </Box>
  );
};

export default Job;

const JobCreateModal = ({ open, handleClose, dispatch, jobTypes }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(createJob(data));
    dispatch(getJobs());
    handleClose();
    reset();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    maxWidth: "90%",
    maxHeight: "90%",
    overflowY: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
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
          Create Job Opportunity
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="jobTitle"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Job Title"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : null}
              />
            )}
          />
          <Controller
            name="location"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Location"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : null}
              />
            )}
          />
          <Controller
            name="jobType"
            control={control}
            defaultValue=""
            rules={{ required: "Job Type is required" }}
            render={({ field }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel id="jobType-label">Job Type</InputLabel>
                <Select
                  {...field}
                  labelId="jobType-label"
                  id="jobType"
                  label="Job Type"
                  error={Boolean(errors.jobType)}
                >
                  {jobTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
                {errors.jobType && (
                  <Typography variant="caption" color="error">
                    {errors.jobType.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />
          <Controller
            name="salary"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Salary"
                type="number"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : null}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Description"
                type="text"
                fullWidth
                margin="normal"
                multiline
                rows={2}
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : null}
              />
            )}
          />
          <Controller
            name="requirements"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Requirements (No. of Pos)"
                type="text"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : null}
              />
            )}
          />
          <Controller
            name="datePosted"
            control={control}
            defaultValue={null}
            rules={{ required: "Date Posted is required" }}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  {...field}
                  label="Date Posted"
                  inputFormat="yyyy-MM-dd"
                  fullWidth
                  margin="normal"
                  error={Boolean(errors.datePosted)}
                  helperText={
                    errors.datePosted ? errors.datePosted.message : null
                  }
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  sx={{ marginTop: "5px", width: "100%" }}
                />
              </LocalizationProvider>
            )}
          />
          <Controller
            name="applicationDeadline"
            control={control}
            defaultValue={null}
            rules={{ required: "Application Deadline is required" }}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  {...field}
                  label="Application Deadline"
                  inputFormat="yyyy-MM-dd"
                  fullWidth
                  margin="normal"
                  error={Boolean(errors.applicationDeadline)}
                  helperText={
                    errors.applicationDeadline
                      ? errors.applicationDeadline.message
                      : null
                  }
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  sx={{ marginTop: "10px", width: "100%" }}
                />
              </LocalizationProvider>
            )}
          />
          <Controller
            name="contactEmail"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Contact Email"
                type="email"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : null}
              />
            )}
          />
          <Controller
            name="contactPhone"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Contact Phone"
                type="number"
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
            <Button
              variant="outlined"
              onClick={handleClose}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

const JobEditModal = ({ open, handleClose, dispatch, jobTypes, editedJob }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (editedJob) {
      reset(editedJob);
    }
  }, [editedJob, reset]);

  const onEditSubmit = (data) => {
    dispatch(updateJob(data));
    dispatch(getJobs());
    reset(editedJob);
    handleClose();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    maxWidth: "90%",
    maxHeight: "90%",
    overflowY: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
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
          Edit Job Opportunity
        </Typography>
        <form onSubmit={handleSubmit(onEditSubmit)}>
          <Controller
            name="jobTitle"
            control={control}
            defaultValue={editedJob?.JobTitle || ""}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Job Title"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : null}
              />
            )}
          />
          <Controller
            name="location"
            control={control}
            defaultValue={editedJob?.Location || ""}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Location"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : null}
              />
            )}
          />
          <Controller
            name="jobType"
            control={control}
            defaultValue={editedJob?.JobType || ""}
            rules={{ required: "Job Type is required" }}
            render={({ field }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel id="jobType-label">Job Type</InputLabel>
                <Select
                  {...field}
                  labelId="jobType-label"
                  id="jobType"
                  label="Job Type"
                  error={Boolean(errors.jobType)}
                >
                  {jobTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
                {errors.jobType && (
                  <Typography variant="caption" color="error">
                    {errors.jobType.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />
          <Controller
            name="salary"
            control={control}
            defaultValue={editedJob?.Salary || ""}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Salary"
                type="number"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : null}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            defaultValue={editedJob?.Description || ""}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Description"
                type="text"
                fullWidth
                margin="normal"
                multiline
                rows={2}
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : null}
              />
            )}
          />
          <Controller
            name="requirements"
            control={control}
            defaultValue={editedJob?.Requirements || ""}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Requirements (No. of Pos)"
                type="text"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : null}
              />
            )}
          />
          <Controller
            name="datePosted"
            control={control}
            defaultValue={
              editedJob?.DatePosted ? dayjs(editedJob.DatePosted) : null
            }
            rules={{ required: "Date Posted is required" }}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  {...field}
                  label="Date Posted"
                  inputFormat="yyyy-MM-dd"
                  fullWidth
                  margin="normal"
                  error={Boolean(errors.datePosted)}
                  helperText={
                    errors.datePosted ? errors.datePosted.message : null
                  }
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  sx={{ marginTop: "5px", width: "100%" }}
                />
              </LocalizationProvider>
            )}
          />
          <Controller
            name="applicationDeadline"
            control={control}
            defaultValue={
              editedJob?.ApplicationDeadline
                ? dayjs(editedJob.ApplicationDeadline)
                : null
            }
            rules={{ required: "Application Deadline is required" }}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  {...field}
                  label="Application Deadline"
                  inputFormat="yyyy-MM-dd"
                  fullWidth
                  margin="normal"
                  error={Boolean(errors.applicationDeadline)}
                  helperText={
                    errors.applicationDeadline
                      ? errors.applicationDeadline.message
                      : null
                  }
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  sx={{ marginTop: "10px", width: "100%" }}
                />
              </LocalizationProvider>
            )}
          />
          <Controller
            name="contactEmail"
            control={control}
            defaultValue={editedJob?.ContactEmail || ""}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Contact Email"
                type="email"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : null}
              />
            )}
          />
          <Controller
            name="contactPhone"
            control={control}
            defaultValue={editedJob?.ContactPhone || ""}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Contact Phone"
                type="number"
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
            <Button
              variant="outlined"
              onClick={handleClose}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

const DeleteJobModal = ({ open, handleCloseDeleteModal, handleDelete }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseDeleteModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Confirm Delete
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Are you sure you want to delete this job?
        </Typography>
        <Box mt={2}>
          <Button variant="contained" color="secondary" onClick={handleDelete}>
            Delete
          </Button>
          <Button
            variant="outlined"
            onClick={handleCloseDeleteModal}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};