import { useState, useEffect } from "react";
import "./App.css"; // Import the CSS file

function App() {
  // Auth state
  const [authMode, setAuthMode] = useState("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authFirstName, setAuthFirstName] = useState("");
  const [authLastName, setAuthLastName] = useState("");
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState("");

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

  // Mock data for demonstration
  useEffect(() => {
    if (!user) return;

    // Mock recipes
    setRecipes([
      {
        id: 1,
        title: "Classic French Croissant",
        description:
          "Buttery, flaky pastry perfect for breakfast. Made with layers of butter and dough, this traditional French pastry takes time but is worth every minute.",
        author: "Marie Dubois",
        date: "2 days ago",
        likes: 124,
        category: "Pastry",
      },
      {
        id: 2,
        title: "Avocado Toast Supreme",
        description:
          "Fresh avocado on artisan bread with herbs and spices. A healthy and delicious way to start your day with premium ingredients.",
        image:
          "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop",
        author: "Jean Laurent",
        date: "1 week ago",
        likes: 89,
        category: "Breakfast",
      },
      {
        id: 3,
        title: "Mediterranean Pasta",
        description:
          "Fresh pasta with tomatoes, olives, and herbs. A taste of the Mediterranean coast brought to your kitchen with authentic flavors.",
        image:
          "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop",
        author: "Sophie Martin",
        date: "3 days ago",
        likes: 156,
        category: "Main Course",
      },
    ]);
  }, [user]);

  // Auth handlers
  const handleAuth = async () => {
    setAuthError("");

    if (authMode === "login") {
      if (authEmail && authPassword) {
        setUser({
          id: 1,
          firstName: authFirstName || "Chef",
          lastName: authLastName || "User",
          email: authEmail,
        });
        setAuthEmail("");
        setAuthPassword("");
      } else {
        setAuthError("Please enter email and password");
      }
    } else {
      if (authEmail && authPassword && authFirstName && authLastName) {
        setUser({
          id: 1,
          firstName: authFirstName,
          lastName: authLastName,
          email: authEmail,
        });
        setAuthEmail("");
        setAuthPassword("");
        setAuthFirstName("");
        setAuthLastName("");
      } else {
        setAuthError("Please fill all fields");
      }
    }
  };

  const handleLogout = () => {
    setUser(null);
    setRecipes([]);
    setUsers([]);
  };

  // Add recipe
  const handleRecipeSubmit = async () => {
    const newRecipe = {
      id: recipes.length + 1,
      title,
      description,
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
      author: `${user.firstName} ${user.lastName}`,
      date: "just now",
      likes: 0,
      category: "New Recipe",
    };
    setRecipes([newRecipe, ...recipes]);
    setTitle("");
    setDescription("");
    setShowAddRecipe(false);
  };

  // Add user
  const handleUserSubmit = async () => {
    const newUser = {
      id: users.length + 1,
      firstName,
      lastName,
      email,
    };
    setUsers([...users, newUser]);
    setFirstName("");
    setLastName("");
    setEmail("");
    setShowAddUser(false);
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
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={authLastName}
                    onChange={(e) => setAuthLastName(e.target.value)}
                    className="input"
                    required
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
                />
              </div>

              <button onClick={handleAuth} className="button">
                {authMode === "signup" ? "Create Account" : "Sign In"}
              </button>
            </div>

            <div className="text-center">
              <button
                onClick={() =>
                  setAuthMode(authMode === "signup" ? "login" : "signup")
                }
                className="link-button"
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
                  />
                  <textarea
                    placeholder="Describe your recipe..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="textarea"
                    required
                  />
                  <div className="button-group">
                    <button
                      onClick={handleRecipeSubmit}
                      className="button"
                      style={{ width: "auto", padding: "0.5rem 1.5rem" }}
                    >
                      Share Recipe
                    </button>
                    <button
                      onClick={() => setShowAddRecipe(false)}
                      className="secondary-button"
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
            {recipes.map((recipe) => (
              <div key={recipe.id} className="card">
                {/* Card Header */}
                <div className="recipe-header">
                  <div className="avatar">
                    {recipe.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h3
                      className="title"
                      style={{ fontSize: "1rem", marginBottom: "0.25rem" }}
                    >
                      {recipe.title}
                    </h3>
                    <div className="flex gap-sm text-sm text-gray">
                      <span>{recipe.author}</span>
                      <span>•</span>
                      <span>{recipe.date}</span>
                    </div>
                  </div>
                </div>

                {/* Recipe Image */}
                {recipe.image && (
                  <div className="image-container">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="recipe-image"
                    />
                    <div className="category">{recipe.category}</div>
                  </div>
                )}

                {/* Recipe Content */}
                <div className="card-content">
                  <p
                    style={{
                      color: "#374151",
                      marginBottom: "1rem",
                      lineHeight: "1.5",
                    }}
                  >
                    {recipe.description}
                  </p>

                  {/* Actions */}
                  <div className="recipe-actions">
                    <div className="flex gap-lg">
                      <button className="action-button text-red">
                        <span>❤️</span>
                        <span>{recipe.likes}</span>
                      </button>
                      <button className="action-button">
                        <span>📅</span>
                      </button>
                    </div>
                    <span className="text-sm" style={{ color: "#9ca3af" }}>
                      {recipe.likes} people liked this recipe
                    </span>
                  </div>
                </div>
              </div>
            ))}
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
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="input text-sm"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input text-sm"
                      required
                    />
                    <div className="flex gap-sm">
                      <button
                        onClick={handleUserSubmit}
                        className="button text-sm"
                        style={{ width: "auto", padding: "0.25rem 0.75rem" }}
                      >
                        Add
                      </button>
                      <button
                        onClick={() => setShowAddUser(false)}
                        className="secondary-button"
                        style={{ padding: "0.25rem 0.75rem" }}
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
                  <span className="stat-value">{users.length}</span>
                </div>
                <div className="stat-item">
                  <span className="text-gray">Total Likes</span>
                  <span className="stat-value">
                    {recipes.reduce((sum, recipe) => sum + recipe.likes, 0)}
                  </span>
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
