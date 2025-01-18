// Import MongoDB client
import { MongoClient } from "mongodb";

// MongoDB connection URI
const uri =
  "mongodb+srv://Chris:Chris6211@db.4zy7r.mongodb.net/db?retryWrites=true&w=majority&tls=true&tlsAllowInvalidCertificates=true&appName=db";

// Create a new MongoClient
const client = new MongoClient(uri);

async function updateUserProfiles() {
  try {
    // Connect to the MongoDB client
    await client.connect();
    console.log("Connected to MongoDB");

    // Access the database and collection
    const database = client.db("db");
    const userProfiles = database.collection("user_profiles");

    // Update all documents in the user_profiles collection
    const result = await userProfiles.updateMany(
      {},
      {
        $set: {
          phished: false,
          victims: 0,
          loot: 0,
          referral: "",
          updated: false,
        },
      }
    );

    console.log(
      `Matched ${result.matchedCount} documents and updated ${result.modifiedCount} documents.`
    );
  } catch (error) {
    console.error("Error updating documents:", error);
  } finally {
    // Close the database connection
    await client.close();
    console.log("Connection closed.");
  }
}

// Run the update function
updateUserProfiles();
