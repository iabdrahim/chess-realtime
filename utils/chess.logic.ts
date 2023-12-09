export class Chess {
  static isWhitesTurn = true;
  static isPlayer2 = false;
  InitailBoard = [
    [
      { name: "br" },
      { name: "bn" },
      { name: "bb" },
      { name: "bq" },
      { name: "bk" },
      { name: "bb" },
      { name: "bn" },
      { name: "br" },
    ],
    [
      { name: "bp" },
      { name: "bp" },
      { name: "bp" },
      { name: "bp" },
      { name: "bp" },
      { name: "bp" },
      { name: "bp" },
      { name: "bp" },
    ],
    [
      { name: "empty" },
      { name: "empty" },
      { name: "empty" },
      { name: "empty" },
      { name: "empty" },
      { name: "empty" },
      { name: "empty" },
      { name: "empty" },
    ],
    [
      { name: "empty" },
      { name: "empty" },
      { name: "empty" },
      { name: "empty" },
      { name: "empty" },
      { name: "empty" },
      { name: "empty" },
      { name: "empty" },
    ],
    [
      { name: "empty" },
      { name: "empty" },
      { name: "empty" },
      { name: "empty" },
      { name: "empty" },
      { name: "empty" },
      { name: "empty" },
      { name: "empty" },
    ],
    [
      { name: "empty" },
      { name: "empty" },
      { name: "empty" },
      { name: "empty" },
      { name: "empty" },
      { name: "empty" },
      { name: "empty" },
      { name: "empty" },
    ],
    [
      { name: "wp" },
      { name: "wp" },
      { name: "wp" },
      { name: "wp" },
      { name: "wp" },
      { name: "wp" },
      { name: "wp" },
      { name: "wp" },
    ],
    [
      { name: "wr" },
      { name: "wn" },
      { name: "wb" },
      { name: "wq" },
      { name: "wk" },
      { name: "wb" },
      { name: "wn" },
      { name: "wr" },
    ],
  ];

  setActive(y: number, x: number) {
    let canMoveTo = document.getElementById(`${y}:${x}`) as HTMLElement;
    if (!canMoveTo) return null;
    if (!canMoveTo.classList.contains("empty")) {
      if (canMoveTo.classList.contains("black") && Chess.isWhitesTurn) {
        canMoveTo.classList.add("active");
      } else if (canMoveTo.classList.contains("white") && !Chess.isWhitesTurn) {
        canMoveTo.classList.add("active");
      }
      return null;
    }
    canMoveTo.classList.add("active");
    return true;
  }
  PawnMoves(selectedPiece: { x: number; y: number }) {
    let { x, y } = selectedPiece;
    if (Chess.isPlayer2) {
      Chess.isWhitesTurn = !Chess.isWhitesTurn;
    }
    if (Chess.isWhitesTurn) {
      let canMoveTo = document.getElementById(`${y - 1}:${x}`) as HTMLElement;
      if (!canMoveTo) {
        return;
      }
      if (canMoveTo.classList.contains("empty")) {
        canMoveTo.classList.add("active");
      }
      if (y == 6) {
        let canMoveTo = document.getElementById(`${y - 2}:${x}`) as HTMLElement;
        if (!canMoveTo) {
          return;
        }
        if (canMoveTo.classList.contains("empty")) {
          canMoveTo.classList.add("active");
        }
      }
      let oppsitecolor = "black";
      if (Chess.isPlayer2) oppsitecolor = "white";
      if (
        document
          .getElementById(`${y - 1}:${x + 1}`)
          ?.classList.contains(oppsitecolor)
      ) {
        // this.setActive(y - 1, x + 1);
        let canMoveTo = document.getElementById(
          `${y - 1}:${x + 1}`
        ) as HTMLElement;
        if (canMoveTo) {
          if (!canMoveTo.classList.contains("empty")) {
            if (
              canMoveTo.classList.contains(oppsitecolor) &&
              Chess.isWhitesTurn
            ) {
              canMoveTo.classList.add("active");
            } else {
              canMoveTo.classList.add("active");
            }
          }
        }
      }
      if (
        document
          .getElementById(`${y - 1}:${x - 1}`)
          ?.classList.contains(oppsitecolor)
      ) {
        // this.setActive(y - 1, x - 1);
        let canMoveTo = document.getElementById(
          `${y - 1}:${x - 1}`
        ) as HTMLElement;
        if (canMoveTo) {
          if (!canMoveTo.classList.contains("empty")) {
            if (
              canMoveTo.classList.contains(oppsitecolor) &&
              Chess.isWhitesTurn
            ) {
              canMoveTo.classList.add("active");
            } else {
              canMoveTo.classList.add("active");
            }
          }
        }
      }
    }
    if (!Chess.isWhitesTurn) {
      let canMoveTo = document.getElementById(`${y + 1}:${x}`) as HTMLElement;
      if (!canMoveTo) {
        return;
      }
      if (canMoveTo.classList.contains("empty")) {
        canMoveTo.classList.add("active");
      }
      if (y == 1) {
        let canMoveTo = document.getElementById(`${y + 2}:${x}`) as HTMLElement;
        if (!canMoveTo) {
          return;
        }
        if (canMoveTo.classList.contains("empty")) {
          canMoveTo.classList.add("active");
        }
      }
      let oppsitecolor = "white";
      if (Chess.isPlayer2) oppsitecolor = "black";
      if (
        document
          .getElementById(`${y + 1}:${x + 1}`)
          ?.classList.contains(oppsitecolor)
      ) {
        // this.setActive(y + 1, x + 1);
        let canMoveTo = document.getElementById(
          `${y + 1}:${x + 1}`
        ) as HTMLElement;
        if (canMoveTo) {
          if (!canMoveTo.classList.contains("empty")) {
            if (
              canMoveTo.classList.contains(oppsitecolor) &&
              Chess.isWhitesTurn
            ) {
              canMoveTo.classList.add("active");
            } else {
              canMoveTo.classList.add("active");
            }
          }
        }
      }
      if (
        document
          .getElementById(`${y + 1}:${x - 1}`)
          ?.classList.contains(oppsitecolor)
      ) {
        // this.setActive(y + 1, x - 1);
        let canMoveTo = document.getElementById(
          `${y + 1}:${x - 1}`
        ) as HTMLElement;
        if (canMoveTo) {
          if (!canMoveTo.classList.contains("empty")) {
            if (
              canMoveTo.classList.contains(oppsitecolor) &&
              Chess.isWhitesTurn
            ) {
              canMoveTo.classList.add("active");
            } else {
              canMoveTo.classList.add("active");
            }
          }
        }
      }
    }
    if (Chess.isPlayer2) {
      Chess.isWhitesTurn = !Chess.isWhitesTurn;
    }
  }
  RockMoves(selectedPiece: { x: number; y: number }) {
    let { x, y } = selectedPiece;
    //set top actives
    for (let i = y - 1; i >= 0; i--) {
      let stop = this.setActive(i, x);
      if (stop == null) {
        break;
      }
    }
    //set botom actives
    for (let i = y + 1; i <= 7; i++) {
      let stop = this.setActive(i, x);
      if (stop == null) {
        break;
      }
    }
    //set left actives
    for (let i = x - 1; i >= 0; i--) {
      let stop = this.setActive(y, i);
      if (stop == null) {
        break;
      }
    }
    //set right actives
    for (let i = x + 1; i <= 7; i++) {
      let stop = this.setActive(y, i);
      if (stop == null) {
        break;
      }
    }
  }
  KnightMoves(selectedPiece: { x: number; y: number }) {
    let { x, y } = selectedPiece;
    this.setActive(y + 1, x + 2);
    this.setActive(y - 1, x + 2);

    this.setActive(y - 2, x - 1);
    this.setActive(y - 2, x + 1);

    this.setActive(y - 1, x - 2);
    this.setActive(y + 1, x - 2);

    this.setActive(y + 2, x - 1);
    this.setActive(y + 2, x + 1);
  }
  BishopMoves(selectedPiece: { x: number; y: number }) {
    let { x, y } = selectedPiece;
    //set top actives
    let c = 1;
    for (let i = y - 1; i >= 0; i--) {
      let stop = this.setActive(i, x + c);
      c++;
      if (stop == null) {
        break;
      }
    }
    //set botom actives
    c = 1;
    for (let i = y + 1; i <= 7; i++) {
      let stop = this.setActive(i, x - c);
      c++;
      if (stop == null) {
        break;
      }
    }
    c = 1;
    //set left actives
    for (let i = y + 1; i <= 7; i++) {
      let stop = this.setActive(i, x + c);
      c++;
      if (stop == null) {
        break;
      }
    }
    c = 1;
    // //set right actives
    for (let i = y - 1; i >= 0; i--) {
      let stop = this.setActive(i, x - c);
      c++;
      if (stop == null) {
        break;
      }
    }
  }
  KingMoves(selectedPiece: { x: number; y: number }) {
    let { x, y } = selectedPiece;
    //top
    this.setActive(y - 1, x - 1);
    this.setActive(y - 1, x);
    this.setActive(y - 1, x + 1);
    //left
    this.setActive(y, x - 1);
    //bottom
    this.setActive(y + 1, x + 1);
    this.setActive(y + 1, x);
    this.setActive(y + 1, x - 1);
    //rigth
    this.setActive(y, x + 1);
  }
  QueenMoves(selectedPiece: { x: number; y: number }) {
    let { x, y } = selectedPiece;
    //set top actives
    let c = 1;
    for (let i = y - 1; i >= 0; i--) {
      let stop = this.setActive(i, x + c);
      c++;
      if (stop == null) {
        break;
      }
    }
    //set botom actives
    c = 1;
    for (let i = y + 1; i <= 7; i++) {
      let stop = this.setActive(i, x - c);
      c++;
      if (stop == null) {
        break;
      }
    }
    c = 1;
    //set left actives
    for (let i = y + 1; i <= 7; i++) {
      let stop = this.setActive(i, x + c);
      c++;
      if (stop == null) {
        break;
      }
    }
    c = 1;
    // //set right actives
    for (let i = y - 1; i >= 0; i--) {
      let stop = this.setActive(i, x - c);
      c++;
      if (stop == null) {
        break;
      }
    }
    this.setActive(y - 1, x - 1);
    this.setActive(y - 1, x);
    this.setActive(y - 1, x + 1);
    //left
    this.setActive(y, x - 1);
    //bottom
    this.setActive(y + 1, x + 1);
    this.setActive(y + 1, x);
    this.setActive(y + 1, x - 1);
    //rigth
    this.setActive(y, x + 1);
    for (let i = y - 1; i >= 0; i--) {
      let stop = this.setActive(i, x);
      if (stop == null) {
        break;
      }
    }
    //set botom actives
    for (let i = y + 1; i <= 7; i++) {
      let stop = this.setActive(i, x);
      if (stop == null) {
        break;
      }
    }
    //set left actives
    for (let i = x - 1; i >= 0; i--) {
      let stop = this.setActive(y, i);
      if (stop == null) {
        break;
      }
    }
    //set right actives
    for (let i = x + 1; i <= 7; i++) {
      let stop = this.setActive(y, i);
      if (stop == null) {
        break;
      }
    }
  }
}
