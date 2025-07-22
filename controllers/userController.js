const User = require('../models/User');

// POST /users - Add new user
exports.createUser = async (req, res) => {
  try {
    const { name, avatar } = req.body;
    
    if (!name || name.trim().length === 0) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const user = new User({
      name: name.trim(),
      avatar: avatar || '',
      totalPoints: 0
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// GET /users - Fetch all users for dropdown
exports.getUsers = async (req, res) => {
  try {
    // Get all users sorted by points and add proper ranking
    const users = await User.find().sort({ totalPoints: -1, createdAt: 1 });
    
    // Add rank to each user
    const usersWithRank = users.map((user, index) => ({
      ...user.toObject(),
      rank: index + 1
    }));
    
    res.json(usersWithRank);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};