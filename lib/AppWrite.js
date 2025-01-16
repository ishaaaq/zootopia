import {
  Client,
  Account,
  Avatars,
  Databases,
  Query,
  Storage,
} from "react-native-appwrite";
import uploadFile from "@/lib/supabase";

export const config = {
  platform: "com.deint.zootopia",
  endpoint: "https://cloud.appwrite.io/v1",
  project: "677ed3a8002febffb9ee",
  database: "67810fc40025cb950ad1",
  zoo: "6781102400312fda053b",
  supplier: "67811c670007b10ef3ad",
  buyer: "67811edf001cb07f401a",
  animal: "6782a44100047a4b7480",
  gallery: "67864581002364639072",
};

export const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setPlatform(config.platform)
  .setProject(config.project);

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export async function signup(usertype, values) {
  try {
    const user = await account.create(
      "unique()",
      values.email,
      values.password
    );

    switch (usertype) {
      case "zoo":
        await databases.createDocument(config.database, config.zoo, user.$id, {
          zooname: values.zooName,
          location: values.zooLocation,
          regnumber: values.registrationNumber,
          email: values.email,
          phone: values.phoneNumber,
          password: values.password,
          usertype: usertype,
        });
        break;
      case "supplier":
        await databases.createDocument(
          config.database,
          config.supplier,
          user.$id,
          {
            name: values.businessName,
            email: values.email,
            phone: values.phoneNumber,
            password: values.password,
            usertype: usertype,
          }
        );
        break;
      case "buyer":
        await databases.createDocument(
          config.database,
          config.buyer,
          user.$id,
          {
            name: values.name,
            email: values.email,
            phone: values.phoneNumber,
            password: values.password,
            usertype: usertype,
          }
        );
        break;
      default:
        throw new Error("Invalid user type");
    }
    return user;
  } catch (err) {
    console.error("Sign Up Error:", err.message);
    throw err;
  }
}

export async function login(values) {
  console.log("email:", values.email, "password:", values.password);
  try {
    const response = await account.createEmailPasswordSession(
      values.email,
      values.password
    );
    console.log("Login response:", response);
    return response;
  } catch (err) {
    console.error("Login Error:", err.message, err.response);
    throw err;
  }
}

export async function logout() {
  try {
    const response = await account.deleteSession("current");
    console.log("logged out");
    return response;
  } catch (err) {
    console.error("Logout Error", err.message);
    throw err;
  }
}

export async function getCurrentUser() {
  try {
    const user = await account.get();
    console.log("Current user response:", user);

    let userDetails;

    try {
      userDetails = await databases.getDocument(
        config.database,
        config.zoo,
        user.$id
      );
    } catch (err) {
      try {
        userDetails = await databases.getDocument(
          config.database,
          config.supplier,
          user.$id
        );
      } catch (err) {
        userDetails = await databases.getDocument(
          config.database,
          config.buyer,
          user.$id
        );
      }
    }

    console.log("Custom user properties:", userDetails);
    const userAvatar = avatar.getInitials(
      userDetails.name || userDetails.zooname
    );
    return {
      ...userDetails,
      user,
      avatar: userAvatar.toString(),
    };
  } catch (error) {
    console.error("Get user error:", error);
    return null;
  }
}

export async function addAnimal(supplierId, photo, values) {
  try {
    const imageUrl = await uploadFile(photo.uri);
    const completeAnimalData = {
      ...values,
      quantity: Number(values.quantity),
      price: Number(values.price),
      image: imageUrl,
      supplier: supplierId,
    };
    const newAnimal = await databases.createDocument(
      config.database,
      config.animal,
      "unique()",
      completeAnimalData
    );
    console.log("Animal successfully added:", newAnimal);
    return newAnimal;
  } catch (error) {
    console.error("Error adding animal:", error.message);
    throw error;
  }
}

export const fetchAnimalsForCurrentUser = async () => {
  try {
    const user = await account.get();
    const userId = user.$id;

    const response = await databases.listDocuments(
      config.database,
      config.animal,
      [Query.equal("supplier", userId)]
    );

    return response.documents;
  } catch (error) {
    console.error("Error fetching animals for current user:", error.message);
    return [];
  }
};

export const fetchAllAnimals = async () => {
  try {
    const response = await databases.listDocuments(
      config.database,
      config.animal
    );
    console.log("Fetched animos:", response.documents);
    return response.documents;
  } catch (error) {
    console.log("Error getting all animals:", error);
  }
};
