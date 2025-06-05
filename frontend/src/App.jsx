import { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Container, Card, CardContent, TextField, Box, Grid, List, ListItem, ListItemText, Avatar
} from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

function App() {
  // Auth state
  const [authMode, setAuthMode] = useState("login");
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authFirstName, setAuthFirstName] = useState('');
  const [authLastName, setAuthLastName] = useState('');
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState('');

  // User state
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  // Recipe state
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Fetch users
  useEffect(() => {
    fetch("http://localhost:3000/users/")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  // Fetch recipes
  useEffect(() => {
    fetch("http://localhost:3000/recipes/")
      .then(res => res.json())
      .then(data => setRecipes(data));
  }, []);

  // Auth handlers
  const handleAuth = async (e) => {
    e.preventDefault();
    const url = authMode === "signup"
      ? "http://localhost:3000/auth/signup"
      : "http://localhost:3000/auth/login";
    const body = authMode === "signup"
      ? { firstName: authFirstName, lastName: authLastName, email: authEmail, password: authPassword }
      : { email: authEmail, password: authPassword };
    setAuthError('');
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        setUser(data.user);
        setAuthEmail('');
        setAuthPassword('');
        setAuthFirstName('');
        setAuthLastName('');
      } else {
        setAuthError(data.error || "Authentication failed");
      }
    } catch (err) {
      setAuthError("Network error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Add user
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3000/users/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email })
    });
    fetch("http://localhost:3000/users/")
      .then(res => res.json())
      .then(data => setUsers(data));
    setFirstName('');
    setLastName('');
    setEmail('');
  };

  // Add recipe
  const handleRecipeSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3000/recipes/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description })
    });
    fetch("http://localhost:3000/recipes/")
      .then(res => res.json())
      .then(data => setRecipes(data));
    setTitle('');
    setDescription('');
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <RestaurantMenuIcon sx={{ mr: 2 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            La Baguette Recipe Hub
          </Typography>
          {user && (
            <>
              <Typography sx={{ mr: 2 }}>
                Welcome, {user.firstName}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        {!user ? (
          <Card sx={{ maxWidth: 400, mx: "auto", p: 2 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {authMode === "signup" ? "Sign Up" : "Log In"}
              </Typography>
              <Box component="form" onSubmit={handleAuth} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {authMode === "signup" && (
                  <>
                    <TextField label="First Name" value={authFirstName} onChange={e => setAuthFirstName(e.target.value)} required />
                    <TextField label="Last Name" value={authLastName} onChange={e => setAuthLastName(e.target.value)} required />
                  </>
                )}
                <TextField label="Email" value={authEmail} onChange={e => setAuthEmail(e.target.value)} required />
                <TextField label="Password" type="password" value={authPassword} onChange={e => setAuthPassword(e.target.value)} required />
                <Button type="submit" variant="contained">{authMode === "signup" ? "Sign Up" : "Log In"}</Button>
              </Box>
              <Button onClick={() => setAuthMode(authMode === "signup" ? "login" : "signup")} sx={{ mt: 2 }}>
                {authMode === "signup" ? "Already have an account? Log In" : "No account? Sign Up"}
              </Button>
              {authError && <Typography color="error">{authError}</Typography>}
            </CardContent>
          </Card>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Add Recipe</Typography>
                  <Box component="form" onSubmit={handleRecipeSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField label="Title" value={title} onChange={e => setTitle(e.target.value)} required />
                    <TextField label="Description" value={description} onChange={e => setDescription(e.target.value)} required />
                    <Button type="submit" variant="contained">Add Recipe</Button>
                  </Box>
                </CardContent>
              </Card>
              <Card sx={{ mt: 4 }}>
                <CardContent>
                  <Typography variant="h6">Recipes</Typography>
                  <List>
                    {recipes.map(recipe => (
                      <ListItem key={recipe.id}>
                        <ListItemText primary={recipe.title} secondary={recipe.description} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Community Members</Typography>
                  <Box component="form" onSubmit={handleUserSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField label="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                    <TextField label="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} required />
                    <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                    <Button type="submit" variant="contained">Add User</Button>
                  </Box>
                  <List>
                    {users.map(user => (
                      <ListItem key={user.id}>
                        <Avatar sx={{ bgcolor: "#d2691e", mr: 2 }}>
                          {user.firstName[0]}
                        </Avatar>
                        <ListItemText primary={`${user.firstName} ${user.lastName}`} secondary={user.email} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
      <Box sx={{ textAlign: "center", mt: 4, color: "#d2691e" }}>
        <Typography variant="body2">© {new Date().getFullYear()} La Baguette. Bon appétit!</Typography>
      </Box>
    </>
  );
}

export default App;