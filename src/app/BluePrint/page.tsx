"use client"
import { useRef, useState, useEffect, MouseEvent, useCallback } from 'react';
import interact from 'interactjs';
import fileDownload from 'js-file-download';
import { FaUndo , FaRedo  ,FaDownload , FaFont , FaMapPin, FaPen} from 'react-icons/fa';

interface Pin {
  x: number;
  y: number;
  label: string;
}

type Tool = 'draw' | 'pin' | 'text' | 'rect' | 'circle' | 'line';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [pins, setPins] = useState<Pin[]>([]);
  const [selectedTool, setSelectedTool] = useState<Tool>('draw');
  const [annotationText, setAnnotationText] = useState<string>('');
  const [actions, setActions] = useState<any[]>([]);
  const [redoStack, setRedoStack] = useState<any[]>([]);
  const [zoom, setZoom] = useState<number>(1);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Canvas context initialization
  const getCanvasContext = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.getContext('2d');
  }, []);

  // Drawing logic for freehand tool
  const startDrawing = (e: MouseEvent<HTMLCanvasElement>) => {
    if (selectedTool !== 'draw') return;
    
    const ctx = getCanvasContext();
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || selectedTool !== 'draw') return;
    const ctx = getCanvasContext();
    if (!ctx) return;

    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Pin item on canvas
  const pinItem = (e: MouseEvent<HTMLCanvasElement>) => {
    if (selectedTool !== 'pin') return;

    const pinX = e.nativeEvent.offsetX;
    const pinY = e.nativeEvent.offsetY;
    setPins((prevPins) => [...prevPins, { x: pinX, y: pinY, label: `Pin ${prevPins.length + 1}` }]);
    setActions((prev) => [...prev, { type: 'pin', x: pinX, y: pinY }]);
  };

  // Undo functionality
  const undo = () => {
    if (actions.length === 0) return;
    const lastAction = actions.pop();
    setRedoStack((prev) => [...prev, lastAction]);
    setActions([...actions]);
    redrawCanvas();
  };

  // Redo functionality
  const redo = () => {
    if (redoStack.length === 0) return;
    const action = redoStack.pop();
    setActions((prev) => [...prev, action]);
    setRedoStack([...redoStack]);
    redrawCanvas();
  };

  // Redraw the canvas
  const redrawCanvas = () => {
    const ctx = getCanvasContext();
    if (!ctx) return;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    actions.forEach((action) => {
      if (action.type === 'pin') {
        setPins((prevPins) => [...prevPins, { x: action.x, y: action.y, label: 'Pin' }]);
      }
      // Extend this for shapes, drawings, etc.
    });
  };

  // Zoom and pan logic
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const scaleAmount = e.deltaY < 0 ? 0.9 : 1.1;
    setZoom((prevZoom) => Math.min(Math.max(prevZoom * scaleAmount, 0.5), 5)); // Clamp zoom between 0.5 and 5
  };

  const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    if (selectedTool === 'pin') pinItem(e);
  };

  // Save canvas as image
  const saveCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    fileDownload(dataUrl, 'blueprint.png');
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className=" bg-gray-800 text-white flex flex-col p-4">
        <h2 className="text-sm font-bold mb-4">Tools</h2>
        <button onClick={() => setSelectedTool('draw')} className={`py-2 px-4 mb-2 ${selectedTool === 'draw' ? 'bg-blue-500' : 'bg-gray-700'} hover:bg-blue-600`}><FaPen/></button>
        <button onClick={() => setSelectedTool('pin')} className={`py-2 px-4 mb-2 ${selectedTool === 'pin' ? 'bg-blue-500' : 'bg-gray-700'} hover:bg-blue-600`}><FaMapPin/>
        </button>
        <button onClick={() => setSelectedTool('text')} className={`py-2 px-4 mb-2 ${selectedTool === 'text' ? 'bg-blue-500' : 'bg-gray-700'} hover:bg-blue-600`}><FaFont/></button>
        <button onClick={saveCanvas} className={`py-2 px-4 mb-2 ${selectedTool === 'text' ? 'bg-blue-500' : 'bg-gray-700'} hover:bg-blue-600`}><FaDownload/></button>
        <button onClick={undo} className={`py-2 px-4 mb-2 ${selectedTool === 'text' ? 'bg-blue-500' : 'bg-gray-700'} hover:bg-blue-600`}><FaUndo/></button>
        <button onClick={redo} className={`py-2 px-4 mb-2 ${selectedTool === 'text' ? 'bg-blue-500' : 'bg-gray-700'} hover:bg-blue-600`} ><FaRedo/></button>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <canvas
          ref={canvasRef}
          className="border bg-white"
          width={800}
          height={600}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onWheel={handleWheel}
          style={{ transform: `scale(${zoom})` }}
        />
      </div>
    </div>
  );
}
