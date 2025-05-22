import { QuizQuestion } from '../types/quiz';

export const questions: QuizQuestion[] = [
  {
    question: "Which CSS property is used to make a website layout responsive without using media queries?",
    options: [
      "display: flex",
      "position: relative",
      "display: grid",
      "float: left"
    ],
    correctAnswer: "display: grid",
    explanation: "CSS Grid Layout is designed for two-dimensional layouts and provides powerful tools for creating responsive designs without necessarily requiring media queries."
  },
  {
    question: "What does the 'fetch' API return in JavaScript?",
    options: [
      "A JSON object",
      "A Promise",
      "An array of data",
      "A string"
    ],
    correctAnswer: "A Promise",
    explanation: "The fetch() API returns a Promise that resolves to the Response object representing the response to the request."
  },
  {
    question: "Which CSS media query would target both tablets and mobile devices?",
    options: [
      "@media (max-width: 1024px)",
      "@media (min-width: 768px)",
      "@media screen and (orientation: portrait)",
      "@media (max-height: 600px)"
    ],
    correctAnswer: "@media (max-width: 1024px)",
    explanation: "This media query targets devices with a maximum width of 1024px, which typically includes both tablets and mobile phones."
  },
  {
    question: "What is the purpose of the 'async' keyword in JavaScript?",
    options: [
      "To make a function run in a separate thread",
      "To indicate that a function returns a Promise",
      "To prevent function execution",
      "To optimize the function for better performance"
    ],
    correctAnswer: "To indicate that a function returns a Promise",
    explanation: "The async keyword is used to declare an asynchronous function that automatically returns a Promise, and allows the use of await inside the function."
  },
  {
    question: "Which property controls the space between flex items?",
    options: [
      "margin",
      "gap",
      "padding",
      "space-between"
    ],
    correctAnswer: "gap",
    explanation: "The gap property defines the spacing between flex items in a flexbox layout. It's a shorthand for row-gap and column-gap."
  },
  {
    question: "What does API stand for?",
    options: [
      "Application Programming Interface",
      "Automated Program Integration",
      "Advanced Programming Implementation",
      "Application Process Integration"
    ],
    correctAnswer: "Application Programming Interface",
    explanation: "API stands for Application Programming Interface, which is a set of rules that allows different software entities to communicate with each other."
  },
  {
    question: "Which JavaScript method would you use to convert JSON data into a JavaScript object?",
    options: [
      "JSON.parse()",
      "JSON.stringify()",
      "Object.assign()",
      "Object.create()"
    ],
    correctAnswer: "JSON.parse()",
    explanation: "JSON.parse() is used to parse a JSON string and convert it into a JavaScript object."
  },
  {
    question: "What is the purpose of media queries in responsive web design?",
    options: [
      "To add multimedia content to websites",
      "To optimize images for faster loading",
      "To adapt layout based on device characteristics",
      "To improve SEO rankings"
    ],
    correctAnswer: "To adapt layout based on device characteristics",
    explanation: "Media queries allow you to apply different CSS styles based on device characteristics like screen size, resolution, or orientation, enabling responsive design."
  }
];