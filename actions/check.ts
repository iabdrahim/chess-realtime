"use server";

import { db } from "@/utils/firebase";
import { doc, collection, addDoc, getDoc, updateDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function checkPass(prevState: any, formData: FormData) {
  let id = formData.get("roomId") as string;
  let playerId = formData.get("playerId");
  let pass = formData.get("password");
  let code;
  try {
    if (!playerId) {
      return { message: "the player id is reauired" };
    }
    if (!id) {
      return { message: "room id is not valid" };
    }
    if (!pass) {
      return { message: "this password is not valid" };
    }
    const docRef = doc(db, "rooms", String(id));
    let data = await getDoc(docRef);
    let room = data.data();
    if (!room) {
      return { message: "this room is not found" };
    }
    if (room?.pass === pass) {
      if (!room?.players.white.id) {
        await updateDoc(docRef, {
          players: {
            ...room.players,
            white: { ...room.players.white, id: playerId },
          },
        });
      } else if (!room?.players.black.id) {
        await updateDoc(docRef, {
          players: {
            ...room.players,
            black: { ...room.players.black, id: playerId },
          },
        });
      }
    } else {
      return { message: "incorrect password" };
    }
    code = room?.code;
  } catch (err: any) {
    console.log(err);
    return { message: "Failed To join" };
  }
  revalidatePath(`/rooms/${code}`);
  redirect(`/rooms/${code}`);
}
