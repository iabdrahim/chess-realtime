"use client";
import { createRoom } from "@/actions/create";
import { UseEffect } from "@/utils/hooks";
import { useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export const initialState = {
  message: null,
};

export default function CreateRoom() {
  let [isPrivate, setPrivate] = useState(false);
  let localeId = useRef<string>("");
  UseEffect(() => {
    let id = localStorage.getItem("playerId");
    if (!id) return;
    localeId.current = id;
  }, []);
  const [state, formAction] = useFormState(createRoom, initialState);
  const { pending } = useFormStatus();

  return (
    <form action={formAction} className="flex gap-4 flex-col items-center">
      <div className="flex flex-col gap-4">
        <input
          type="text"
          name="code"
          required
          placeholder="Room code"
          className="border-2 text-black outline-none pl-4 w-80 py-4 text-md rounded-md border-white"
        />
        <input
          type="text"
          disabled={!isPrivate}
          required={isPrivate}
          name="password"
          placeholder="Password"
          minLength={2}
          className="border-2 disabled:border-gray-700 text-black outline-none pl-4 w-80 py-4 text-md rounded-md border-white"
        />
        <input type="text" hidden value={localeId.current} name="playerId" />
        <div className="isPrivate flex items-center gap-2">
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={() => setPrivate(!isPrivate)}
            className="accent-[#ff685c] w-4 h-4"
            name="isPrivate"
            id="private"
          />
          <label htmlFor="private">is Private</label>
        </div>
        <h4>{state?.message}</h4>
        <button
          className="px-16 text-lg rounded-md py-4 bg-[#ff685c] hover:bg-[#ff6e64] font-bold "
          aria-disabled={pending}
        >
          Create A Room
        </button>
      </div>
    </form>
  );
}
