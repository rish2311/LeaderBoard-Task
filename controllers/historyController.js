const ClaimHistory = require('../models/ClaimHistory');

// GET /history - Get claim history with optional userId filtering
exports.getHistory = async (req, res) => {
  try {
    const { userId } = req.query;
    const filter = userId ? { userId } : {};

    const history = await ClaimHistory.find(filter)
      .populate('userId', 'name avatar')
      .sort({ timestamp: -1 })
      .limit(100);

    res.json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};