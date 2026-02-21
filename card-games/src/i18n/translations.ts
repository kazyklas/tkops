export type Language = 'en' | 'cs'

export interface Translation {
  app: {
    title: string
    description: string
  }
  home: {
    title: string
    subtitle: string
    noGames: string
  }
  game: {
    startGame: string
    howToPlay: string
    questions: string
    backToGames: string
    notFound: string
    returnHome: string
    endGame: string
    previous: string
    nextQuestion: string
    playAgain: string
    finish: string
    questionOf: string
    tapToReveal: string
    clickToFlip: string
    clickToFlipBack: string
  }
  settings: {
    title: string
    language: string
    theme: string
  }
  themes: {
    latte: string
    frappe: string
    macchiato: string
    mocha: string
  }
  languages: {
    en: string
    cs: string
  }
}

export const translations: Record<Language, Translation> = {
  en: {
    app: {
      title: 'Card Games',
      description: 'Choose a game to start a meaningful conversation',
    },
    home: {
      title: 'Card Games',
      subtitle: 'Choose a game to start a meaningful conversation',
      noGames: 'No games available yet',
    },
    game: {
      startGame: 'Start Game',
      howToPlay: 'How to play',
      questions: 'questions',
      backToGames: 'Back to games',
      notFound: 'Game not found',
      returnHome: 'Return to home',
      endGame: 'End game',
      previous: 'Previous',
      nextQuestion: 'Next Question',
      playAgain: 'Play Again',
      finish: 'Finish',
      questionOf: 'Question',
      tapToReveal: 'Tap to reveal',
      clickToFlip: 'Click card to reveal question',
      clickToFlipBack: 'Click card to flip back',
    },
    settings: {
      title: 'Settings',
      language: 'Language',
      theme: 'Theme',
    },
    themes: {
      latte: 'Latte',
      frappe: 'Frappé',
      macchiato: 'Macchiato',
      mocha: 'Mocha',
    },
    languages: {
      en: 'English',
      cs: 'Čeština',
    },
  },
  cs: {
    app: {
      title: 'Karetní hry',
      description: 'Vyberte hru a začněte smysluplný rozhovor',
    },
    home: {
      title: 'Karetní hry',
      subtitle: 'Vyberte hru a začněte smysluplný rozhovor',
      noGames: 'Zatím nejsou dostupné žádné hry',
    },
    game: {
      startGame: 'Začít hru',
      howToPlay: 'Jak hrát',
      questions: 'otázek',
      backToGames: 'Zpět na hry',
      notFound: 'Hra nenalezena',
      returnHome: 'Zpět na úvod',
      endGame: 'Ukončit hru',
      previous: 'Předchozí',
      nextQuestion: 'Další otázka',
      playAgain: 'Hrát znovu',
      finish: 'Dokončit',
      questionOf: 'Otázka',
      tapToReveal: 'Klepněte pro odhalení',
      clickToFlip: 'Klepněte na kartu pro odhalení otázky',
      clickToFlipBack: 'Klepněte na kartu pro otočení zpět',
    },
    settings: {
      title: 'Nastavení',
      language: 'Jazyk',
      theme: 'Téma',
    },
    themes: {
      latte: 'Latte',
      frappe: 'Frappé',
      macchiato: 'Macchiato',
      mocha: 'Mocha',
    },
    languages: {
      en: 'English',
      cs: 'Čeština',
    },
  },
}
