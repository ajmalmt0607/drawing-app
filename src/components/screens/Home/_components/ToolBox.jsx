//ToolBox.jsx
import { TbRectangle } from "react-icons/tb";
import { IoMdDownload, IoMdImage } from "react-icons/io";
import { FaLongArrowAltRight } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import { GiArrowCursor } from "react-icons/gi";
import { FaRegCircle } from "react-icons/fa6";
import styled from "styled-components";
import { useState } from "react";
import { ACTIONS } from "../../../../constants";
import Konva from "konva";

const ToolboxContainer = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	z-index: 10;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 3px;
	padding: 2px;
	width: 100%;
	height: 50px;
	background-color: rgba(255, 255, 255, 0.8);
	border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const ToolboxButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 3px;
	padding: 5px;
	border: none;
	background-color: transparent;
	cursor: pointer;
	transition: background-color 0.2s ease-in-out;

	&:hover {
		background-color: rgba(0, 0, 0, 0.05);
	}

	&.selected {
		background-color: rgba(0, 0, 0, 0.1);
	}
`;

const ColorPicker = styled.input`
	width: 30px;
	height: 30px;
	border: none;
	border-radius: 50%;
	outline: none;
	cursor: pointer;
`;

export default function Toolbox({ action, setAction, stageRef }) {
	const [fillColor, setFillColor] = useState("");
	function handleExport() {
		const uri = stageRef.current.toDataURL();
		var link = document.createElement("a");
		link.download = "image.png";
		link.href = uri;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
	function handleAddImage() {}

	return (
		<ToolboxContainer>
			<ToolboxButton
				className={action === ACTIONS.SELECT ? "selected" : ""}
				onClick={() => setAction(ACTIONS.SELECT)}
			>
				<GiArrowCursor size={"2rem"} />
			</ToolboxButton>
			<ToolboxButton
				className={action === ACTIONS.RECTANGLE ? "selected" : ""}
				onClick={() => setAction(ACTIONS.RECTANGLE)}
			>
				<TbRectangle size={"2rem"} />
			</ToolboxButton>
			<ToolboxButton
				className={action === ACTIONS.CIRCLE ? "selected" : ""}
				onClick={() => setAction(ACTIONS.CIRCLE)}
			>
				<FaRegCircle size={"1.5rem"} />
			</ToolboxButton>
			<ToolboxButton
				className={action === ACTIONS.ARROW ? "selected" : ""}
				onClick={() => setAction(ACTIONS.ARROW)}
			>
				<FaLongArrowAltRight size={"2rem"} />
			</ToolboxButton>
			<ToolboxButton
				className={action === ACTIONS.SCRIBBLE ? "selected" : ""}
				onClick={() => setAction(ACTIONS.SCRIBBLE)}
			>
				<LuPencil size={"1.5rem"} />
			</ToolboxButton>

			<ColorPicker
				type="color"
				value={fillColor}
				onChange={(e) => setFillColor(e.target.value)}
			/>

			<ToolboxButton onClick={handleExport}>
				<IoMdDownload size={"1.5rem"} />
			</ToolboxButton>
			<ToolboxButton onClick={handleAddImage}>
				<IoMdImage size={"2rem"} />
			</ToolboxButton>
		</ToolboxContainer>
	);
}
