import { Box, Button, IconButton, LinearProgress, Modal, TextField, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { createClient, getClients, removeClient, updateClient } from "../../redux/action/client";
import { BsFillTrashFill, BsPencil } from "react-icons/bs";

const OurClients = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const { reset } = useForm();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null); // Track selected client for update/delete
  // const [formData, setFormData] = useState({
  //   ClientName: '',
  //   Description: '',
  //   ClientLogo: null, // For storing file data
  // });


  const dispatch = useDispatch();
  const clients = useSelector((state) => state.client?.list);

  // Function to handle opening edit modal
  const handleOpenEditModal = (client) => {
    setSelectedClient(client);
    setOpenEditModal(true);
    reset()
  };

  // Function to handle closing edit modal
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedClient(null);
    reset()
    // setUploadProgress(0); // Reset upload progress
  };


  const handleOpenDeleteModal = (clientId) => {
    setSelectedClient(clientId);
    setOpenDeleteModal(true);
    reset();
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedClient(null);
  };

  const handleDeleteClient = async () => {
    try {
      dispatch(removeClient(selectedClient));
      dispatch(getClients());
      handleCloseDeleteModal();
    } catch (err) {
      console.error('Error deleting client:', err);
    }
  };

  // Function to handle client update
  // const handleUpdateClient = async () => {
  //   try {
  //     const updatedData = {
  //       ClientName: formData.ClientName,
  //       Description: formData.Description,
  //       ClientLogo: formData.ClientLogo, // Include ClientLogo in update data
  //     };

  //     const config = {
  //       onUploadProgress: (progressEvent) => {
  //         const progress = Math.round(
  //           (progressEvent.loaded * 100) / progressEvent.total
  //         );
  //         setUploadProgress(progress);
  //       },
  //     };

  //     dispatch(updateClient(selectedClient.id, updatedData, config)); // Assuming updateClient action exists with optional config for file upload
  //     dispatch(getClients()); // Refresh client list after update
  //     handleCloseEditModal();
  //   } catch (err) {
  //     console.error('Error updating client:', err);
  //     // Handle error (e.g., show error message)
  //   }
  // };

  // Function to handle client deletion
  // const handleDeleteClient = async () => {
  //   try {
  //     dispatch(removeClient(selectedClient)); // Assuming deleteClient action exists
  //     dispatch(getClients()); // Refresh client list after delete
  //     handleCloseDeleteModal();
  //   } catch (err) {
  //     console.error('Error deleting client:', err);
  //     // Handle error (e.g., show error message)
  //   }
  // };

  const NoRowsOverlay = () => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Typography variant="h6" color="textSecondary">
        No data available
      </Typography>
    </Box>
  );


  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  // Function to handle opening modal
  const handleOpenCreateModal = () => {
    setOpenCreateModal(true);
  };

  // Function to handle closing modal
  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "ClientName", headerName: "Client Name", flex: 1.5 },
    {
      field: "ClientLogo",
      headerName: "Client Logo",
      flex: 1.5,
      renderCell: (params) => (
        <img 
          src={params.value} // Assuming params.value is the correct URL
          alt={`${params.row.ClientName} Logo`}
          style={{ width: '100px', height: 'auto' }}
        />
      ),
    },
    {
      field: "Description",
      headerName: "Description",
      flex: 4,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => handleOpenEditModal(params.row)}
          >
            <BsPencil />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handleOpenDeleteModal(params.row.id)}
            style={{ marginLeft: '10px' }} // Adjust margin as needed
          >
            <BsFillTrashFill />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="Our Clients"
        subtitle="List of Our Clients for Frontend Entries"
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenCreateModal}
          >
            Create Client
          </Button>
        </Box>
        <DataGrid
          rows={clients}
          columns={columns}
          components={{ Toolbar: GridToolbar, NoRowsOverlay }}
        />
        <ClientCreateModal
          open={openCreateModal}
          handleClose={handleCloseCreateModal}
        />
        <ClientUpdateModal
          open={openEditModal}
          handleClose={handleCloseEditModal}
          client={selectedClient}
        />
        <ClientDeleteModal
          open={openDeleteModal}
          handleClose={handleCloseDeleteModal}
          handleDelete={handleDeleteClient}
        />
      </Box>
    </Box>
  );
};

