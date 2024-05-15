//Canvas.jsx
import {
	Arrow,
	Circle,
	Image,
	Layer,
	Line,
	Rect,
	Stage,
	Transformer,
} from "react-konva";
import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ACTIONS } from "../../../../constants";
import Konva from "konva";
const Canvas = ({ action, stageRef, images, setImages }) => {
	const [fillColor, setFillColor] = useState("");
	const [rectangles, setRectangles] = useState([]);
	const [circles, setCircles] = useState([]);
	const [arrows, setArrows] = useState([]);
	const [scribbles, setScribbles] = useState([]);

	const strokeColor = "#000";
	const isPaining = useRef();
	const currentShapeId = useRef();
	const transformerRef = useRef();

	const isDraggable = action === ACTIONS.SELECT;
	function onPointerDown() {
		if (action === ACTIONS.SELECT) return;

		const stage = stageRef.current;
		const { x, y } = stage.getPointerPosition();
		const id = uuidv4();

		currentShapeId.current = id;
		isPaining.current = true;

		switch (action) {
			case ACTIONS.RECTANGLE:
				setRectangles((rectangles) => [
					...rectangles,
					{
						id,
						x,
						y,
						height: 20,
						width: 20,
						fillColor,
					},
				]);
				break;
			case ACTIONS.CIRCLE:
				setCircles((circles) => [
					...circles,
					{
						id,
						x,
						y,
						radius: 20,
						fillColor,
					},
				]);
				break;

			case ACTIONS.ARROW:
				setArrows((arrows) => [
					...arrows,
					{
						id,
						points: [x, y, x + 20, y + 20],
						fillColor,
					},
				]);
				break;

			case ACTIONS.SCRIBBLE:
				setScribbles((scribbles) => [
					...scribbles,
					{
						id,
						points: [x, y],
						fillColor,
					},
				]);
				break;
		}
	}
	function onPointerMove() {
		if (action === ACTIONS.SELECT || !isPaining.current) return;

		const stage = stageRef.current;
		const { x, y } = stage.getPointerPosition();

		switch (action) {
			case ACTIONS.RECTANGLE:
				setRectangles((rectangles) =>
					rectangles.map((rectangle) => {
						if (rectangle.id === currentShapeId.current) {
							return {
								...rectangle,
								width: x - rectangle.x,
								height: y - rectangle.y,
							};
						}
						return rectangle;
					})
				);
				break;
			case ACTIONS.CIRCLE:
				setCircles((circles) =>
					circles.map((circle) => {
						if (circle.id === currentShapeId.current) {
							return {
								...circle,
								radius:
									((y - circle.y) ** 2 +
										(x - circle.x) ** 2) **
									0.5,
							};
						}
						return circle;
					})
				);
				break;
			case ACTIONS.ARROW:
				setArrows((arrows) =>
					arrows.map((arrow) => {
						if (arrow.id === currentShapeId.current) {
							return {
								...arrow,
								points: [
									arrow.points[0],
									arrow.points[1],
									x,
									y,
								],
							};
						}
						return arrow;
					})
				);
				break;
			case ACTIONS.SCRIBBLE:
				setScribbles((scribbles) =>
					scribbles.map((scribble) => {
						if (scribble.id === currentShapeId.current) {
							return {
								...scribble,
								points: [...scribble.points, x, y],
							};
						}
						return scribble;
					})
				);
				break;
		}
	}
	function onPointerUp() {
		isPaining.current = false;
	}

	function onClick(e) {
		if (action !== ACTIONS.SELECT) return;
		const target = e.currentTarget;
		transformerRef.current.nodes([target]);
	}
	////////////////////////////////////////////
	const ImageComponent = React.memo(({ image, x, y, width, height }) => {
		return (
			<React.Fragment>
				<Konva.Image
					image={image}
					x={x}
					y={y}
					width={width}
					height={height}
				/>
				<Konva.Rect
					x={x}
					y={y}
					width={width}
					height={height}
					stroke="black"
					strokeWidth={1}
					opacity={0.5}
				/>
			</React.Fragment>
		);
	});
	const ImageWrapper = React.forwardRef(({ image }, ref) => {
		return (
			<ImageComponent
				ref={ref}
				image={image}
				x={image.x()}
				y={image.y()}
				width={image.width()}
				height={image.height()}
			/>
		);
	});

	return (
		<Stage
			ref={stageRef}
			width={1000}
			height={1000}
			onPointerDown={onPointerDown}
			onPointerMove={onPointerMove}
			onPointerUp={onPointerUp}
		>
			<Layer>
				<Rect
					x={0}
					y={0}
					height={1000}
					width={1000}
					fill="#ffffff"
					id="bg"
					onClick={() => {
						transformerRef.current.nodes([]);
					}}
				/>
				{rectangles.map((rectangle) => (
					<Rect
						key={rectangle.id}
						x={rectangle.x}
						y={rectangle.y}
						stroke={strokeColor}
						strokeWidth={2}
						fill={rectangle.fillColor}
						height={rectangle.height}
						width={rectangle.width}
						draggable={isDraggable}
						onClick={onClick}
					/>
				))}
				{circles.map((circle) => (
					<Circle
						key={circle.id}
						radius={circle.radius}
						x={circle.x}
						y={circle.y}
						stroke={strokeColor}
						strokeWidth={2}
						fill={circle.fillColor}
						draggable={isDraggable}
						onClick={onClick}
					/>
				))}
				{arrows.map((arrow) => (
					<Arrow
						key={arrow.id}
						points={arrow.points}
						stroke={strokeColor}
						strokeWidth={2}
						fill={arrow.fillColor}
						draggable={isDraggable}
						onClick={onClick}
					/>
				))}
				{scribbles.map((scribble) => (
					<Line
						key={scribble.id}
						lineCap="round"
						lineJoin="round"
						points={scribble.points}
						stroke={strokeColor}
						strokeWidth={2}
						fill={scribble.fillColor}
						draggable={isDraggable}
						onClick={onClick}
					/>
				))}
				{images.map((image) => (
					<ImageWrapper
						key={image.id()}
						image={image}
						draggable
						onClick={onClick}
					/>
				))}

				<Transformer ref={transformerRef} />
			</Layer>
		</Stage>
	);
};

export default Canvas;
