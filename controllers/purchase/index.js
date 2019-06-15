const purchaseModel = require('../../models/Purchases');

const purchaseList = purchaseModel.find({}, (err, list) => {
  console.log(list);
  return list;
});

module.exports = {
  purchaseList,
};
