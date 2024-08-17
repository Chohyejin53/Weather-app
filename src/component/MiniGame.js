import { useState } from "react";
import GameBox from "./GameBox";
import rockImg from "../assets/rock.png";
import scissorsImg from "../assets/scissors.png";
import paperImg from "../assets/paper.png";

const choice = {
  rock: {
    name: "rock",
    img: rockImg,
  },
  scissors: {
    name: "scissors",
    img: scissorsImg,
  },
  paper: {
    name: "paper",
    img: paperImg,
  },
};

function MiniGame() {
  const [userSelect, setUserSelect] = useState(null);
  const [ComputerSelect, setComputerSelect] = useState(null);
  const [result, setResult] = useState("");

  const play = (userChoice) => {
    setUserSelect(choice[userChoice]);
    const computerChoice = randomChoice();
    setComputerSelect(computerChoice);
    setResult(judgement(choice[userChoice], computerChoice));
  };

  const judgement = (user, computer) => {
    const userWin = { user: "win", computer: "lose" };
    const userLose = { user: "lose", computer: "win" };
    const userTie = { user: "tie", computer: "tie" };

    if (user.name === computer.name) {
      return userTie;
    } else if (user.name === "rock") {
      return computer.name === "scissors" ? userWin : userLose;
    } else if (user.name === "scissors") {
      return computer.name === "paper" ? userWin : userLose;
    } else if (user.name === "paper") {
      return computer.name === "rock" ? userWin : userLose;
    }
  };

  const randomChoice = () => {
    const itemArray = Object.keys(choice); // 객체에 있는 키값만 뽑아서 배열로 만들어주는 함수
    const randomItem = Math.floor(Math.random() * itemArray.length);
    const final = itemArray[randomItem];
    return choice[final];
  };

  return (
    <>
      <div className="mini-game">
        <p className="sub-title">MINI GAME</p>
        <h1 className="title">ROCK-PAPER-SCISSORS</h1>

        <div className="container">
          <GameBox title={"YOU"} item={userSelect} result={result.user} />
          <GameBox
            title={"COMPUTER"}
            item={ComputerSelect}
            result={result.computer}
          />
        </div>
        <div className="btn_box">
          <button onClick={() => play("scissors")}>SCISSORS</button>
          <button onClick={() => play("rock")}>ROCK</button>
          <button onClick={() => play("paper")}>PAPER</button>
        </div>
      </div>
    </>
  );
}

export default MiniGame;
