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
  apiKey: "AIzaSyDX8NvWaoLkzRCoJYr7gmO_Puu3YH9YRi4",
  authDomain: "to-do-app-b6304.firebaseapp.com",
  projectId: "to-do-app-b6304",
  storageBucket: "to-do-app-b6304.firebasestorage.app",
  messagingSenderId: "1027200460343",
  appId: "1:1027200460343:web:cb9fb5ec8fd7a838a241b2",
  measurementId: "G-PZKGDGGP36",
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
export {
  createTask,
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
