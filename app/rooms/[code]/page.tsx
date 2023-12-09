"use client";
import Board from "@/components/board";
import Model from "@/components/model";
import { Chess } from "@/utils/chess.logic";
import { db } from "@/utils/firebase";
import { UseEffect } from "@/utils/hooks";
import { FaDoorOpen } from "react-icons/fa";
import { useRouter } from "next/navigation";
import {
  query,
  collection,
  getDocs,
  updateDoc,
  onSnapshot,
  doc,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import uuid from "uuid-random";
import PasswordForm from "@/components/checkPassword";
import { IBoard, IPlayers } from "@/utils/types";

let board = new Chess();
let rooms = collection(db, "rooms");

export default function Rooms({ params }: { params: { code: string[] } }) {
  let [isWinnerWhite, setWinnerIsWhite] = useState<boolean | null>(null);
  let [loader, setLoader] = useState<number | null>(null);
  let [chessBoard, setChessBoard] = useState<IBoard[][]>(board.InitailBoard);
  let [players, setPlayers] = useState<IPlayers>({
    white: { loot: [], id: "" },
    black: { loot: [], id: "" },
  });
  let [whoami, setI] = useState("");
  let [ModelFull, setMFull] = useState(false);
  let [ModelError, setMError] = useState(false);
  let [ModelPass, setMPass] = useState(false);
  let roomId = useRef("");
  const roomQ = query(rooms, where("code", "==", params.code));
  let isSetup = useRef(false);

  let setupPlayers = (
    playerId: string,
    players: IPlayers,
    hasPassword: boolean
  ) => {
    if (playerId === players.white.id) {
      // WHELCOM MR.WHITE
      setI("white");
    } else if (playerId === players.black.id) {
      // WHELCOM MR.Black
      setI("black");
    } else if (players.black.id && players.white.id) {
      // this ROOM IS FULL
      setMFull(true);
      return;
    } else if (!players.white.id) {
      if (hasPassword) {
        setMPass(true);
      } else {
        // YOU ARE MR.WHITE NOW
        players.white.id = playerId;
        setI("white");
      }
    } else if (!players.black.id) {
      if (hasPassword) {
        setMPass(true);
      } else {
        // YOU ARE BLACK NOW
        players.black.id = playerId;
        setI("black");
      }
    }
    return players;
  };
  let updateRoom = async (id: string, data: any) => {
    const docRef = doc(db, "rooms", id);
    await updateDoc(docRef, data);
  };

  UseEffect(() => {
    //MAKING PLAYER ID
    if (!localStorage.getItem("playerId")) {
      let r = uuid().split("-")[0];
      localStorage.setItem("playerId", r);
    }
  }, []);

  // setup the board in the biggning
  UseEffect(() => {
    let localId = localStorage.getItem("playerId");
    let setup = async () => {
      if (!localId) return;
      let data = await getDocs(roomQ);
      if (data.empty) {
        setMError(true);
        return;
      }
      let room = data.docs[0].data();
      roomId.current = data.docs[0].id;
      let newplayers = setupPlayers(localId, room.players, room.pass);
      if (!newplayers) return;
      setPlayers(newplayers);
      Chess.isWhitesTurn = room.whiteTurn;
      setChessBoard(JSON.parse(room.board));
      isSetup.current = true;
    };
    setup();
  }, []);

  //syncing
  useEffect(() => {
    if (!isSetup.current) return;
    if (ModelError || ModelFull || ModelPass) return;
    let snap = () => {};
    let sync = async () => {
      let board = chessBoard;
      if (Chess.isPlayer2) {
        board = [...board.reverse()];
      }
      await updateRoom(roomId.current, {
        board: JSON.stringify(board),
        players,
        isWhiteHasWon: isWinnerWhite,
        whiteTurn: Chess.isWhitesTurn,
      });

      //realtime
      snap = onSnapshot(roomQ, (querySnapshot) => {
        let room = querySnapshot.docs[0].data();
        setPlayers(room.players);
        let board = JSON.parse(room.board);
        if (Chess.isPlayer2) {
          board = [...board.reverse()];
        }
        setChessBoard(board);
        Chess.isWhitesTurn = room.whiteTurn;
        setWinnerIsWhite(room.isWhiteHasWon);
      });
    };
    sync();

    return () => snap();
  }, [setLoader, loader, isSetup.current]);

  //reversing the board for player 2
  useEffect(() => {
    if (whoami == "black") {
      Chess.isPlayer2 = true;
      setChessBoard([...board.InitailBoard.reverse()]);
    }
  }, [whoami, setI]);

  let GameOver = async () => {
    isSetup.current = false;
    let board = [...new Chess().InitailBoard];
    if (Chess.isPlayer2) {
      board = [...board.reverse()];
    }
    await updateRoom(roomId.current, {
      board: JSON.stringify([...board]),
      isWhiteHasWon: Chess.isWhitesTurn,
    });
    setChessBoard([...board]);
    setPlayers({
      white: { ...players.white, loot: [] },
      black: { ...players.black, loot: [] },
    });
    setWinnerIsWhite(Chess.isWhitesTurn);
    Chess.isWhitesTurn = true;
    isSetup.current = true;
  };
  let r = useRouter();
  let handleQuit = async () => {
    let newplayers = players;
    if (whoami === "white")
      newplayers = {
        black: { id: players.black.id, loot: [] },
        white: { loot: [], id: null },
      };
    else if (whoami === "black")
      newplayers = {
        white: { id: players.white.id, loot: [] },
        black: { loot: [], id: null },
      };
    setPlayers(newplayers);
    await updateRoom(roomId.current, {
      players: newplayers,
    });
    r.push("/");
  };

  return (
    <div
      id={Chess.isPlayer2 ? "i-am-black" : "i-am-white"}
      className="flex items-center justify-start min-h-screen flex-col"
    >
      {isWinnerWhite != null && (
        <Model>
          <h3 className="text-2xl font-bold mb-4 text-gray-900">
            {whoami == "white" &&
              (isWinnerWhite ? "Yeah, You Win" : "Yeah, You Lose")}
            {whoami == "black" &&
              (isWinnerWhite ? "Yeah, You Lose" : "Yeah, You Win")}
          </h3>
          <button
            onClick={() => setWinnerIsWhite(null)}
            className="px-14 font-bold rounded-lg text-lg bg-[#017a91] py-4"
          >
            Romatch
          </button>
          <button
            className="px-14 font-bold rounded-lg text-lg bg-[#ff685c] hover:bg-[#ff6e64] gap-2 items-center flex py-4"
            onClick={handleQuit}
          >
            <FaDoorOpen size={20} /> Quite
          </button>
        </Model>
      )}
      {ModelFull && (
        <Model>
          <h3 className="text-xl font-bold">Sorry, this room is full</h3>
        </Model>
      )}
      {ModelError && (
        <Model>
          <h3 className="text-xl font-bold">Sorry, An Error happend</h3>
        </Model>
      )}
      {ModelPass && <PasswordForm roomId={roomId} />}
      <div className="flex gap-2 mt-1 items-start justify-start player w-full max-w-[39rem] mx-auto max-md:gap-6">
        <div className="min-w-[3rem] min-h-[3rem] bg-black rounded-full" />
        <div className="w-full flex flex-col items-start">
          <span className="font-bold text-lg">
            {whoami == "black" ? "YOU" : "Guest"}
            {!players.white.id && " (Loading)"}
          </span>
          <div className="pieces flex w-full">
            {(!Chess.isPlayer2 ? players.black.loot : players.white.loot).map(
              (p, i) => (
                <div
                  className={`piece ${p.name.startsWith("w") && "white"} ${
                    p.name.startsWith("b") && "black"
                  } ${p.name}`}
                  key={i}
                ></div>
              )
            )}
          </div>
        </div>
        {whoami == "black" && (
          <button
            onClick={handleQuit}
            className="bg-red-600 min-w-fit text-sm rounded-xl text-white px-4 py-2"
          >
            Quit The room
          </button>
        )}
      </div>
      <Board
        chessBoard={chessBoard}
        setLoader={setLoader}
        setPlayers={setPlayers}
        GameOver={GameOver}
        players={players}
        whoiam={whoami}
        setChessBoard={setChessBoard}
      />
      <div className="flex gap-2 items-start justify-start player w-full max-w-[39rem] mx-auto">
        <div className="min-w-[3rem] min-h-[3rem] mb-6 bg-white rounded-full" />
        <div className="w-full flex flex-col items-start">
          <span className="font-bold text-lg">
            {whoami == "white" ? "YOU" : "Guest"}
            {!players.white.id && " (Loading)"}
          </span>
          <div className="pieces flex w-full">
            {(!Chess.isPlayer2 ? players.white.loot : players.black.loot).map(
              (p, i) => (
                <div
                  className={`piece ${p.name.startsWith("w") && "white"} ${
                    p.name.startsWith("b") && "black"
                  } ${p.name}`}
                  key={i}
                ></div>
              )
            )}
          </div>
        </div>
        {whoami == "white" && (
          <button
            onClick={handleQuit}
            className="bg-red-600 min-w-fit text-sm rounded-xl text-white px-4 py-2"
          >
            Quit The room
          </button>
        )}
      </div>
    </div>
  );
}
