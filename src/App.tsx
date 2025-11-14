/**
 * App主组件
 * 管理游戏的整体流程和状态
 */

import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGameState } from './hooks/useGameState';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ModeSelection } from './components/ModeSelection';
import { CategorySelection } from './components/CategorySelection';
import { GameScreen } from './components/GameScreen';
import { ResultScreen } from './components/ResultScreen';
import { getRandomQuestions } from './data/questions';

function App() {
  const gameState = useGameState();

  // 欢迎页 -> 模式选择
  const handleWelcomeStart = (nickname: string) => {
    gameState.setPlayerNickname(nickname);
    gameState.setStage('modeSelection');
  };

  // 模式选择 -> 题库选择
  const handleModeSelect = (mode: 'single' | 'pvp') => {
    gameState.setMode(mode);
    gameState.setStage('categorySelection');
  };

  // 题库选择 -> 游戏开始
  const handleCategorySelect = (categoryId: string) => {
    gameState.setCategory(categoryId);

    // 获取题目（15题）
    const questions = getRandomQuestions(15, categoryId);
    gameState.setQuestions(questions);

    // 开始游戏
    gameState.startGame();
  };

  // 返回上一步
  const handleBack = () => {
    switch (gameState.stage) {
      case 'modeSelection':
        gameState.setStage('welcome');
        break;
      case 'categorySelection':
        gameState.setStage('modeSelection');
        break;
      default:
        break;
    }
  };

  // 再玩一局
  const handlePlayAgain = () => {
    gameState.setStage('categorySelection');
  };

  // 返回首页
  const handleBackToHome = () => {
    gameState.resetGame();
    gameState.setStage('welcome');
  };

  // 处理答题
  const handleAnswer = (answer: number, timeSpent: number) => {
    gameState.answerQuestion(answer, timeSpent);
  };

  // 处理AI答题
  const handleAIAnswer = (answer: number, timeSpent: number) => {
    gameState.aiAnswer(answer, timeSpent);
  };

  // 处理下一题
  const handleNextQuestion = () => {
    gameState.nextQuestion();
  };

  // 处理道具使用
  const handleUsePowerUp = (type: any) => {
    gameState.usePowerUp(type);
  };

  // 处理事件
  const handleSetEvent = (event: any) => {
    gameState.setEvent(event);
  };

  const handleUpdateEvent = () => {
    gameState.updateEvent();
  };

  const handleSwapScores = () => {
    gameState.swapScores();
  };

  // 暂停游戏
  const handlePause = () => {
    if (confirm('确定要退出游戏吗？当前进度将不会保存。')) {
      gameState.setStage('result');
    }
  };

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {/* 欢迎页 */}
        {gameState.stage === 'welcome' && (
          <WelcomeScreen onStart={handleWelcomeStart} />
        )}

        {/* 模式选择 */}
        {gameState.stage === 'modeSelection' && (
          <ModeSelection onSelectMode={handleModeSelect} onBack={handleBack} />
        )}

        {/* 题库选择 */}
        {gameState.stage === 'categorySelection' && (
          <CategorySelection
            onSelectCategory={handleCategorySelect}
            onBack={handleBack}
          />
        )}

        {/* 游戏进行中 */}
        {gameState.stage === 'playing' && (
          <GameScreen
            questions={gameState.questions}
            currentQuestionIndex={gameState.currentQuestionIndex}
            player={gameState.player}
            opponent={gameState.opponent}
            powerUps={gameState.powerUps}
            mode={gameState.mode}
            eventCard={gameState.eventCard}
            onAnswer={handleAnswer}
            onAIAnswer={handleAIAnswer}
            onNextQuestion={handleNextQuestion}
            onUsePowerUp={handleUsePowerUp}
            onSetEvent={handleSetEvent}
            onUpdateEvent={handleUpdateEvent}
            onSwapScores={handleSwapScores}
            onPause={handlePause}
          />
        )}

        {/* 结算页 */}
        {gameState.stage === 'result' && (
          <ResultScreen
            player={gameState.player}
            opponent={gameState.opponent}
            mode={gameState.mode}
            category={gameState.category}
            answeredQuestions={gameState.answeredQuestions}
            onPlayAgain={handlePlayAgain}
            onBackToHome={handleBackToHome}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
