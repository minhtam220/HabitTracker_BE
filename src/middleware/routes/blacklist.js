// Assuming you're using some sort of in-memory storage like an array for simplicity.
const blacklist = [];

function addToBlacklist(token) {
  blacklist.push(token);
  console.log("blacklist.push(token): " + blacklist);
}

function checkWithBlacklist(token) {
  return blacklist.includes(token);
}

module.exports = {
  addToBlacklist,
  checkWithBlacklist,
};
