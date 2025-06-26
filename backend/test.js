// test.js
try {
  console.log('Testing index...');
  const indexRouter = require('./src/routes/index');
  console.log('✓ Index loaded');
  
  console.log('Testing users...');
  const usersRouter = require('./src/routes/users');
  console.log('✓ Users loaded');
  
  console.log('Testing auth...');
  const authRouter = require('./src/routes/auth');
  console.log('✓ Auth loaded');
  
  console.log('Testing recipes...');
  const recipesRouter = require('./src/routes/recipes');
  console.log('✓ Recipes loaded');
  
  console.log('All modules loaded successfully!');
} catch (error) {
  console.error('Error loading modules:', error);
}