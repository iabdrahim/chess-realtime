"use server";

import { Chess } from "@/utils/chess.logic";
import { db } from "@/utils/firebase";
import {
  query,
  where,
  getDocs,
  collection,
  addDoc,
  getDoc,
} from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
let rooms = collection(db, "rooms");

export async function createRoom(prevState: any, formData: FormData) {
  let code = formData.get("code");
  let id = formData.get("playerId");
  let pass = formData.get("password");
  let isPrivate = formData.get("isPrivate");
  try {
    if (!code) {
      return { message: "the code required" };
    }
    if (!id) {
      return { message: "the user id is required" };
    }
    if (isPrivate == "on" && !pass) {
      return { message: "this password is not valid" };
    }
    const roomQ = query(rooms, where("code", "==", code));
    let data = await getDocs(roomQ);
    if (data.docs.length != 0) {
      return { message: "this code is alerdy used please choose another one" };
    }
    let board = new Chess();
    let newRoom = await addDoc(rooms, {
      board: JSON.stringify(board.InitailBoard),
      players: {
        white: {
          id: id,
          loot: [],
        },
        black: { id: null, loot: [] },
      },
      whiteTurn: true,
      isWhiteHasWon: null,
      code,
      pass: isPrivate == "on" ? pass : null,
    });
    let doc = await getDoc(newRoom);
  } catch (err: any) {
    console.log(err.message);
    return { message: "Failed To create" };
  }
  revalidatePath(`/rooms/${code}`);
  redirect(`/rooms/${code}`);
  return { message: null };
}
