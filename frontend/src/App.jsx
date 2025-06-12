import { useState, useEffect } from "react";

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

  // CSS styles as objects
  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #fff7ed 0%, #fef3c7 100%)",
      fontFamily: "system-ui, -apple-system, sans-serif",
    },
    authContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      padding: "1rem",
    },
    authCard: {
      background: "white",
      borderRadius: "1rem",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      padding: "2rem",
      width: "100%",
      maxWidth: "28rem",
    },
    logo: {
      textAlign: "center",
      marginBottom: "2rem",
    },
    logoIcon: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "4rem",
      height: "4rem",
      backgroundColor: "#fed7aa",
      borderRadius: "50%",
      marginBottom: "1rem",
      fontSize: "2rem",
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#1f2937",
      marginBottom: "0.5rem",
      margin: 0,
    },
    subtitle: {
      color: "#6b7280",
      margin: 0,
    },
    formGroup: {
      marginBottom: "1rem",
    },
    gridTwo: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "1rem",
      marginBottom: "1rem",
    },
    input: {
      width: "100%",
      padding: "0.75rem 1rem",
      border: "1px solid #d1d5db",
      borderRadius: "0.5rem",
      fontSize: "1rem",
      boxSizing: "border-box",
      outline: "none",
      transition: "all 0.2s",
    },
    inputFocus: {
      borderColor: "#ea580c",
      boxShadow: "0 0 0 3px rgba(234, 88, 12, 0.1)",
    },
    button: {
      width: "100%",
      padding: "0.75rem",
      backgroundColor: "#ea580c",
      color: "white",
      border: "none",
      borderRadius: "0.5rem",
      fontSize: "1rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    buttonHover: {
      backgroundColor: "#c2410c",
    },
    linkButton: {
      background: "none",
      border: "none",
      color: "#ea580c",
      cursor: "pointer",
      fontSize: "1rem",
      fontWeight: "500",
      marginTop: "1.5rem",
    },
    error: {
      marginTop: "1rem",
      padding: "0.75rem",
      backgroundColor: "#fee2e2",
      border: "1px solid #fecaca",
      color: "#dc2626",
      borderRadius: "0.5rem",
      fontSize: "0.875rem",
    },
    mainContainer: {
      minHeight: "100vh",
      backgroundColor: "#f9fafb",
    },
    header: {
      backgroundColor: "white",
      borderBottom: "1px solid #e5e7eb",
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    },
    headerContent: {
      maxWidth: "72rem",
      margin: "0 auto",
      padding: "1rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    headerLeft: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
    },
    headerIcon: {
      width: "2.5rem",
      height: "2.5rem",
      backgroundColor: "#ea580c",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: "1.25rem",
    },
    headerRight: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    },
    content: {
      maxWidth: "72rem",
      margin: "0 auto",
      padding: "2rem 1rem",
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: "2rem",
    },
    sectionHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "1.5rem",
    },
    sectionTitle: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#1f2937",
      margin: 0,
    },
    addButton: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      backgroundColor: "#ea580c",
      color: "white",
      border: "none",
      padding: "0.5rem 1rem",
      borderRadius: "0.5rem",
      cursor: "pointer",
      fontSize: "0.875rem",
      fontWeight: "500",
    },
    card: {
      backgroundColor: "white",
      borderRadius: "0.75rem",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      border: "1px solid #e5e7eb",
      overflow: "hidden",
      marginBottom: "1.5rem",
      transition: "box-shadow 0.2s",
    },
    cardHover: {
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    },
    cardContent: {
      padding: "1.5rem",
    },
    recipeHeader: {
      padding: "1rem",
      borderBottom: "1px solid #e5e7eb",
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
    },
    avatar: {
      width: "2.5rem",
      height: "2.5rem",
      backgroundColor: "#ea580c",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: "0.875rem",
      fontWeight: "500",
    },
    recipeImage: {
      width: "100%",
      height: "16rem",
      objectFit: "cover",
      position: "relative",
    },
    imageContainer: {
      position: "relative",
    },
    category: {
      position: "absolute",
      top: "1rem",
      right: "1rem",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      color: "white",
      padding: "0.25rem 0.75rem",
      borderRadius: "9999px",
      fontSize: "0.875rem",
    },
    recipeActions: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: "1rem",
    },
    actionButton: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      background: "none",
      border: "none",
      color: "#6b7280",
      cursor: "pointer",
      fontSize: "0.875rem",
    },
    textarea: {
      width: "100%",
      padding: "0.75rem 1rem",
      border: "1px solid #d1d5db",
      borderRadius: "0.5rem",
      fontSize: "1rem",
      boxSizing: "border-box",
      outline: "none",
      resize: "none",
      fontFamily: "inherit",
    },
    buttonGroup: {
      display: "flex",
      gap: "0.75rem",
    },
    secondaryButton: {
      padding: "0.5rem 1.5rem",
      backgroundColor: "#e5e7eb",
      color: "#374151",
      border: "none",
      borderRadius: "0.5rem",
      cursor: "pointer",
      fontSize: "0.875rem",
    },
    sidebar: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem",
    },
    userList: {
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
    },
    userItem: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      fontWeight: "500",
      color: "#1f2937",
      fontSize: "0.875rem",
      margin: 0,
    },
    userEmail: {
      color: "#6b7280",
      fontSize: "0.75rem",
      margin: 0,
    },
    statsGrid: {
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
    },
    statItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    statValue: {
      fontWeight: "600",
      color: "#ea580c",
    },
    footer: {
      backgroundColor: "white",
      borderTop: "1px solid #e5e7eb",
      marginTop: "3rem",
      textAlign: "center",
      padding: "1.5rem",
      color: "#6b7280",
    },
  };

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

    // Mock authentication - in real app, this would be an API call
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
      <div style={styles.container}>
        <div style={styles.authContainer}>
          <div style={styles.authCard}>
            <div style={styles.logo}>
              <div style={styles.logoIcon}>🥖</div>
              <h1 style={styles.title}>La Baguette</h1>
              <p style={styles.subtitle}>Recipe Hub</p>
            </div>

            <div>
              <h2
                style={{
                  ...styles.title,
                  textAlign: "center",
                  marginBottom: "1.5rem",
                }}
              >
                {authMode === "signup" ? "Create Account" : "Welcome Back"}
              </h2>

              {authMode === "signup" && (
                <div style={styles.gridTwo}>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={authFirstName}
                    onChange={(e) => setAuthFirstName(e.target.value)}
                    style={styles.input}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={authLastName}
                    onChange={(e) => setAuthLastName(e.target.value)}
                    style={styles.input}
                    required
                  />
                </div>
              )}

              <div style={styles.formGroup}>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <input
                  type="password"
                  placeholder="Password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>

              <button
                onClick={handleAuth}
                style={styles.button}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor =
                    styles.buttonHover.backgroundColor)
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor =
                    styles.button.backgroundColor)
                }
              >
                {authMode === "signup" ? "Create Account" : "Sign In"}
              </button>
            </div>

            <div style={{ textAlign: "center" }}>
              <button
                onClick={() =>
                  setAuthMode(authMode === "signup" ? "login" : "signup")
                }
                style={styles.linkButton}
              >
                {authMode === "signup"
                  ? "Already have an account? Sign In"
                  : "Need an account? Sign Up"}
              </button>
            </div>

            {authError && <div style={styles.error}>{authError}</div>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.mainContainer}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerLeft}>
            <div style={styles.headerIcon}>🥖</div>
            <div>
              <h1 style={{ ...styles.title, fontSize: "1.25rem" }}>
                La Baguette
              </h1>
              <p style={{ ...styles.subtitle, fontSize: "0.875rem" }}>
                Recipe Hub
              </p>
            </div>
          </div>
          <div style={styles.headerRight}>
            <span style={{ color: "#374151" }}>Welcome, {user.firstName}!</span>
            <button
              onClick={handleLogout}
              style={{ ...styles.actionButton, color: "#6b7280" }}
            >
              <span>🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div style={styles.content}>
        {/* Main Content - Recipes */}
        <div>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Recipe Feed</h2>
            <button
              onClick={() => setShowAddRecipe(true)}
              style={styles.addButton}
            >
              <span>+</span>
              <span>Add Recipe</span>
            </button>
          </div>

          {/* Add Recipe Modal */}
          {showAddRecipe && (
            <div style={styles.card}>
              <div style={styles.cardContent}>
                <h3
                  style={{
                    ...styles.title,
                    fontSize: "1.125rem",
                    marginBottom: "1rem",
                  }}
                >
                  Share a New Recipe
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Recipe title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={styles.input}
                    required
                  />
                  <textarea
                    placeholder="Describe your recipe..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    style={styles.textarea}
                    required
                  />
                  <div style={styles.buttonGroup}>
                    <button
                      onClick={handleRecipeSubmit}
                      style={{
                        ...styles.button,
                        width: "auto",
                        padding: "0.5rem 1.5rem",
                      }}
                    >
                      Share Recipe
                    </button>
                    <button
                      onClick={() => setShowAddRecipe(false)}
                      style={styles.secondaryButton}
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
              <div key={recipe.id} style={styles.card}>
                {/* Card Header */}
                <div style={styles.recipeHeader}>
                  <div style={styles.avatar}>
                    {recipe.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h3
                      style={{
                        ...styles.title,
                        fontSize: "1rem",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {recipe.title}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "0.875rem",
                        color: "#6b7280",
                      }}
                    >
                      <span>{recipe.author}</span>
                      <span>•</span>
                      <span>{recipe.date}</span>
                    </div>
                  </div>
                </div>

                {/* Recipe Image */}
                <div style={styles.imageContainer}>
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    style={styles.recipeImage}
                  />
                  <div style={styles.category}>{recipe.category}</div>
                </div>

                {/* Recipe Content */}
                <div style={styles.cardContent}>
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
                  <div style={styles.recipeActions}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <button
                        style={{ ...styles.actionButton, color: "#ef4444" }}
                      >
                        <span>❤️</span>
                        <span>{recipe.likes}</span>
                      </button>
                      <button style={styles.actionButton}>
                        <span>📅</span>
                      </button>
                    </div>
                    <span style={{ fontSize: "0.875rem", color: "#9ca3af" }}>
                      {recipe.likes} people liked this recipe
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div style={styles.sidebar}>
          {/* Community Members */}
          <div style={styles.card}>
            <div style={styles.cardContent}>
              <div style={{ ...styles.sectionHeader, marginBottom: "1rem" }}>
                <h3 style={{ ...styles.title, fontSize: "1.125rem" }}>
                  Community
                </h3>
                <button
                  onClick={() => setShowAddUser(true)}
                  style={{
                    ...styles.actionButton,
                    color: "#ea580c",
                    fontSize: "1.25rem",
                  }}
                >
                  +
                </button>
              </div>

              {/* Add User Form */}
              {showAddUser && (
                <div
                  style={{
                    marginBottom: "1rem",
                    padding: "1rem",
                    backgroundColor: "#f9fafb",
                    borderRadius: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.75rem",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      style={{ ...styles.input, fontSize: "0.875rem" }}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      style={{ ...styles.input, fontSize: "0.875rem" }}
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ ...styles.input, fontSize: "0.875rem" }}
                      required
                    />
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        onClick={handleUserSubmit}
                        style={{
                          ...styles.button,
                          width: "auto",
                          padding: "0.25rem 0.75rem",
                          fontSize: "0.875rem",
                        }}
                      >
                        Add
                      </button>
                      <button
                        onClick={() => setShowAddUser(false)}
                        style={{
                          ...styles.secondaryButton,
                          padding: "0.25rem 0.75rem",
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div style={styles.userList}>
                {users.map((user) => (
                  <div key={user.id} style={styles.userItem}>
                    <div
                      style={{
                        ...styles.avatar,
                        background:
                          "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                      }}
                    >
                      {user.firstName[0]}
                    </div>
                    <div style={styles.userInfo}>
                      <p style={styles.userName}>
                        {user.firstName} {user.lastName}
                      </p>
                      <p style={styles.userEmail}>{user.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={styles.card}>
            <div style={styles.cardContent}>
              <h3
                style={{
                  ...styles.title,
                  fontSize: "1.125rem",
                  marginBottom: "1rem",
                }}
              >
                Community Stats
              </h3>
              <div style={styles.statsGrid}>
                <div style={styles.statItem}>
                  <span style={{ color: "#6b7280" }}>Total Recipes</span>
                  <span style={styles.statValue}>{recipes.length}</span>
                </div>
                <div style={styles.statItem}>
                  <span style={{ color: "#6b7280" }}>Active Members</span>
                  <span style={styles.statValue}>{users.length}</span>
                </div>
                <div style={styles.statItem}>
                  <span style={{ color: "#6b7280" }}>Total Likes</span>
                  <span style={styles.statValue}>
                    {recipes.reduce((sum, recipe) => sum + recipe.likes, 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} La Baguette Recipe Hub. Bon appétit!</p>
      </footer>
    </div>
  );
}

export default App;
