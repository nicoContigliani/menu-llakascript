import { ObjectId } from "mongodb";
import clientPromise from "../utils/mongodb";

const getUsers = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("menuDB");
    const collection = db.collection("users");

    const users = await collection.find({}).toArray();
    return users;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw new Error("No se pudieron obtener los usuarios.");
  }
};

const getUserById = async (id: string) => {
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error("ID no válido.");
    }

    const client = await clientPromise;
    const db = client.db("menuDB");
    const collection = db.collection("users");

    const user = await collection.findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error(`Usuario con ID ${id} no encontrado.`);
    }

    return user;
  } catch (error) {
    console.error(`Error al obtener el usuario con ID ${id}:`, error);
    throw new Error("No se pudo obtener el usuario.");
  }
};

const createUser = async (user: any) => {
  try {
    if (!user || typeof user !== "object" || Object.keys(user).length === 0) {
      throw new Error("Datos de usuario inválidos o vacíos.");
    }

    const client = await clientPromise;
    const db = client.db("menuDB");
    const collection = db.collection("users");

    const result = await collection.insertOne(user);
    return { ...user, _id: result.insertedId };
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    throw new Error("No se pudo crear el usuario.");
  }
};

const updateUser = async (id: string, user: any) => {
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error("ID no válido.");
    }

    if (!user || typeof user !== "object" || Object.keys(user).length === 0) {
      throw new Error("Datos de usuario inválidos o vacíos.");
    }

    const client = await clientPromise;
    const db = client.db("menuDB");
    const collection = db.collection("users");

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: user }
    );

    if (result.modifiedCount === 0) {
      throw new Error(`No se pudo actualizar el usuario con ID ${id}.`);
    }

    return { _id: id, ...user };
  } catch (error) {
    console.error(`Error al actualizar el usuario con ID ${id}:`, error);
    throw new Error("No se pudo actualizar el usuario.");
  }
};

const deleteUser = async (id: string) => {
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error("ID no válido.");
    }

    const client = await clientPromise;
    const db = client.db("menuDB");
    const collection = db.collection("users");

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      throw new Error(`No se pudo eliminar el usuario con ID ${id}.`);
    }

    return { message: `Usuario con ID ${id} eliminado exitosamente.` };
  } catch (error) {
    console.error(`Error al eliminar el usuario con ID ${id}:`, error);
    throw new Error("No se pudo eliminar el usuario.");
  }
};

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