const ClientCreateModal = ({ open, handleClose }) => {
  const { control, handleSubmit, reset, register } = useForm();
  const [uploadProgress, setUploadProgress] = useState(0);
  const dispatch = useDispatch();

  const onCreateSubmit = async (data) => {
    try {
      console.log(data.ClientLogo[0])
      const formData = new FormData();
      formData.append('ClientName', data.ClientName);
      formData.append('Description', data.Description);
      formData.append('ClientLogo', data.ClientLogo[0]);

      for (let [key, value] of formData.entries()) {
        console.log("form data :",key, value);
      }
      
      dispatch(createClient(formData));
      dispatch(getClients());
    } catch (err) {
      console.error('Error creating client:', err);
    } finally {
      handleClose();
      reset();
      setUploadProgress(0);
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    maxWidth: '90%',
    maxHeight: '90%',
    overflowY: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
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
          Create Client
        </Typography>
        {/* encType="multipart/form-data" */}
        <form onSubmit={handleSubmit(onCreateSubmit)} encType="multipart/form-data"   >   
          <Controller
            name="ClientName"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Client Name"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : null}
              />
            )}
          />
          <Controller
            name="Description"
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
          <input
            type="file"
            {...register('ClientLogo', {
              required: 'Client Logo is required',
            })}
          />
          {uploadProgress > 0 && (
            <Box mt={2}>
              <LinearProgress variant="determinate" value={uploadProgress} />
            </Box>
          )}
          <Box mt={2}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
            <Button
              variant="outlined"
              onClick={handleClose}
              style={{ marginLeft: '10px' }}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
    

    // Upload

  );
};


const ClientUpdateModal = ({ open, handleClose, client }) => {
  const { control, handleSubmit, reset } = useForm();
  const [formData, setFormData] = useState({
    ClientName: client ? client.ClientName || "" : "",
    Description: client ? client.Description || "" : "",
    ClientLogo: null,
  });
  const dispatch = useDispatch();

  // Function to handle file upload change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      ClientLogo: file,
    });
  };

  const onUpdateSubmit = async (data) => {
    try {
      const updatedData = {
        ClientName: data.ClientName,
        Description: data.Description,
        ClientLogo: data.ClientLogo[0], // Assuming ClientLogo is updated
      };

      const formData = new FormData();
      formData.append('ClientName', updatedData.ClientName);
      formData.append('Description', updatedData.Description);
      formData.append('ClientLogo', updatedData.ClientLogo);

      dispatch(updateClient(formData));
      dispatch(getClients())

      handleClose();
      reset();
    } catch (err) {
      console.error('Error updating client:', err);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="update-client-modal-title"
      aria-describedby="update-client-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          maxWidth: '90%',
          maxHeight: '90%',
          overflowY: 'auto',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Update Client
        </Typography>
        <form onSubmit={handleSubmit(onUpdateSubmit)} encType="multipart/form-data">
          <Controller
            name="ClientName"
            control={control}
            defaultValue={formData.ClientName}
            render={({ field }) => (
              <TextField
                {...field}
                label="Client Name"
                fullWidth
                margin="normal"
              />
            )}
          />
          <Controller
            name="Description"
            control={control}
            defaultValue={formData.Description}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                fullWidth
                multiline
                rows={2}
                margin="normal"
              />
            )}
          />
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            style={{ marginTop: '10px' }}
          />
          {formData.ClientLogo && (
            <Typography variant="body2" color="textSecondary">
              Selected file: {formData.ClientLogo.name}
            </Typography>
          )}
          <Box mt={2}>
            <Button variant="contained" color="primary" type="submit">
              Update
            </Button>
            <Button
              variant="outlined"
              onClick={handleClose}
              style={{ marginLeft: '10px' }}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

