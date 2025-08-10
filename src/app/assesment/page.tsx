/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
//@ts-ignore
import { useState, useEffect } from "react";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Shield,
  CheckCircle,
  Flag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes in seconds
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [answers, setAnswers] = useState({});

  // Add this state for demo mode
  const [demoUser] = useState({
    name: "Sarah Johnson",
    level: "B2",
    organization: "Sample University",
  });

  // Sample questions for demonstration
  const questions = {
    1: [
      {
        id: 1,
        question:
          "What is the primary purpose of a firewall in computer security?",
        options: [
          "To speed up internet connection",
          "To block unauthorized access to a network",
          "To store passwords securely",
          "To backup important files",
        ],
        timeLimit: 60,
      },
      {
        id: 2,
        question:
          "Which file format is commonly used for spreadsheet documents?",
        options: [".docx", ".pdf", ".xlsx", ".pptx"],
        timeLimit: 60,
      },
    ],
  };

  const stepInfo = {
    1: { title: "Basic Skills Assessment", totalQuestions: 15, timeLimit: 900 },
    2: {
      title: "Intermediate Skills Test",
      totalQuestions: 20,
      timeLimit: 1200,
    },
    3: {
      title: "Advanced Competency Evaluation",
      totalQuestions: 25,
      timeLimit: 1500,
    },
  };

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Auto-submit when time runs out
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time display
  const formatTime = (seconds: any) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleAutoSubmit = () => {
    // Auto-submit logic
    console.log("Time's up! Auto-submitting...");
  };

  const handleAnswerSelect = (value: any) => {
    setSelectedAnswer(value);
    setAnswers({
      ...answers,
      [`step${currentStep}_q${currentQuestion}`]: value,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < stepInfo[currentStep].totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(
        answers[`step${currentStep}_q${currentQuestion + 1}`] || ""
      );
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(
        answers[`step${currentStep}_q${currentQuestion - 1}`] || ""
      );
    }
  };

  const currentQuestionData =
    questions[currentStep]?.[currentQuestion - 1] || questions[1][0];
  const progress =
    (currentQuestion / stepInfo[currentStep].totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Secure Header */}
      <header className="bg-white shadow-sm border-b border-red-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-red-600" />
              <span className="text-lg font-bold text-gray-900">
                SECURE ASSESSMENT MODE
              </span>
              <Badge className="bg-red-100 text-red-800">DEMO</Badge>
              <span className="text-sm text-gray-600">- {demoUser.name}</span>
            </div>

            {/* Timer */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-red-50 px-4 py-2 rounded-lg border border-red-200">
                <Clock className="h-5 w-5 text-red-600" />
                <span className="font-mono text-lg font-bold text-red-600">
                  {formatTime(timeRemaining)}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowWarning(true)}
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                End Assessment
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Step {currentStep}: {stepInfo[currentStep].title}
              </h1>
              <p className="text-gray-600">
                Question {currentQuestion} of{" "}
                {stepInfo[currentStep].totalQuestions}
              </p>
            </div>
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
              Level B2 Assessment
            </Badge>
          </div>

          <Progress value={progress} className="h-2 mb-2" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{Math.round(progress)}% Complete</span>
            <span>
              {stepInfo[currentStep].totalQuestions - currentQuestion} questions
              remaining
            </span>
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-8 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                Question {currentQuestion}
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {currentQuestionData.timeLimit}s per question
                </span>
              </div>
            </div>
            <CardDescription className="text-base text-gray-900 font-medium mt-4">
              {currentQuestionData.question}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedAnswer}
              onValueChange={handleAnswerSelect}
            >
              <div className="space-y-4">
                {currentQuestionData.options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-4 border-2 rounded-lg hover:border-blue-200 transition-colors"
                  >
                    <RadioGroupItem
                      value={index.toString()}
                      id={`option-${index}`}
                    />
                    <Label
                      htmlFor={`option-${index}`}
                      className="flex-1 cursor-pointer text-base"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 1}
            className="flex items-center space-x-2 bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              className="flex items-center space-x-2 bg-transparent"
            >
              <Flag className="h-4 w-4" />
              <span>Flag for Review</span>
            </Button>

            {currentQuestion === stepInfo[currentStep].totalQuestions ? (
              <Link href="/congratulations">
                <Button
                  className="bg-green-600 hover:bg-green-700 flex items-center space-x-2"
                  disabled={!selectedAnswer}
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Complete Step {currentStep}</span>
                </Button>
              </Link>
            ) : (
              <Button
                onClick={handleNextQuestion}
                disabled={!selectedAnswer}
                className="flex items-center space-x-2"
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-yellow-900">
                Security Notice
              </h3>
              <p className="text-sm text-yellow-700 mt-1">
                This assessment is being monitored. Switching tabs, opening new
                windows, or leaving the page may result in automatic submission.
                Ensure you have a stable internet connection.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Warning Dialog */}
      <Dialog open={showWarning} onOpenChange={setShowWarning}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span>End Assessment?</span>
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to end this assessment? Your current
              progress will be saved, but you won&apos;t be able to continue
              this session.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setShowWarning(false)}>
              Continue Assessment
            </Button>
            <Button variant="destructive">End Assessment</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
