const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

// POST /claim/:userId - Claim random points
exports.claimPoints = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Generate random points between 1-10
    const pointsClaimed = Math.floor(Math.random() * 10) + 1;

    // Update user's total points
    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { totalPoints: pointsClaimed } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await ClaimHistory.create({
      userId,
      pointsClaimed: pointsClaimed,
      timestamp: new Date()
    });

    // Get updated leaderboard with proper ranking
    const users = await User.find().sort({ totalPoints: -1, createdAt: 1 });
    const leaderboard = users.map((u, index) => ({
      rank: index + 1,
      name: u.name,
      totalPoints: u.totalPoints,
      avatar: u.avatar
    }));

    res.json({
      pointsClaimed: pointsClaimed,
      message: `${user.name} claimed ${pointsClaimed} points!`,
      leaderboard
    });
  } catch (error) {
    console.error('Error claiming points:', error);
    res.status(500).json({ error: 'Failed to claim points' });
  }
};