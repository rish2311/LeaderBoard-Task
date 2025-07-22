const User = require('../models/User');

// GET /leaderboard - Get paginated leaderboard
exports.getLeaderboard = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalUsers = await User.countDocuments();
    
    // Get ALL users sorted by points to calculate proper ranks
    const allUsers = await User.find().sort({ totalPoints: -1, createdAt: 1 });
    
    // Add rank to each user based on their position in sorted list
    const usersWithRank = allUsers.map((user, index) => ({
      ...user.toObject(),
      rank: index + 1
    }));
    
    // Get paginated subset
    const paginatedUsers = usersWithRank
      .skip(skip)
      .limit(limit);


    res.json({
      users: paginatedUsers,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit),
        totalUsers,
        hasNextPage: page < Math.ceil(totalUsers / limit),
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
};