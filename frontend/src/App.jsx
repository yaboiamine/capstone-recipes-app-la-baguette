import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Auth state
  const [authMode, setAuthMode] = useState("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authFirstName, setAuthFirstName] = useState("");
  const [authLastName, setAuthLastName] = useState("");
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState("");
  const [token, setToken] = useState(null); // Removed localStorage reference

  // User state
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // Recipe state
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showAddRecipe, setShowAddRecipe] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deletingRecipeId, setDeletingRecipeId] = useState(null);

  // API base URL
  const API_BASE = "http://localhost:3001";

  // Load data when user is logged in
  useEffect(() => {
    if (user && token) {
      loadRecipes();
      loadUsers();
    }
  }, [user, token]);

  // API helper function
  const apiCall = async (endpoint, options = {}) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      },
      ...options
    };

    const response = await fetch(`${API_BASE}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response.json();
  };

  // Load recipes from backend
  const loadRecipes = async () => {
    try {
      setLoading(true);
      const data = await apiCall('/recipes');
      setRecipes(data);
    } catch (error) {
      console.error('Error loading recipes:', error);
      // Fallback to mock data if backend fails
      setRecipes([
        {
          id: 1,
          title: "Classic French Croissant",
          description: "Buttery, flaky pastry perfect for breakfast. Made with layers of butter and dough.",
          createdAt: new Date().toISOString(),
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Load users from backend
  const loadUsers = async () => {
    try {
      const data = await apiCall('/users');
      setUsers(data);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  // Auth handlers
  const handleAuth = async () => {
    setAuthError("");
    setLoading(true);

    try {
      if (authMode === "signup") {
        if (!authEmail || !authPassword || !authFirstName || !authLastName) {
          throw new Error("Please fill all fields for signup.");
        }

        const result = await apiCall('/auth/signup', {
          method: 'POST',
          body: JSON.stringify({
            firstName: authFirstName,
            lastName: authLastName,
            email: authEmail,
            password: authPassword,
          })
        });

        // Store token and user data in state only
        setToken(result.token);
        setUser(result.user);

        // Clear form
        setAuthEmail("");
        setAuthPassword("");
        setAuthFirstName("");
        setAuthLastName("");

      } else {
        // Login
        if (!authEmail || !authPassword) {
          throw new Error("Please enter email and password for login.");
        }

        const result = await apiCall('/auth/login', {
          method: 'POST',
          body: JSON.stringify({
            email: authEmail,
            password: authPassword,
          })
        });

        // Store token and user data in state only
        setToken(result.token);
        setUser(result.user);

        // Clear form
        setAuthEmail("");
        setAuthPassword("");
      }
    } catch (error) {
      console.error('Auth error:', error);
      setAuthError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setRecipes([]);
    setUsers([]);
  };

  // Add recipe to backend
  const handleRecipeSubmit = async () => {
    if (!title || !description) {
      alert("Please fill in both title and description");
      return;
    }

    try {
      setLoading(true);
      const newRecipe = await apiCall('/recipes', {
        method: 'POST',
        body: JSON.stringify({ title, description })
      });

      // Add to local state
      setRecipes([newRecipe, ...recipes]);
      setTitle("");
      setDescription("");
      setShowAddRecipe(false);
    } catch (error) {
      console.error('Error adding recipe:', error);
      alert('Failed to add recipe: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete recipe from backend
  const handleRecipeDelete = async (recipeId) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) {
      return;
    }

    try {
      setDeletingRecipeId(recipeId);
      await apiCall(`/recipes/${recipeId}`, {
        method: 'DELETE'
      });

      // Remove from local state
      setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
    } catch (error) {
      console.error('Error deleting recipe:', error);
      alert('Failed to delete recipe: ' + error.message);
    } finally {
      setDeletingRecipeId(null);
    }
  };

  // Add user to backend
  const handleUserSubmit = async () => {
    if (!firstName || !lastName || !email) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const newUser = await apiCall('/users', {
        method: 'POST',
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password: 'defaultPassword123' // You might want to handle this differently
        })
      });

      setUsers([...users, newUser]);
      setFirstName("");
      setLastName("");
      setEmail("");
      setShowAddUser(false);
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container">
        <div className="auth-container">
          <div className="auth-card">
            <div className="logo">
              <div className="logo-icon">🥖</div>
              <h1 className="title">La Baguette</h1>
              <p className="subtitle">Recipe Hub</p>
            </div>

            <div>
              <h2 className="title text-center mb-4">
                {authMode === "signup" ? "Create Account" : "Welcome Back"}
              </h2>

              {authMode === "signup" && (
                <div className="grid-two">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={authFirstName}
                    onChange={(e) => setAuthFirstName(e.target.value)}
                    className="input"
                    required
                    disabled={loading}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={authLastName}
                    onChange={(e) => setAuthLastName(e.target.value)}
                    className="input"
                    required
                    disabled={loading}
                  />
                </div>
              )}

              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="input"
                  required
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="input"
                  required
                  disabled={loading}
                />
              </div>

              <button 
                onClick={handleAuth} 
                className="button"
                disabled={loading}
              >
                {loading ? 'Loading...' : (authMode === "signup" ? "Create Account" : "Sign In")}
              </button>
            </div>

            <div className="text-center">
              <button
                onClick={() => {
                  setAuthMode(authMode === "signup" ? "login" : "signup");
                  setAuthError("");
                }}
                className="link-button"
                disabled={loading}
              >
                {authMode === "signup"
                  ? "Already have an account? Sign In"
                  : "Need an account? Sign Up"}
              </button>
            </div>

            {authError && <div className="error">{authError}</div>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <div className="header-icon">🥖</div>
            <div>
              <h1 className="title" style={{ fontSize: "1.25rem" }}>
                La Baguette
              </h1>
              <p className="subtitle text-sm">Recipe Hub</p>
            </div>
          </div>
          <div className="header-right">
            <span className="text-gray">Welcome, {user.firstName}!</span>
            <button onClick={handleLogout} className="action-button">
              <span>🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="content">
        {/* Main Content - Recipes */}
        <div>
          <div className="section-header">
            <h2 className="section-title">Recipe Feed</h2>
            <button
              onClick={() => setShowAddRecipe(true)}
              className="add-button"
              disabled={loading}
            >
              <span>+</span>
              <span>Add Recipe</span>
            </button>
          </div>

          {/* Add Recipe Modal */}
          {showAddRecipe && (
            <div className="card">
              <div className="card-content">
                <h3 className="title mb-4" style={{ fontSize: "1.125rem" }}>
                  Share a New Recipe
                </h3>
                <div className="flex-column gap-lg">
                  <input
                    type="text"
                    placeholder="Recipe title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input"
                    required
                    disabled={loading}
                  />
                  <textarea
                    placeholder="Describe your recipe..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="textarea"
                    required
                    disabled={loading}
                  />
                  <div className="button-group">
                    <button
                      onClick={handleRecipeSubmit}
                      className="button"
                      style={{ width: "auto", padding: "0.5rem 1.5rem" }}
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : 'Share Recipe'}
                    </button>
                    <button
                      onClick={() => setShowAddRecipe(false)}
                      className="secondary-button"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recipe Cards */}
          <div>
            {loading && recipes.length === 0 ? (
              <div className="text-center">Loading recipes...</div>
            ) : (
              recipes.map((recipe) => (
                <div key={recipe.id} className="card">
                  {/* Card Header */}
                  <div className="recipe-header">
                    <div className="avatar">
                      {user.firstName[0]}{user.lastName[0]}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3
                        className="title"
                        style={{ fontSize: "1rem", marginBottom: "0.25rem" }}
                      >
                        {recipe.title}
                      </h3>
                      <div className="flex gap-sm text-sm text-gray">
                        <span>{user.firstName} {user.lastName}</span>
                        <span>•</span>
                        <span>{new Date(recipe.createdAt || Date.now()).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRecipeDelete(recipe.id)}
                      className="action-button"
                      style={{ color: "#ef4444" }}
                      disabled={deletingRecipeId === recipe.id}
                      title="Delete recipe"
                    >
                      {deletingRecipeId === recipe.id ? (
                        <span>⏳</span>
                      ) : (
                        <span>🗑️</span>
                      )}
                    </button>
                  </div>

                  {/* Recipe Content */}
                  <div className="card-content">
                    <p style={{ color: "#374151", marginBottom: "1rem", lineHeight: "1.5" }}>
                      {recipe.description}
                    </p>

                    {/* Actions */}
                    <div className="recipe-actions">
                      <div className="flex gap-lg">
                        <button className="action-button text-red">
                          <span>❤️</span>
                          <span>0</span>
                        </button>
                        <button className="action-button">
                          <span>📅</span>
                        </button>
                      </div>
                      <span className="text-sm" style={{ color: "#9ca3af" }}>
                        Recipe from database
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          {/* Community Members */}
          <div className="card">
            <div className="card-content">
              <div className="section-header" style={{ marginBottom: "1rem" }}>
                <h3 className="title" style={{ fontSize: "1.125rem" }}>
                  Community
                </h3>
                <button
                  onClick={() => setShowAddUser(true)}
                  className="action-button text-orange"
                  style={{ fontSize: "1.25rem" }}
                  disabled={loading}
                >
                  +
                </button>
              </div>

              {/* Add User Form */}
              {showAddUser && (
                <div className="bg-gray-50 rounded p-4 mb-4">
                  <div className="flex-column gap-md">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="input text-sm"
                      required
                      disabled={loading}
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="input text-sm"
                      required
                      disabled={loading}
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input text-sm"
                      required
                      disabled={loading}
                    />
                    <div className="flex gap-sm">
                      <button
                        onClick={handleUserSubmit}
                        className="button text-sm"
                        style={{ width: "auto", padding: "0.25rem 0.75rem" }}
                        disabled={loading}
                      >
                        {loading ? 'Adding...' : 'Add'}
                      </button>
                      <button
                        onClick={() => setShowAddUser(false)}
                        className="secondary-button"
                        style={{ padding: "0.25rem 0.75rem" }}
                        disabled={loading}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="user-list">
                {users.map((user) => (
                  <div key={user.id} className="user-item">
                    <div className="avatar gradient-avatar">
                      {user.firstName[0]}
                    </div>
                    <div className="user-info">
                      <p className="user-name">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="user-email">{user.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="card">
            <div className="card-content">
              <h3 className="title mb-4" style={{ fontSize: "1.125rem" }}>
                Community Stats
              </h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="text-gray">Total Recipes</span>
                  <span className="stat-value">{recipes.length}</span>
                </div>
                <div className="stat-item">
                  <span className="text-gray">Active Members</span>
                  <span className="stat-value">{users.length + 1}</span>
                </div>
                <div className="stat-item">
                  <span className="text-gray">Total Likes</span>
                  <span className="stat-value">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} La Baguette Recipe Hub. Bon appétit!</p>
      </footer>
    </div>
  );
}

export default App;
