"use client";

import { useState } from "react";
import {
  AlertCircle,
  RefreshCw,
  BookOpen,
  TrendingDown,
  Clock,
  Target,
  Home,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

export default function FailedPage() {
  const [results] = useState({
    score: 45,
    requiredScore: 70,
    level: "A2",
    attemptedLevel: "B1",
    timeSpent: "52 minutes",
    questionsCorrect: 27,
    totalQuestions: 60,
    weakAreas: [
      "Data Analysis",
      "Advanced Spreadsheet Functions",
      "Digital Security Protocols",
    ],
    strongAreas: ["Basic Computer Operations", "Email Communication"],
    retakeAvailable: "2024-04-01",
    studyRecommendations: [
      "Complete the Digital Literacy Course",
      "Practice with Excel Advanced Functions",
      "Review Cybersecurity Fundamentals",
    ],
  });

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto">
          {/* Main Results Card */}
          <Card className="border-2 border-red-200 shadow-xl bg-white">
            <CardHeader className="text-center pb-8">
              <div className="flex justify-center mb-6">
                <div className="bg-red-100 rounded-full p-6 border-4 border-red-200">
                  <AlertCircle className="h-16 w-16 text-red-600" />
                </div>
              </div>

              <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Assessment Not Passed
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
                Don&apos;t worry! This is a learning opportunity. Review your
                results and try again when you&apos;re ready.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Score Overview */}
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div
                      className={`text-4xl font-bold ${getScoreColor(
                        results.score
                      )} mb-2`}
                    >
                      {results.score}%
                    </div>
                    <p className="text-gray-600">Your Score</p>
                    <Progress value={results.score} className="mt-2 h-2" />
                  </div>

                  <div>
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      {results.requiredScore}%
                    </div>
                    <p className="text-gray-600">Required Score</p>
                    <div className="mt-2 text-sm text-gray-500">
                      Passing Threshold
                    </div>
                  </div>

                  <div>
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {results.requiredScore - results.score}
                    </div>
                    <p className="text-gray-600">Points Needed</p>
                    <div className="mt-2 text-sm text-gray-500">To Pass</div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <Badge className="bg-red-100 text-red-800 px-4 py-2">
                    Level {results.attemptedLevel} - Not Achieved
                  </Badge>
                  <p className="text-sm text-gray-600 mt-2">
                    Current Level: {results.level}
                  </p>
                </div>
              </div>

              {/* Performance Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Weak Areas */}
                <Card className="border-2 border-orange-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-orange-900">
                      <Target className="h-5 w-5" />
                      <span>Areas for Improvement</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {results.weakAreas.map((area, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg"
                        >
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">{area}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Strong Areas */}
                <Card className="border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-green-900">
                      <TrendingDown className="h-5 w-5 rotate-180" />
                      <span>Your Strengths</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {results.strongAreas.map((area, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg"
                        >
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">{area}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Study Recommendations */}
              <Card className="border-2 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-blue-900">
                    <BookOpen className="h-5 w-5" />
                    <span>Recommended Study Plan</span>
                  </CardTitle>
                  <CardDescription>
                    Focus on these areas to improve your score
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {results.studyRecommendations.map(
                      (recommendation, index) => (
                        <div
                          key={index}
                          className="p-4 bg-blue-50 border border-blue-200 rounded-lg"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                            <p className="text-sm text-gray-700">
                              {recommendation}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Assessment Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Clock className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {results.timeSpent}
                    </div>
                    <p className="text-sm text-gray-600">Time Spent</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <Target className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {results.questionsCorrect}/{results.totalQuestions}
                    </div>
                    <p className="text-sm text-gray-600">Questions Correct</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <RefreshCw className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {results.retakeAvailable}
                    </div>
                    <p className="text-sm text-gray-600">Retake Available</p>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/assessment">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 px-8"
                  >
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Retake Assessment
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 bg-transparent"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Study Resources
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 bg-transparent"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Get Support
                </Button>
              </div>

              {/* Encouragement Message */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">
                  Keep Going! 💪
                </h3>
                <p className="text-blue-700 mb-4">
                  Many successful candidates don&apos;t pass on their first
                  attempt. Use this feedback to focus your studies and come back
                  stronger!
                </p>
                <div className="text-sm text-blue-600">
                  <strong>Remember:</strong> You can retake the assessment
                  starting {results.retakeAvailable}
                </div>
              </div>

              <div className="text-center pt-4">
                <Link href="/dashboard">
                  <Button variant="outline" size="lg">
                    <Home className="w-4 h-4 mr-2" />
                    Return to Dashboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
