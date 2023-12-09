"use client";
import { Chess } from "@/utils/chess.logic";

import { UseEffect } from "@/utils/hooks";
import { IBoard, IPlayers } from "@/utils/types";
import { DragEvent, Fragment, useState } from "react";

export default function Board({
  chessBoard,
  players,
  GameOver,
  whoiam,
  setLoader,
  setChessBoard,
  setPlayers,
}: {
  setLoader: (v: any) => void;
  setPlayers: (v: any) => void;
  whoiam: string;
  setChessBoard: (v: any) => void;
  GameOver: () => void;
  players: IPlayers;
  chessBoard: IBoard[][];
}) {
  let [selectedPiece, selectPiece] = useState({ y: -1, x: -1 });

  let emptyClassNames = (className = "active") => {
    document
      .querySelectorAll(".piece.active")
      .forEach((p) => p.classList.remove(className));
  };

  //show possible moves
  UseEffect(() => {
    if (selectedPiece.x == -1 || selectedPiece.y == -1) return;
    let { x, y } = selectedPiece;
    let itemInBoard = chessBoard[y][x];
    emptyClassNames();
    let nameLastLetter = itemInBoard.name.split("")[1];
    if (nameLastLetter === "p") {
      Chess.prototype.PawnMoves(selectedPiece);
    } else if (nameLastLetter === "r") {
      Chess.prototype.RockMoves(selectedPiece);
    } else if (nameLastLetter === "n") {
      Chess.prototype.KnightMoves(selectedPiece);
    } else if (nameLastLetter === "b") {
      Chess.prototype.BishopMoves(selectedPiece);
    } else if (nameLastLetter === "k") {
      Chess.prototype.KingMoves(selectedPiece);
    } else if (nameLastLetter === "q") {
      Chess.prototype.QueenMoves(selectedPiece);
    }
  }, [selectedPiece]);

  //if player moves
  let EatAPiece = (x: number, y: number) => {
    setLoader(Math.round(Math.random() * 10));
    let item = chessBoard[y][x];
    let nameLastLetter = item.name.split("")[1];
    //game over
    if (nameLastLetter === "k") {
      emptyClassNames();
      selectPiece({ y: -1, x: -1 });
      GameOver();
      return;
    }
    //getting one piece
    if (item.name.startsWith("b")) {
      setPlayers({
        ...players,
        ...players,
        white: {
          ...players.white,
          loot: [...players.white.loot, { name: item.name }],
        },
      });
    }
    if (item.name.startsWith("w")) {
      setPlayers({
        ...players,
        black: {
          ...players.black,
          loot: [...players.black.loot, { name: item.name }],
        },
      });
    }
    let temp = chessBoard;
    temp[y][x].name = chessBoard[selectedPiece.y][selectedPiece.x].name;
    temp[selectedPiece.y][selectedPiece.x].name = "empty";
    setChessBoard(chessBoard);
    emptyClassNames();

    selectPiece({ y: -1, x: -1 });
    Chess.isWhitesTurn = !Chess.isWhitesTurn;
  };

  //if player did something
  let handlePlay = (y: number, x: number, isActive: boolean) => {
    let item = chessBoard[y][x];
    if (selectedPiece.x == x && selectedPiece.y == y) {
      emptyClassNames();
      selectPiece({ x: -1, y: -1 });
      return;
    }
    if (isActive) {
      emptyClassNames("old_pos");
      let old = { x: selectedPiece.x, y: selectedPiece.y };
      EatAPiece(x, y);
      document.getElementById(`${old.y}:${old.x}`)?.classList.add("old_pos");
      return;
    }
    if (
      item.name.startsWith("b") &&
      (whoiam == "white" || Chess.isWhitesTurn)
    ) {
      return;
    } else if (
      item.name.startsWith("w") &&
      (whoiam == "black" || !Chess.isWhitesTurn)
    ) {
      return;
    }
    if (!item.name.startsWith("empty")) {
      selectPiece({ y, x });
    }
  };
  let handleDrag = (
    e: DragEvent<HTMLDivElement>,
    i: number,
    j: number,
    ending?: boolean
  ) => {
    let target = e.target as HTMLElement;

    if (ending) {
      target.classList.remove("dragging");
      let { clientX, clientY } = e;
      for (let i = 0; i < chessBoard.length; i++) {
        for (let j = 0; j < chessBoard[i].length; j++) {
          let el = document.getElementById(`${i}:${j}`);
          if (!el) return;
          let { width, x, y } = el?.getBoundingClientRect();

          if (x <= clientX && clientX <= x + width) {
            if (y <= clientY && clientY <= y + width) {
              handlePlay(i, j, el.classList.contains("active"));
            }
          }
        }
      }
      return;
    }
    target.classList.add("dragging");
    target.style.left = e.clientX + "px";
    target.style.top = e.clientY + "px";
    if (selectedPiece.x == -1) {
      handlePlay(i, j, target.classList.contains("active"));
    }
  };
  return (
    <div className="h-[39.8rem] max-w-[39.8rem] max-md:max-w-[32.8rem] max-md:h-[32.8rem] max-sm:max-w-[18.8rem] max-sm:h-[18.8rem] w-full board my-2">
      {chessBoard &&
        chessBoard.map((row, i) => (
          <Fragment key={i}>
            {row.map((p, j) => (
              <div
                className={`piece ${p.name} ${
                  p.name.startsWith("w") && "white"
                } ${p.name.startsWith("b") && "black"}`}
                key={(i + 1) * j}
                id={`${i}:${j}`}
                onClick={(e) =>
                  handlePlay(
                    i,
                    j,
                    (e.target as HTMLElement).classList.contains("active")
                  )
                }
                onDragEnd={(e) => handleDrag(e, i, j, true)}
                onDrag={(e) => handleDrag(e, i, j)}
              ></div>
            ))}
          </Fragment>
        ))}
    </div>
  );
}
