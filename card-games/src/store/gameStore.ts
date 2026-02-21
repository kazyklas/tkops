import { create } from 'zustand'
import type { GameState } from '../games/types'

interface GameStore extends GameState {
  startGame: (gameId: string) => void
  flipCard: () => void
  unflipCard: () => void
  nextCard: () => void
  previousCard: () => void
  endGame: () => void
  resetGame: () => void
}

const initialState: GameState = {
  currentGameId: null,
  currentCardIndex: 0,
  isFlipped: false,
  isActive: false,
}

export const useGameStore = create<GameStore>((set) => ({
  ...initialState,

  startGame: (gameId: string) => set({
    currentGameId: gameId,
    currentCardIndex: 0,
    isFlipped: false,
    isActive: true,
  }),

  flipCard: () => set({ isFlipped: true }),

  unflipCard: () => set({ isFlipped: false }),

  nextCard: () => set((state) => ({
    currentCardIndex: state.currentCardIndex + 1,
    isFlipped: false,
  })),

  previousCard: () => set((state) => ({
    currentCardIndex: Math.max(0, state.currentCardIndex - 1),
    isFlipped: false,
  })),

  endGame: () => set({
    ...initialState,
  }),

  resetGame: () => set({
    currentCardIndex: 0,
    isFlipped: false,
  }),
}))
