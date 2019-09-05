/*!
 * Module dependencies
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('./../config');
/**
 * User schema
 */

const UserSchema = new Schema({
  'id': {
    'type': 'Number'
  },
  'name': {
    'type': 'String'
  },
  'username': {
    'type': 'String'
  },
  'email': {
    'type': 'String',
    'default':''
  },
  'avatar': {
    'type': 'String',
    'default':''
  },
  'address': {
    'street': {
      'type': 'String'
    },
    'suite': {
      'type': 'Date'
    },
    'city': {
      'type': 'String'
    },
    'zipcode': {
      'type': 'String'
    },
    'geo': {
      'lat': {
        'type': 'String'
      },
      'lng': {
        'type': 'String'
      }
    }
  },
  'phone': {
    'type': 'String'
  },
  'website': {
    'type': 'String'
  },
  'company': {
    'name': {
      'type': 'String'
    },
    'catchPhrase': {
      'type': 'String'
    },
    'bs': {
      'type': 'String'
    }
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

UserSchema.method({});

/**
 * Statics
 */
async function getDbs () {
  return new Promise((resolve, reject) => {
    const MongoClient = require('mongodb').MongoClient;
    const test = require('assert');
// Connection url
    const url = `${config.db}:27017`;
// Database Name
    const dbName = 'config';
// Connect using MongoClient
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
      // Use the admin database for the operation
      const adminDb = client.db(dbName).admin();
      // List all the available databases
      adminDb.listDatabases(function (err, dbs) {
        var a = dbs.databases.filter(db => {
          return db.name.startsWith('user_');
        });
        resolve(a);
        client.close();
      });
    });
  });

}

UserSchema.static('getUsersByDb', async function () {
  try {
    var dbs = await getDbs();
    var users = [];
    for (const db of dbs) {
      var options = { keepAlive: 1, useNewUrlParser: true };
      var connection = mongoose.createConnection(`${config.db}/${db.name}`, options);

      const UserModel = connection.model('User');
      let user = await UserModel.findOne()
      users.push(user);
    }
    return  users;
  } catch (e) {
    console.error(e);
  }
});

/**
 * Register
 */

mongoose.model('User', UserSchema);
