// 27/11/23
"use client";

import CreateRoom from "@/components/createForm";
import JoinRoom from "@/components/joinRoom";
import { useState } from "react";

export default function Home() {
  let [createMode, setCreateMode] = useState(false);
  let [joinMode, setJoinMode] = useState(false);
  return (
    <div className="flex justify-center items-center min-h-screen flex-col gap-4">
      {createMode && <CreateRoom />}
      {joinMode && <JoinRoom />}
      {!createMode && !joinMode && (
        <div className="actions gap-4 flex flex-col">
          <button
            className="bg-[#017a91] hover:bg-[#017992] px-16 text-lg rounded-md py-4 font-bold"
            onClick={() => setJoinMode(true)}
          >
            Join a room
          </button>
          <button
            className="px-16 text-lg rounded-md py-4 bg-[#ff685c] hover:bg-[#ff6e64] font-bold"
            onClick={() => setCreateMode(true)}
          >
            Create A Room
          </button>
        </div>
      )}
      {(createMode || joinMode) && (
        <button
          className="px-16 text-lg rounded-md py-4 bg-gray-600 hover:bg-gray-700 font-bold"
          onClick={() => (setCreateMode(false), setJoinMode(false))}
        >
          Go Back
        </button>
      )}
    </div>
  );
}
