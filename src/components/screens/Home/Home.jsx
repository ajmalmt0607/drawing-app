//Home.jsx
import React, { useRef, useState } from "react";
import ToolBox from "./_components/ToolBox";
import Canvas from "./_components/Canvas";
import styled from "styled-components";
import { ACTIONS } from "../../../constants";

const Home = () => {
	const [action, setAction] = useState(ACTIONS.RECTANGLE);
	const [shapes, setShapes] = useState([]);
	const stageRef = useRef();

	/////
	const [images, setImages] = useState([]);
	const [selectedImageId, setSelectedImageId] = useState(null);
	return (
		<HomeContainer>
			{/* Controls */}
			<ToolBox
				action={action}
				setAction={setAction}
				stageRef={stageRef}
				shapes={shapes}
				setShapes={setShapes}
				images={images}
				setImages={setImages}
				selectedImageId={selectedImageId}
				setSelectedImageId={setSelectedImageId}
			/>
			{/* Canvas */}
			<Canvas
				action={action}
				stageRef={stageRef}
				images={images}
				setImages={setImages}
				selectedImageId={selectedImageId}
				setSelectedImageId={setSelectedImageId}
			/>
		</HomeContainer>
	);
};

const HomeContainer = styled.div`
	display: flex;
`;

export default Home;
