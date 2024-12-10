import mongoose from 'mongoose';

declare global {
  // Extend NodeJS.Global to include mongoose
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      mongoose: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      };
    }
  }
}

// Retrieve the MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Use the extended global type and initialize the cache
const cached = (global as typeof global & { mongoose?: NodeJS.Global['mongoose'] }).mongoose || {
  conn: null,
  promise: null,
};

// if (!global.NodeJS.Global.mongoose) {
//   global.mongoose = cached;
// }

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log('connecting to mongodb...', MONGODB_URI);

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
