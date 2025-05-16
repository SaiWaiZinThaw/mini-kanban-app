import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import type { TaskType } from "./types/type";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const createTask = async (userId: string, taskData: Omit<TaskType, "id">) => {
  try {
    const tasksRef = collection(db, "tasks");
    await addDoc(tasksRef, {
      ...taskData,
      userId,
    });
  } catch (error) {
    console.error("Error creating task:", error);
  }
};

const deleteTask = async (taskId: string) => {
  try {
    await deleteDoc(doc(db, "tasks", taskId));
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

const updateTask = async (userId: string, updatedData: any) => {
  try {
    const taskRef = doc(db, "tasks", updatedData.id);
    await updateDoc(taskRef, {
      title: updatedData.title,
      description: updatedData.description,
      status: updatedData.status,
      userId,
    });
  } catch (err: any) {
    console.error("Error updating task:", err.message);
  }
};

export {
  createTask,
  updateTask,
  deleteTask,
  db,
  auth,
  provider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
  onSnapshot,
};
