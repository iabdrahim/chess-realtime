"use client";

import { UseEffect } from "@/utils/hooks";
import Model from "./model";
import { useRef } from "react";
import { useFormState } from "react-dom";
import { checkPass } from "@/actions/check";
import { initialState } from "./createForm";

export default function PasswordForm({
  roomId,
}: {
  roomId: { current: string };
}) {
  let localeId = useRef<string>("");
  UseEffect(() => {
    let id = localStorage.getItem("playerId");
    if (!id) return;
    localeId.current = id;
  }, []);
  const [state, formAction] = useFormState(checkPass, initialState);
  return (
    <Model>
      <h3 className="text-xl font-bold">
        This room is private, please enter the passwrod to join
      </h3>
      <form action={formAction}>
        <input
          type="text"
          required
          name="password"
          placeholder="Password"
          minLength={2}
          className="border-2 disabled:border-gray-700 text-black outline-none pl-4 w-80 py-4 text-md rounded-md border-white"
        />
        <input type="text" hidden value={localeId.current} name="playerId" />
        <input type="text" hidden value={roomId.current} name="roomId" />
        <div className="msg">{state?.message}</div>
        <button className="px-16 text-lg rounded-md py-4 bg-[#ff685c] hover:bg-[#ff6e64] font-bold ">
          Join this room
        </button>
      </form>
    </Model>
  );
}
