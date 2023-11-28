const db = require('../config/connection');
const { User, Snap, Department } = require('../models');
const userSeeds = require('./userSeeds.json');
const snapSeeds = require('./snapSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Snap', 'snaps');

    await cleanDB('User', 'users');

    await User.create(userSeeds);

    for (let i = 0; i < snapSeeds.length; i++) {
      const { _id, snapDepartment } = await Snap.create(snapSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: snapDepartment },
        {
          $addToSet: {
            snaps: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
