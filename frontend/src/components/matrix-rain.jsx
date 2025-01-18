import { useEffect, useRef } from 'react';

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(0);
    
    const str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";

    const draw = () => {
      context.fillStyle = "rgba(0,0,0,0.05)";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.font = `700 ${fontSize}px monospace`;
      context.fillStyle = "#00cc33";

      for(let i = 0; i < columns; i++) {
        const index = Math.floor(Math.random() * str.length);
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        if (y >= 0 && y < canvas.height) {
          context.fillText(str[index], x, y);
        }

        if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        if (Math.random() > 0.975) {
          drops[i]++;
        }
      }
    };

    const interval = setInterval(draw, 35);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default MatrixRain;