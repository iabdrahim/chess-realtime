import { useEffect } from "react";
import { db } from "@/utils/firebase";
import {
  query,
  collection,
  orderBy,
  getDocs,
  updateDoc,
  addDoc,
  getDoc,
  doc,
} from "firebase/firestore";
import { Chess } from "./chess.logic";
let rooms = collection(db, "rooms");

export let UseEffect = (f: Function, args: any[] = []) => {
  let isRun = false;
  useEffect(() => {
    if (!isRun) {
      f();
      isRun = true;
    }

    return () => {
      isRun = true;
    };
  }, [...args]);
};

let getRooms = async () => {
  const q = query(rooms, orderBy("timestamp", "desc"));
  let data = await getDocs(q);
  console.log(data.docs);
};
let getRoom = async (id: string) => {
  const docRef = doc(db, "rooms", id);
  let data = await getDoc(docRef);
  console.log(data.data());
};
let addRoom = async () => {
  let data = await addDoc(rooms, {
    board: JSON.stringify(new Chess().InitailBoard),
    players: {
      white: {
        id: localStorage.getItem("playerId"),
        loot: [],
      },
      black: { id: null, loot: [] },
    },
    whiteTurn: Chess.isWhitesTurn,
    code: "bruh",
  });
  let doc = await getDoc(data);
  return doc.data()?.code;
};

export let updateRoom = async (id: string, data: any) => {
  const docRef = doc(db, "rooms", id);
  await updateDoc(docRef, data);
};
