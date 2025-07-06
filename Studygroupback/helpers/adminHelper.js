const userModel = require("../Models/User");
const groupModel = require("../Models/Group");
const filesModel = require("../Models/Files");
const { resolve, reject } = require("promise");

module.exports = adminHelpers = {
  getTopCards: () => {
    return new Promise((resolve, reject) => {
      Promise.all([userModel.countDocuments({}), groupModel.countDocuments({})])
        .then(([userCount, groupCount]) => {
          const cards = [
            { title: "Users", count: userCount },
            { title: "Groups", count: groupCount },
          ];
          resolve(cards);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  },
  getUsers: (userId) => {
    return new Promise((resolve, reject) => {
      userModel
        .find({ _id: { $ne: userId } })
        .select(["-pass", "-terms"])
        .then((res) => [resolve(res)])
        .catch((err) => {
          reject(err);
        });
    });
  },
};