const ClientDeleteModal = ({ open, handleClose, handleDelete }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-client-modal-title"
      aria-describedby="delete-client-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          maxWidth: '90%',
          maxHeight: '90%',
          overflowY: 'auto',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Delete Client
        </Typography>
        <Typography variant="body1" gutterBottom>
          Are you sure you want to delete this client?
        </Typography>
        <Box mt={2}>
          <Button variant="contained" color="secondary" onClick={handleDelete}>
            Delete
          </Button>
          <Button
            variant="outlined"
            onClick={handleClose}
            style={{ marginLeft: '10px' }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

// const ClientUpdateModal = ({ open, handleClose, client }) => {
//   const { control, handleSubmit, reset } = useForm();
//   // const [uploadProgress, setUploadProgress] = useState(0);
//   const [formData, setFormData] = useState({
//     ClientName: client ? client.ClientName || "" : "",
//     Description: client ? client.Description || "" : "",
//     ClientLogo: null,
//   });
//   const dispatch = useDispatch();

  
//   // Function to handle file upload change
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFormData({
//       ...formData,
//       ClientLogo: file,
//     });
//   };

//   const onUpdateSubmit = async (data) => {
//     try {
//       const updatedData = {
//         ClientName: data.ClientName,
//         Description: data.Description,
//         ClientLogo: data.ClientLogo[0], // Assuming ClientLogo is updated
//       };

//       const formData = new FormData();
//       formData.append('ClientName', updatedData.ClientName);
//       formData.append('Description', updatedData.Description);
//       formData.append('ClientLogo', updatedData.ClientLogo);

//       // const config = {
//       //   onUploadProgress: (progressEvent) => {
//       //     const progress = Math.round(
//       //       (progressEvent.loaded * 100) / progressEvent.total
//       //     );
//       //     // setUploadProgress(progress);
//       //   },
//       // };

//       // dispatch(updateClient(client.id, formData, config)); // Assuming updateClient action supports file upload
//       dispatch(updateClient(client.id, formData));

//       handleClose();
//       reset();
//       // setUploadProgress(0);
//     } catch (err) {
//       console.error('Error updating client:', err);
//     }
//   };


//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="update-client-modal-title"
//       aria-describedby="update-client-modal-description"
//     >
//       <Box
//         sx={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           width: 400,
//           maxWidth: '90%',
//           maxHeight: '90%',
//           overflowY: 'auto',
//           bgcolor: 'background.paper',
//           border: '2px solid #000',
//           boxShadow: 24,
//           p: 4,
//         }}
//       >
//         <Typography variant="h6" component="h2" gutterBottom>
//           Update Client
//         </Typography>
//         <form onSubmit={handleSubmit(onUpdateSubmit)} encType="multipart/form-data">
//           <Controller
//             name="ClientName"
//             control={control}
//             defaultValue={client.ClientName || ""}
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Client Name"
//                 fullWidth
//                 margin="normal"
//               />
//             )}
//           />
//           <Controller
//             name="Description"
//             control={control}
//             defaultValue={client.Description || ""}
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Description"
//                 fullWidth
//                 multiline
//                 rows={2}
//                 margin="normal"
//               />
//             )}
//           />
//           <input
//             type="file"
//             onChange={handleFileChange}
//             accept="image/*"
//             style={{ marginTop: '10px' }}
//           />
//           {formData.ClientLogo && (
//             <Typography variant="body2" color="textSecondary">
//               Selected file: {formData.ClientLogo.name}
//             </Typography>
//           )}
//           {/* {uploadProgress > 0 && (
//             <LinearProgress variant="determinate" value={uploadProgress} />
//           )} */}
//           <Box mt={2}>
//             <Button variant="contained" color="primary" type="submit">
//               Update
//             </Button>
//             <Button
//               variant="outlined"
//               onClick={handleClose}
//               style={{ marginLeft: '10px' }}
//             >
//               Cancel
//             </Button>
//           </Box>
//         </form>
//       </Box>
//     </Modal>
//   );
// };

export default OurClients;

//   const {
//     control,
//     handleSubmit,
//     reset,
//     register
//   } = useForm();
//   const dispatch = useDispatch();

//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData();
//       formData.append('ClientName', data.dlientName);
//       formData.append('Description', data.description);
//       formData.append('ClientLogo', data.clientLogo[0]);

//       dispatch(createClient(data));
//       dispatch(getClients());
//     } catch (err) {
//       console.error('Error creating client:', err);
//     } finally {
//       handleClose();
//       reset();
//     }
//   };

//   const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     maxWidth: '90%',
//     maxHeight: '90%',
//     overflowY: 'auto',
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//   };

//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//     >
//       <Box sx={style}>
//         <Typography id="modal-modal-title" variant="h6" component="h2">
//           Create Client
//         </Typography>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <Controller
//             name="ClientName"
//             control={control}
//             defaultValue=""
//             render={({ field, fieldState }) => (
//               <TextField
//                 {...field}
//                 label="Client Name"
//                 fullWidth
//                 margin="normal"
//                 error={!!fieldState.error}
//                 helperText={fieldState.error ? fieldState.error.message : null}
//               />
//             )}
//           />
//           <Controller
//             name="Description"
//             control={control}
//             defaultValue=""
//             render={({ field, fieldState }) => (
//               <TextField
//                 {...field}
//                 label="Description"
//                 type="text"
//                 fullWidth
//                 margin="normal"
//                 multiline
//                 rows={2}
//                 error={!!fieldState.error}
//                 helperText={fieldState.error ? fieldState.error.message : null}
//               />
//             )}
//           />
//           <input
//             type="file"
//             {...register('ClientLogo', {
//               required: 'Client Logo is required',
//             })}
//           />
//           <Box mt={2}>
//             <Button variant="contained" color="primary" type="submit">
//               Submit
//             </Button>
//             <Button
//               variant="outlined"
//               onClick={handleClose}
//               style={{ marginLeft: '10px' }}
//             >
//               Cancel
//             </Button>
//           </Box>
//         </form>
//       </Box>
//     </Modal>
//   );
// };