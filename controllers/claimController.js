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

    // Create claim history entry
    await ClaimHistory.create({
      userId,
      pointsClaimed,
      timestamp: new Date()
    });

    res.json({
      user,
      pointsClaimed,
      message: `${user.name} claimed ${pointsClaimed} points!`
    });
  } catch (error) {
    console.error('Error claiming points:', error);
    res.status(500).json({ error: 'Failed to claim points' });
  }
};