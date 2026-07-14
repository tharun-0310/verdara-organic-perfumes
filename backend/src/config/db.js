const mongoose = require('mongoose');

// Ensure .env is loaded — safe to call multiple times, dotenv is idempotent
require('dotenv').config();

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('❌ MONGODB_URI is not defined in .env');
    console.error('   Format: mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority');
    return;
  }

  // Show which cluster we're connecting to (hide credentials)
  const safeUri = uri.replace(/:\/\/[^@]+@/, '://<credentials>@');
  console.log(`🔌 Connecting to MongoDB Atlas: ${safeUri}`);

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000, // 15s for Atlas
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    });

    console.log(`✅ MongoDB Atlas connected!`);
    console.log(`   Host    : ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Atlas connection failed: ${error.message}`);
    console.error('');
    console.error('   Common causes:');
    console.error('   1. IP not whitelisted → Atlas Dashboard → Network Access → Add 0.0.0.0/0');
    console.error('   2. Wrong password    → Special chars must be URL-encoded (@ → %40, # → %23)');
    console.error('   3. Wrong cluster URL → Copy fresh URI from Atlas → Connect → Drivers');
    console.error('   4. Missing db name   → URI must include /verdara-organic-perfumes before the ?');
    console.error('');
    console.warn('⚠️  Server continues without DB. Fix the URI and restart.');
  }
};

// ─── Connection lifecycle events ─────────────────────────────────────────────
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB Atlas disconnected. Mongoose will auto-retry...');
});

mongoose.connection.on('reconnected', () => {
  console.log('✅ MongoDB Atlas reconnected.');
});

mongoose.connection.on('error', (err) => {
  console.error(`❌ MongoDB Atlas error: ${err.message}`);
});

module.exports = connectDB;
