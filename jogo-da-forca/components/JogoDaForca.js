'use client'

import React, { useState, useEffect } from 'react';

const JogoDaForca = () => {
  const palavras = [
    'REACT', 'JAVASCRIPT', 'PYTHON', 'FRONTEND', 'BACKEND', 'DATABASE',
    'COMPUTER', 'PROGRAMMING', 'SOFTWARE', 'HARDWARE', 'INTERNET',
    'WEBSITE', 'MOBILE', 'DESIGN', 'DEVELOPER', 'CODING', 'ALGORITHM',
    'FUNCTION', 'VARIABLE', 'COMPONENT', 'FRAMEWORK', 'LIBRARY',
    'TYPESCRIPT', 'NEXTJS', 'NODEJS', 'EXPRESS', 'MONGODB', 'MYSQL',
    'GITHUB', 'VERCEL', 'DEPLOY', 'API', 'JSON', 'HTML', 'CSS'
  ];

  const [palavraAtual, setPalavraAtual] = useState('');
  const [letrasCorretas, setLetrasCorretas] = useState([]);
  const [letrasErradas, setLetrasErradas] = useState([]);
  const [tentativasRestantes, setTentativasRestantes] = useState(6);
  const [jogoTerminado, setJogoTerminado] = useState(false);
  const [vitoria, setVitoria] = useState(false);

  const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const iniciarNovoJogo = () => {
    const novaPalavra = palavras[Math.floor(Math.random() * palavras.length)];
    setPalavraAtual(novaPalavra);
    setLetrasCorretas([]);
    setLetrasErradas([]);
    setTentativasRestantes(6);
    setJogoTerminado(false);
    setVitoria(false);
  };

  useEffect(() => {
    iniciarNovoJogo();
  }, []);

  useEffect(() => {
    if (palavraAtual && letrasCorretas.length > 0) {
      const palavraCompleta = palavraAtual.split('').every(letra => letrasCorretas.includes(letra));
      if (palavraCompleta) {
        setVitoria(true);
        setJogoTerminado(true);
      }
    }
  }, [letrasCorretas, palavraAtual]);

  useEffect(() => {
    if (tentativasRestantes === 0) {
      setJogoTerminado(true);
      setVitoria(false);
    }
  }, [tentativasRestantes]);

  const tentarLetra = (letra) => {
    if (letrasCorretas.includes(letra) || letrasErradas.includes(letra) || jogoTerminado) {
      return;
    }

    if (palavraAtual.includes(letra)) {
      setLetrasCorretas([...letrasCorretas, letra]);
    } else {
      setLetrasErradas([...letrasErradas, letra]);
      setTentativasRestantes(tentativasRestantes - 1);
    }
  };

  const exibirPalavra = () => {
    return palavraAtual.split('').map((letra, index) => (
      letrasCorretas.includes(letra) ? letra : '_'
    )).join('   ');
  };

  const desenharForca = () => {
    const partes = [
      '  ____',
      '  |  |',
      '  |  O',
      '  | /|\\',
      '  |  |',
      '  | / \\',
      '__|__'
    ];
    
    const partesVisiveis = Math.max(0, 6 - tentativasRestantes);
    return partes.slice(0, 2 + partesVisiveis);
  };

  return (
    <div className="game-container">
      <div className="header">
        <h1>Jogo da Forca Dev</h1>
      </div>

      <div className="game-content">
        <div className="left-panel">
          <div className="hangman-display">
            <div className="hangman-art">
              {desenharForca().join('\n')}
            </div>
            <div className="errors-count">
              Erros: {letrasErradas.length}/6
            </div>
          </div>

          <div className="game-status">
            <div className="status-section">
              <div className="status-label">Letras Corretas:</div>
              <div className="status-value correct">
                {letrasCorretas.length > 0 ? letrasCorretas.join(', ') : 'Nenhuma'}
              </div>
            </div>
            <div className="status-section">
              <div className="status-label">Letras Erradas:</div>
              <div className="status-value incorrect">
                {letrasErradas.length > 0 ? letrasErradas.join(', ') : 'Nenhuma'}
              </div>
            </div>
          </div>
        </div>

        <div className="right-panel">
          <div className="word-display">
            {exibirPalavra()}
          </div>

          <div className="alphabet-keyboard">
            {alfabeto.map(letra => (
              <button
                key={letra}
                className={`letter-button ${
                  letrasCorretas.includes(letra) ? 'correct' : 
                  letrasErradas.includes(letra) ? 'incorrect' : ''
                }`}
                onClick={() => tentarLetra(letra)}
                disabled={letrasCorretas.includes(letra) || letrasErradas.includes(letra) || jogoTerminado}
              >
                {letra}
              </button>
            ))}
          </div>

          {jogoTerminado && (
            <div className="game-over">
              <div className={`result-message ${vitoria ? 'victory' : 'defeat'}`}>
                {vitoria ? 'Parabéns! Você ganhou!' : 'Game Over! Você perdeu!'}
              </div>
              <div className="word-reveal">
                A palavra era: <span className="revealed-word">{palavraAtual}</span>
              </div>
              <button className="restart-button" onClick={iniciarNovoJogo}>
                Novo Jogo
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .game-container {
          min-height: 100vh;
          background: #000000;
          color: white;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 20px;
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-bottom: 30px;
        }

        .game-icon {
          font-size: 2.5rem;
          color: #9C27B0;
        }

        .header h1 {
          font-size: 2.5rem;
          font-weight: 700;
          margin: 0;
          color: #ffffff;
        }

        .game-content {
          display: flex;
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .left-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .hangman-display {
          background: #333333;
          border-radius: 16px;
          padding: 30px;
          text-align: center;
          position: relative;
          min-height: 200px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .hangman-art {
          background: #e8e8e8;
          border: 3px solid #d4af37;
          border-radius: 8px;
          width: 120px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Courier New', monospace;
          font-size: 0.8rem;
          color: #333;
          margin-bottom: 20px;
          white-space: pre-line;
          line-height: 1.1;
        }

        .errors-count {
          font-size: 1.1rem;
          color: #ff4444;
          font-weight: 600;
        }

        .game-status {
          background: #333333;
          border-radius: 16px;
          padding: 25px;
        }

        .status-section {
          margin-bottom: 20px;
        }

        .status-section:last-child {
          margin-bottom: 0;
        }

        .status-label {
          font-size: 1rem;
          color: #ffffff;
          margin-bottom: 8px;
          font-weight: 600;
        }

        .status-value {
          font-size: 1.1rem;
          font-weight: 400;
        }

        .status-value.correct {
          color: #90EE90;
        }

        .status-value.incorrect {
          color: #ff6b6b;
        }

        .right-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .word-display {
          background: #333333;
          border-radius: 16px;
          padding: 40px;
          text-align: center;
          font-family: 'Courier New', monospace;
          font-size: 3rem;
          font-weight: bold;
          letter-spacing: 0.2em;
          color: #ffffff;
          min-height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .alphabet-keyboard {
          background: #333333;
          border-radius: 16px;
          padding: 25px;
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 8px;
        }

        .letter-button {
          background: #e8e8e8;
          border: none;
          border-radius: 8px;
          padding: 12px;
          font-size: 1.1rem;
          font-weight: 700;
          color: #333;
          cursor: pointer;
          transition: all 0.2s ease;
          min-height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .letter-button:hover:not(:disabled) {
          background: #d0d0d0;
          transform: scale(1.05);
        }

        .letter-button:disabled {
          cursor: not-allowed;
        }

        .letter-button.correct {
          background: #90EE90;
          color: #2e7d2e;
        }

        .letter-button.incorrect {
          background: #ff6b6b;
          color: #8b0000;
        }

        .game-over {
          background: #333333;
          border-radius: 16px;
          padding: 30px;
          text-align: center;
        }

        .result-message {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 15px;
        }

        .result-message.victory {
          color: #90EE90;
        }

        .result-message.defeat {
          color: #ff6b6b;
        }

        .word-reveal {
          font-size: 1.2rem;
          margin-bottom: 25px;
          color: #cccccc;
        }

        .revealed-word {
          color: #BB86FC;
          font-weight: 700;
          font-size: 1.4rem;
        }

        .restart-button {
          background: linear-gradient(135deg, #9C27B0, #BB86FC);
          color: white;
          border: none;
          border-radius: 12px;
          padding: 15px 30px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(156, 39, 176, 0.3);
        }

        .restart-button:hover {
          background: linear-gradient(135deg, #7B1FA2, #9C27B0);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(156, 39, 176, 0.4);
        }

        @media (max-width: 768px) {
          .game-content {
            flex-direction: column;
            gap: 20px;
          }
          
          .alphabet-keyboard {
            grid-template-columns: repeat(5, 1fr);
          }
          
          .word-display {
            font-size: 2rem;
            padding: 30px 20px;
          }
          
          .header h1 {
            font-size: 2rem;
          }

          .hangman-art {
            width: 100px;
            height: 100px;
            font-size: 0.7rem;
          }
        }
      `}</style>
    </div>
  );
};

export default JogoDaForca;