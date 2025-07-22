const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

// POST /api/claim
exports.claimPoints = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'userId is required' });

    // Random points between 1 and 10
    const points = Math.floor(Math.random() * 10) + 1;

    // Update user
    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { totalPoints: points } },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Log claim
    await ClaimHistory.create({
      userId,
      claimedPoints: points
    });

    // Get updated leaderboard
    const users = await User.find().sort({ totalPoints: -1 });
    const leaderboard = users.map((u, idx) => ({
      name: u.name,
      avatarUrl: u.avatarUrl,
      totalPoints: u.totalPoints,
      rank: idx + 1
    }));

    // Find new rank for this user
    const updatedUser = leaderboard.find(u => u.name === user.name && u.avatarUrl === user.avatarUrl && u.totalPoints === user.totalPoints);

    res.json({
      user: updatedUser,
      claimedPoints: points,
      leaderboard
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}; 