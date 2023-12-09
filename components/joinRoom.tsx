"use client";
import { db } from "@/utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Model from "./model";
let rooms = collection(db, "rooms");

export default function JoinRoom() {
  let [code, setCode] = useState("");
  let [nothing, setNFound] = useState(false);
  const roomQ = query(rooms, where("pass", "==", null));
  let r = useRouter();
  let foundRandom = async () => {
    let data = await getDocs(roomQ);
    if (data.empty) {
      setNFound(true);
      return;
    }
    let lastroom = data.docs.pop();
    r.push("/rooms/" + lastroom?.data().code);
    return;
  };
  return (
    <div className="flex flex-col gap-4 items-center">
      {nothing && (
        <Model>
          <h4 className="text-2xl font-semibold">
            Cloud not found any public rooms try again later or ycreate your own
          </h4>
        </Model>
      )}
      <input
        type="text"
        name="code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Room code"
        className="border-2 text-black outline-none pl-4 w-80 py-4 text-md rounded-md border-white"
      />
      <Link href={"/rooms/" + code}>
        <button className="px-16 text-lg rounded-md py-4 bg-[#ff685c] hover:bg-[#ff6e64] font-bold ">
          Join this room
        </button>
      </Link>
      <button
        className="bg-[#017a91] hover:bg-[#017992] px-16 text-lg rounded-md py-4 font-bold"
        onClick={() => foundRandom()}
      >
        Join A Random Room
      </button>
    </div>
  );
}
