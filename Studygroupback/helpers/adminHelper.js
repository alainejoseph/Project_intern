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

  getGroups: () => {
    return new Promise((resolve, reject) => {
      groupModel
        .find()
        .then((groups) => {
          console.log(groups);
          resolve(groups);
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    });
  },

  getUser: (userId) => {
    return new Promise((resolve, reject) => {
      userModel
        .findById(userId)
        .then((user) => {
          console.log(user);
          resolve(user);
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    });
  },
  blockuser: (userId) => {
    return new Promise((resolve, reject) => {
      userModel
        .findOneAndUpdate({ _id: userId }, { isBlocked: true })
        .then((resdata) => {
          console.log(resdata);
          resolve();
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    });
  },
  unBlockUser: (userId) => {
    return new Promise((resolve, reject) => {
      userModel
        .findOneAndUpdate({ _id: userId }, { isBlocked: false })
        .then((resdata) => {
          console.log(resdata);
          resolve();
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    });
  },
  approveGroup: (groupId) => {
    return new Promise((resolve, reject) => {
      groupModel
        .findOneAndUpdate({ _id: groupId }, { isApproved: true })
        .then((resdata) => {
          console.log(resdata);
          resolve();
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    });
  },
};
