import { mockupScoreBoard } from "../../utils/mockups";
import ScoreBoard from "./ScoreBoard/ScoreBoard";

export default function SmartScoreBoard() {
    return (
        <ScoreBoard data={mockupScoreBoard} />
    )
}
