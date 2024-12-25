"use client"
import { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';

const SitePlan = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const [activeDrawingMode, setActiveDrawingMode] = useState<string | null>(null);
  const gridSize = 20;
  const history = useRef({
    undoStack: [] as string[],
    redoStack: [] as string[],
    saveState: () => {
      const canvas = canvasRef.current;
      if (canvas) {
        history.current.undoStack.push(JSON.stringify(canvas.toJSON())); 
        history.current.redoStack = [];
      }
    },
    undo: () => {
      const canvas = canvasRef.current;
      if (canvas && history.current.undoStack.length > 0) {
        history.current.redoStack.push(JSON.stringify(canvas.toJSON()));
        const lastState = history.current.undoStack.pop()!;
        canvas.clear();
        drawGrid(canvas);
        canvas.loadFromJSON(lastState, () => canvas.renderAll());
      }
    },
    redo: () => {
      const canvas = canvasRef.current;
      if (canvas && history.current.redoStack.length > 0) {
        history.current.undoStack.push(JSON.stringify(canvas.toJSON()));
        const nextState = history.current.redoStack.pop()!;
        canvas.clear();
        drawGrid(canvas);
        canvas.loadFromJSON(nextState, () => canvas.renderAll());
      }
    },
  });

  const drawGrid = (canvas: fabric.Canvas) => {
    const gridLines = [];
    for (let i = 0; i <= canvas.getHeight(); i += gridSize) {
      gridLines.push(
        new fabric.Line([0, i, canvas.getWidth(), i], {
          stroke: '#ddd',
          selectable: false,
          evented: false,
        })
      );
    }
    for (let i = 0; i <= canvas.getWidth(); i += gridSize) {
      gridLines.push(
        new fabric.Line([i, 0, i, canvas.getHeight()], {
          stroke: '#ddd',
          selectable: false,
          evented: false,
        })
      );
    }
  
    const gridGroup = new fabric.Group(gridLines, {
      selectable: false,
      evented: false,
    });
  
    canvas.add(gridGroup);
  
    // Manually reorder objects
    const objects = canvas.getObjects();
    objects.splice(objects.indexOf(gridGroup), 1);
    objects.unshift(gridGroup);
  
    canvas.renderAll();
  };
  
  
  

  useEffect(() => {
    const canvas: fabric.Canvas = new fabric.Canvas('blueprint-canvas', { 
      selection: true,
      preserveObjectStacking: true,
    });
    canvasRef.current = canvas;

    // Initialize grid
    drawGrid(canvas);
    canvas.renderAll();

    // Save initial state
    history.current.saveState();

    let startX = 0;
    let startY = 0;
    let activeShape: fabric.Object | null = null;

    canvas.on('mouse:down', (options) => {
      if (!activeDrawingMode) return;

      const pointer = canvas.getPointer(options.e);
      startX = Math.round(pointer.x / gridSize) * gridSize;
      startY = Math.round(pointer.y / gridSize) * gridSize;

      switch (activeDrawingMode) {
        case 'line':
          activeShape = new fabric.Line([startX, startY, startX, startY], {
            stroke: 'black',
            strokeWidth: 2,
          });
          break;
        case 'rectangle':
          activeShape = new fabric.Rect({
            left: startX,
            top: startY,
            width: 0,
            height: 0,
            fill: 'transparent',
            stroke: 'black',
            strokeWidth: 2,
          });
          break;
        case 'circle':
          activeShape = new fabric.Circle({
            left: startX,
            top: startY,
            radius: 0,
            fill: 'transparent',
            stroke: 'black',
            strokeWidth: 2,
            originX: 'center',
            originY: 'center',
          });
          break;
      }

      if (activeShape) {
        canvas.add(activeShape);
      }
    });

    canvas.on('mouse:move', (options) => {
      if (!activeShape || !activeDrawingMode) return;

      const pointer = canvas.getPointer(options.e);
      const x = Math.round(pointer.x / gridSize) * gridSize;
      const y = Math.round(pointer.y / gridSize) * gridSize;

      switch (activeDrawingMode) {
        case 'line':
          (activeShape as fabric.Line).set({ x2: x, y2: y });
          break;
        case 'rectangle':
          const rectWidth = Math.abs(x - startX);
          const rectHeight = Math.abs(y - startY);
          (activeShape as fabric.Rect).set({
            width: rectWidth,
            height: rectHeight,
            left: x < startX ? x : startX,
            top: y < startY ? y : startY,
          });
          break;
        case 'circle':
          const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
          (activeShape as fabric.Circle).set({ radius });
          break;
      }

      canvas.renderAll();
    });

    canvas.on('mouse:up', () => {
      if (activeShape && activeDrawingMode) {
        activeShape.setCoords();
        canvas.setActiveObject(activeShape);
        history.current.saveState();
        activeShape = null;
      }
    });

    return () => {
      canvas.dispose();
    };
  }, []);

  const handleToolSelect = (tool: string) => {
    setActiveDrawingMode(prevMode => prevMode === tool ? null : tool);
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.discardActiveObject();
      canvas.renderAll();
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex gap-2 mb-4">
        <button
          className={`btn ${activeDrawingMode === 'line' ? 'bg-blue-500 text-white' : ''}`}
          onClick={() => handleToolSelect('line')}
        >
          Draw Line
        </button>
        <button
          className={`btn ${activeDrawingMode === 'rectangle' ? 'bg-blue-500 text-white' : ''}`}
          onClick={() => handleToolSelect('rectangle')}
        >
          Add Rectangle
        </button>
        <button
          className={`btn ${activeDrawingMode === 'circle' ? 'bg-blue-500 text-white' : ''}`}
          onClick={() => handleToolSelect('circle')}
        >
          Add Circle
        </button>
        <button
          className="btn"
          onClick={() => {
            const canvas = canvasRef.current;
            if (canvas) {
              const text = new fabric.IText('Text', {
                left: gridSize,
                top: gridSize,
                fontSize: 16,
                fill: 'black',
              });
              canvas.add(text);
              history.current.saveState();
            }
          }}
        >
          Add Text
        </button>
        <button
          className="btn"
          onClick={() => {
            const canvas = canvasRef.current;
            if (canvas) {
              const activeObject = canvas.getActiveObject();
              if (activeObject) {
                canvas.remove(activeObject);
                history.current.saveState();
              }
            }
          }}
        >
          Delete Selected
        </button>
        <button className="btn" onClick={history.current.undo}>Undo</button>
        <button className="btn" onClick={history.current.redo}>Redo</button>
        <button
          className="btn"
          onClick={() => {
            const canvas = canvasRef.current;
            if (canvas) {
              canvas.clear();
              drawGrid(canvas);
              history.current.saveState();
            }
          }}
        >
          Clear Canvas
        </button>
        <button
          className="btn"
          onClick={() => {
            const canvas = canvasRef.current;
            if (canvas) {
              const svgData = canvas.toSVG();
              const blob = new Blob([svgData], { type: 'image/svg+xml' });
              const link = document.createElement('a');
              link.href = URL.createObjectURL(blob);
              link.download = 'canvas.svg';
              link.click();
            }
          }}
        >
          Save as SVG
        </button>
      </div>
      <canvas id="blueprint-canvas" className="border" width={800} height={600}></canvas>
    </div>
  );
};

export default SitePlan;