export type Answer = {
    text: string;
    correct: boolean;
}

export type Question = {
    question: string;
    answers: Answer[];
}

export type Quiz = {
    quizTitle: string;
    questions: Question[];
    time: number
}

export type UserAnswer = {
    [key: string]: string
}

export type QuizResult = {
    question: string,
    isCorrect: boolean
}