const axios = require('axios');

const CRIC_API_KEY = 'bf75a6d7-6f3d-403c-b2f1-3acd054f246e';
const CRIC_API_URL = 'https://api.cricketdata.org/v1/matches';

async function getCricketScore(query) {
  try {
    const response = await axios.get(CRIC_API_URL, {
      headers: {
        'Authorization': `Bearer ${CRIC_API_KEY}`
      }
    });

    const matches = response.data.data;
    const match = matches.find(m => 
      m.home_team_name.toLowerCase().includes(query.toLowerCase()) || 
      m.away_team_name.toLowerCase().includes(query.toLowerCase())
    );

    if (!match) return 'Match not found. Please check the team names.';

    const score = match.live_details ? match.live_details.score : 'No live score available';
    return `${match.home_team_name} vs ${match.away_team_name}: ${score}`;
  } catch (error) {
    console.error(error);
    return 'Error retrieving score.';
  }
}

module.exports = getCricketScore;
