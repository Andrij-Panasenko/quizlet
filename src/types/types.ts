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
}

export type UserAnswer = {
    [key: string]: string
}