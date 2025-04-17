import React, { useEffect, useState } from 'react';
import axiosInstance from '../features/api/axiosInstance';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Snackbar, SnackbarContent, CircularProgress, Tooltip } from '@mui/material';
import { useAppSelector } from '../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { PersonAddAlt1, Block, VerifiedUser } from '@mui/icons-material';
import Layout from './Layout';

const UserList = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'Admin') {
      navigate('/unauthorized');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/api/users');
        setUsers(response.data); 
        setLoading(false);
      } catch (err: any) {
        setError('Error loading users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const response = await axiosInstance.patch(`api/users/${userId}/role`, { role: newRole });
      setSnackbarMessage(response.data.message);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      const updatedUsers = users.map((user) =>
        user._id === userId ? { ...user, role: newRole } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      setSnackbarMessage('Error updating role');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleToggleStatus = async (userId: string) => {
    try {
      const response = await axiosInstance.patch(`api/users/${userId}/toggle`);
      setSnackbarMessage(response.data.message);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      const updatedUsers = users.map((user) =>
        user._id === userId ? { ...user, isActive: !user.isActive } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      setSnackbarMessage('Error toggling user status');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}><CircularProgress /></div>;
  if (error) return <div>{error}</div>;

  return (
    <>
    <Layout />
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.isActive ? 'Active' : 'Disabled'}</TableCell>
                <TableCell>
                  <Tooltip title={user.isActive ? 'Disable User' : 'Enable User'}>
                    <Button
                      variant="outlined"
                      color={user.isActive ? 'error' : 'success'}
                      onClick={() => handleToggleStatus(user._id)}
                      sx={{ marginRight: 1 }}
                    >
                      {user.isActive ? <Block /> : <VerifiedUser />}
                      {user.isActive ? 'Disable' : 'Enable'}
                    </Button>
                  </Tooltip>
                  <Tooltip title={user.role === 'Admin' ? 'Set as Editor' : 'Set as Admin'}>
                    <Button
                      variant="contained"
                      color={user.role === 'Admin' ? 'warning' : 'primary'}
                      onClick={() => handleRoleChange(user._id, user.role === 'Admin' ? 'Editor' : 'Admin')}
                    >
                      <PersonAddAlt1 />
                      Set as {user.role === 'Admin' ? 'Editor' : 'Admin'}
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <SnackbarContent
          message={snackbarMessage}
          style={{
            backgroundColor: snackbarSeverity === 'success' ? 'green' : 'red',
            color: 'white',
          }}
        />
      </Snackbar>
    </>
  );
};

export default UserList;
