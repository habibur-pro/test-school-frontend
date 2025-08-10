"use client";

import { useState } from "react";
import {
  Award,
  Download,
  Share2,
  TrendingUp,
  Clock,
  CheckCircle,
  Target,
  BarChart3,
  Home,
  RefreshCw,
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
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function ResultsPage() {
  // Add this state at the top of the component
  const [demoUser] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    organization: "Sample University",
  });
  const [results] = useState({
    overallScore: 82,
    level: "B2",
    levelTitle: "Upper Intermediate",
    completionTime: "47 minutes",
    totalQuestions: 60,
    correctAnswers: 49,
    stepResults: [
      {
        step: 1,
        title: "Basic Skills",
        score: 88,
        questions: 15,
        correct: 13,
        time: "12 min",
      },
      {
        step: 2,
        title: "Intermediate Skills",
        score: 80,
        questions: 20,
        correct: 16,
        time: "16 min",
      },
      {
        step: 3,
        title: "Advanced Skills",
        score: 78,
        questions: 25,
        correct: 20,
        time: "19 min",
      },
    ],
    strengths: [
      "Digital Communication",
      "Information Management",
      "Online Safety & Security",
    ],
    improvements: [
      "Data Analysis",
      "Advanced Spreadsheet Functions",
      "Digital Content Creation",
    ],
    nextLevel: "C1",
    retakeAvailable: "2024-04-15",
  });

  const getLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      A1: "bg-red-100 text-red-800",
      A2: "bg-orange-100 text-orange-800",
      B1: "bg-yellow-100 text-yellow-800",
      B2: "bg-blue-100 text-blue-800",
      C1: "bg-green-100 text-green-800",
      C2: "bg-purple-100 text-purple-800",
    };
    return colors[level] || "bg-gray-100 text-gray-800";
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Award className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">
                Assessment Results
              </span>
            </div>
            {/* Update the header to show demo mode: */}
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-800">
                Demo Results
              </Badge>
              <span className="text-sm text-gray-600">{demoUser.name}</span>
              <Link href="/dashboard">
                <Button variant="outline">
                  <Home className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Congratulations Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-full p-6 shadow-lg">
              <Award className="h-16 w-16 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Congratulations!
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            You have successfully completed your digital competency assessment
          </p>

          {/* Main Score Display */}
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div
                  className={`inline-flex items-center justify-center w-24 h-24 rounded-full text-4xl font-bold ${getLevelColor(
                    results.level
                  )} mb-4`}
                >
                  {results.level}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {results.levelTitle}
                </h2>
                <p className="text-gray-600">Competency Level</p>
              </div>

              <Separator orientation="vertical" className="h-24" />

              <div className="text-center">
                <div
                  className={`text-6xl font-bold ${getScoreColor(
                    results.overallScore
                  )} mb-4`}
                >
                  {results.overallScore}%
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Overall Score
                </h2>
                <p className="text-gray-600">
                  {results.correctAnswers}/{results.totalQuestions} Correct
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mb-12">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-5 h-5 mr-2" />
            Download Certificate
          </Button>
          <Button size="lg" variant="outline">
            <Share2 className="w-5 h-5 mr-2" />
            Share Results
          </Button>
          <Button size="lg" variant="outline">
            <BarChart3 className="w-5 h-5 mr-2" />
            Detailed Analytics
          </Button>
        </div>

        {/* Detailed Results */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Step Breakdown */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Step-by-Step Performance</span>
                </CardTitle>
                <CardDescription>
                  Detailed breakdown of your performance in each assessment step
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {results.stepResults.map((step, index) => (
                  <div key={index} className="border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Step {step.step}: {step.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {step.correct}/{step.questions} questions correct •{" "}
                          {step.time}
                        </p>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-2xl font-bold ${getScoreColor(
                            step.score
                          )}`}
                        >
                          {step.score}%
                        </div>
                        <Badge
                          className={
                            step.score >= 70
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {step.score >= 70 ? "Passed" : "Needs Improvement"}
                        </Badge>
                      </div>
                    </div>
                    <Progress value={step.score} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Performance Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Performance Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Strengths */}
                  <div>
                    <h3 className="font-semibold text-green-900 mb-3 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                      Strengths
                    </h3>
                    <div className="space-y-2">
                      {results.strengths.map((strength, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">
                            {strength}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Areas for Improvement */}
                  <div>
                    <h3 className="font-semibold text-orange-900 mb-3 flex items-center">
                      <Target className="w-4 h-4 mr-2 text-orange-600" />
                      Areas for Improvement
                    </h3>
                    <div className="space-y-2">
                      {results.improvements.map((improvement, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">
                            {improvement}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Summary & Next Steps */}
          <div className="space-y-6">
            {/* Assessment Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Assessment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Completion Time</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">
                      {results.completionTime}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Questions</span>
                  <span className="font-medium">{results.totalQuestions}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Correct Answers</span>
                  <span className="font-medium text-green-600">
                    {results.correctAnswers}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Accuracy Rate</span>
                  <span className="font-medium">
                    {Math.round(
                      (results.correctAnswers / results.totalQuestions) * 100
                    )}
                    %
                  </span>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Achievement Level
                  </span>
                  <Badge className={getLevelColor(results.level)}>
                    {results.level} - {results.levelTitle}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
                <CardDescription>
                  Continue your digital competency journey
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">
                    Ready for {results.nextLevel}?
                  </h3>
                  <p className="text-sm text-blue-700 mb-3">
                    You&apos;re eligible to take the next level assessment and
                    advance your certification.
                  </p>
                  {/* Update the "Start Next Assessment" button: */}
                  <Link href="/assessment">
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      size="sm"
                    >
                      Start {results.nextLevel} Assessment
                    </Button>
                  </Link>
                </div>

                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Retake Available
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    You can retake this assessment starting{" "}
                    {results.retakeAvailable} to improve your score.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    size="sm"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Schedule Retake
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Certificate Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Your Certificate</CardTitle>
                <CardDescription>
                  Download your official competency certificate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Digital Competency Certificate
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Level {results.level} - {results.levelTitle}
                  </p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
