require('dotenv').config();
const mongoose = require('mongoose');

async function check() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Successfully connected to DB at:', process.env.MONGODB_URI.split('@').pop() || 'localhost');
    
    const User = require('./models/User');
    const Task = require('./models/Task');
    
    const users = await User.find({});
    const tasks = await Task.find({});
    
    console.log('--- USERS ---');
    console.log(`Count: ${users.length}`);
    users.forEach(u => console.log(`- ${u.email} (ID: ${u._id})`));
    
    console.log('\n--- TASKS ---');
    console.log(`Count: ${tasks.length}`);
    tasks.forEach(t => console.log(`- ${t.title} [${t.status}] (User: ${t.user})`));
    
  } catch (err) {
    console.error('Error connecting or querying:', err);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from DB.');
  }
}

check();
