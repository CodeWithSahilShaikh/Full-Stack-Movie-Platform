import { useState, useEffect } from 'react';
import { adminAPI } from '../../../services/api';
import ConfirmModal from '../../common/ConfirmModal/ConfirmModal';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('movies');
  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([]);
  const [showAddMovie, setShowAddMovie] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [movieToDelete, setMovieToDelete] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [formData, setFormData] = useState({
    movieId: '',
    title: '',
    posterPath: '',
    description: '',
    releaseDate: '',
    trailerUrl: '',
    genre: '',
    category: 'movie'
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [moviesRes, usersRes] = await Promise.all([
        adminAPI.getCustomMovies(),
        adminAPI.getAllUsers()
      ]);
      setMovies(moviesRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const genres = formData.genre.split(',').map(g => g.trim());
      const movieData = { ...formData, genre: genres };

      if (editingMovie) {
        await adminAPI.updateMovie(editingMovie._id, movieData);
      } else {
        await adminAPI.addMovie(movieData);
      }

      setFormData({
        movieId: '',
        title: '',
        posterPath: '',
        description: '',
        releaseDate: '',
        trailerUrl: '',
        genre: '',
        category: 'movie'
      });
      setShowAddMovie(false);
      setEditingMovie(null);
      loadData();
    } catch (error) {
      alert(error.response?.data?.message || 'Error saving movie');
    }
  };

  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setFormData({
      movieId: movie.movieId,
      title: movie.title,
      posterPath: movie.posterPath || '',
      description: movie.description || '',
      releaseDate: movie.releaseDate || '',
      trailerUrl: movie.trailerUrl || '',
      genre: movie.genre?.join(', ') || '',
      category: movie.category
    });
    setShowAddMovie(true);
  };

  const confirmDeleteMovie = async () => {
    if (!movieToDelete) return;
    try {
      await adminAPI.deleteMovie(movieToDelete);
      setMovieToDelete(null);
      loadData();
    } catch (error) {
      console.error('Delete movie error:', error);
      alert(error?.response?.data?.message || 'Error deleting movie');
      setMovieToDelete(null);
    }
  };

  const handleToggleBan = async (userId) => {
    try {
      await adminAPI.toggleBanUser(userId);
      loadData();
    } catch (error) {
      console.error('Toggle ban error:', error);
      alert(error?.response?.data?.message || 'Error updating user status');
    }
  };

  const confirmDeleteUser = async () => {
    if (!userToDelete) return;
    try {
      await adminAPI.deleteUser(userToDelete);
      setUserToDelete(null);
      loadData();
    } catch (error) {
      console.error('Delete user error:', error);
      alert(error?.response?.data?.message || 'Error deleting user');
      setUserToDelete(null);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="container">
        <h1 className="admin-title">👨‍💼 Admin Dashboard</h1>

        <div className="admin-tabs">
          <button 
            className={activeTab === 'movies' ? 'active' : ''}
            onClick={() => setActiveTab('movies')}
          >
            Movies ({movies.length})
          </button>
          <button 
            className={activeTab === 'users' ? 'active' : ''}
            onClick={() => setActiveTab('users')}
          >
            Users ({users.length})
          </button>
        </div>

        {activeTab === 'movies' && (
          <div className="admin-content">
            <div className="admin-header">
              <h2>Manage Movies</h2>
              <button 
                className="btn-add"
                onClick={() => {
                  setShowAddMovie(true);
                  setEditingMovie(null);
                  setFormData({
                    movieId: '',
                    title: '',
                    posterPath: '',
                    description: '',
                    releaseDate: '',
                    trailerUrl: '',
                    genre: '',
                    category: 'movie'
                  });
                }}
              >
                + Add Movie
              </button>
            </div>

            {showAddMovie && (
              <div className="movie-form-container">
                <h3>{editingMovie ? 'Edit Movie' : 'Add New Movie'}</h3>
                <form onSubmit={handleSubmit} className="movie-form">
                  <input
                    type="number"
                    placeholder="Movie ID (from TMDB)"
                    value={formData.movieId}
                    onChange={(e) => setFormData({...formData, movieId: e.target.value})}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Poster URL (TMDB path or full URL)"
                    value={formData.posterPath}
                    onChange={(e) => setFormData({...formData, posterPath: e.target.value})}
                  />
                  <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows="4"
                  />
                  <input
                    type="date"
                    placeholder="Release Date"
                    value={formData.releaseDate}
                    onChange={(e) => setFormData({...formData, releaseDate: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder="YouTube Trailer URL"
                    value={formData.trailerUrl}
                    onChange={(e) => setFormData({...formData, trailerUrl: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder="Genres (comma separated)"
                    value={formData.genre}
                    onChange={(e) => setFormData({...formData, genre: e.target.value})}
                  />
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="movie">Movie</option>
                    <option value="tv">TV Show</option>
                  </select>
                  
                  <div className="form-actions">
                    <button type="submit" className="btn-submit">
                      {editingMovie ? 'Update' : 'Add'} Movie
                    </button>
                    <button 
                      type="button" 
                      className="btn-cancel"
                      onClick={() => {
                        setShowAddMovie(false);
                        setEditingMovie(null);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="movies-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Release Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {movies.map((movie) => (
                    <tr key={movie._id}>
                      <td>{movie.movieId}</td>
                      <td>{movie.title}</td>
                      <td>{movie.category}</td>
                      <td>{movie.releaseDate}</td>
                      <td>
                        <button 
                          className="btn-edit"
                          onClick={() => handleEdit(movie)}
                        >
                          Edit
                        </button>
                        <button 
                          className="btn-delete"
                          onClick={() => setMovieToDelete(movie._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {movies.length === 0 && (
                <p className="empty-message">No custom movies added yet</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="admin-content">
            <h2>Manage Users</h2>
            <div className="users-table">
              <table>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`role-badge ${user.role}`}>
                          {user.role}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${user.isBanned ? 'banned' : 'active'}`}>
                          {user.isBanned ? 'Banned' : 'Active'}
                        </span>
                      </td>
                      <td>
                        {user.role !== 'admin' && (
                          <>
                            <button 
                              className="btn-ban"
                              onClick={() => handleToggleBan(user._id)}
                            >
                              {user.isBanned ? 'Unban' : 'Ban'}
                            </button>
                            <button 
                              className="btn-delete"
                              onClick={() => setUserToDelete(user._id)}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={!!movieToDelete}
        title="Delete Movie"
        message="Are you sure you want to delete this custom movie? This action cannot be undone."
        confirmText="Yes, Delete"
        onConfirm={confirmDeleteMovie}
        onCancel={() => setMovieToDelete(null)}
      />

      <ConfirmModal
        isOpen={!!userToDelete}
        title="Delete User"
        message="Are you sure you want to permanently delete this user? Their data will be lost."
        confirmText="Yes, Delete"
        onConfirm={confirmDeleteUser}
        onCancel={() => setUserToDelete(null)}
      />
    </div>
  );
};

export default AdminDashboard;