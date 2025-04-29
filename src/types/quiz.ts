export interface Scores {
    grill: number;
    sport: number;
    home: number;
    shop: number;
  }
  
  export interface Result {
    title: string;
    description: string;
  }
  
  export interface Results {
    grill: Result;
    sport: Result;
    home: Result;
    shop: Result;
  }
  
  export interface QuizOption {
    text: string;
    points: Partial<Scores>;
  }
  
  export interface QuizData {
    question: string;
    options: QuizOption[];
  }
  
  export interface StatsData {
    total: number;
    grill: number;
    sport: number;
    home: number;
    shop: number;
  }