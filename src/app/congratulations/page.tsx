"use client";

import { useState, useEffect } from "react";
import {
  Award,
  Sparkles,
  TrendingUp,
  Download,
  Share2,
  ArrowRight,
  CheckCircle,
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

export default function CongratulationsPage() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [progress, setProgress] = useState(0);

  const [results] = useState({
    passed: true,
    score: 82,
    level: "B2",
    levelTitle: "Upper Intermediate",
    previousLevel: "B1",
    improvementPercentage: 15,
    timeSpent: "47 minutes",
    questionsCorrect: 49,
    totalQuestions: 60,
  });

  useEffect(() => {
    // Animate progress bar
    const timer = setTimeout(() => {
      setProgress(results.score);
    }, 500);

    // Hide confetti after animation
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(confettiTimer);
    };
  }, [results.score]);

  const getLevelColor = (level) => {
    const colors = {
      A1: "bg-red-100 text-red-800 border-red-200",
      A2: "bg-orange-100 text-orange-800 border-orange-200",
      B1: "bg-yellow-100 text-yellow-800 border-yellow-200",
      B2: "bg-blue-100 text-blue-800 border-blue-200",
      C1: "bg-green-100 text-green-800 border-green-200",
      C2: "bg-purple-100 text-purple-800 border-purple-200",
    };
    return colors[level] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <Sparkles className="h-4 w-4 text-yellow-400" />
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Congratulations Card */}
          <Card className="border-2 border-green-200 shadow-2xl bg-white/95 backdrop-blur-sm">
            <CardHeader className="pb-8">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-full p-6 shadow-lg">
                    <Award className="h-16 w-16 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2 animate-pulse">
                    <Sparkles className="h-6 w-6 text-yellow-800" />
                  </div>
                </div>
              </div>

              <CardTitle className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                🎉 Congratulations! 🎉
              </CardTitle>
              <CardDescription className="text-xl text-gray-600 max-w-2xl mx-auto">
                You have successfully completed your digital competency
                assessment and achieved a new level!
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Level Achievement */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 border-2 border-blue-200">
                <div className="flex items-center justify-center space-x-8 mb-6">
                  <div className="text-center">
                    <Badge
                      className={`text-2xl px-6 py-3 mb-2 ${getLevelColor(
                        results.previousLevel
                      )}`}
                    >
                      {results.previousLevel}
                    </Badge>
                    <p className="text-sm text-gray-600">Previous Level</p>
                  </div>

                  <div className="flex items-center">
                    <ArrowRight className="h-8 w-8 text-green-600 animate-pulse" />
                  </div>

                  <div className="text-center">
                    <Badge
                      className={`text-4xl px-8 py-4 mb-2 border-4 ${getLevelColor(
                        results.level
                      )}`}
                    >
                      {results.level}
                    </Badge>
                    <p className="text-lg font-semibold text-gray-900">
                      {results.levelTitle}
                    </p>
                    <p className="text-sm text-gray-600">New Achievement!</p>
                  </div>
                </div>
              </div>

              {/* Score Display */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-2 border-blue-200">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {results.score}%
                    </div>
                    <p className="text-gray-600">Overall Score</p>
                    <Progress value={progress} className="mt-3 h-2" />
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-200">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      {results.questionsCorrect}/{results.totalQuestions}
                    </div>
                    <p className="text-gray-600">Questions Correct</p>
                    <div className="flex justify-center mt-3">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-200">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">
                      {results.timeSpent}
                    </div>
                    <p className="text-gray-600">Time Completed</p>
                    <div className="mt-3 text-sm text-gray-500">
                      Excellent pace!
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/results">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 px-8"
                  >
                    <Award className="w-5 h-5 mr-2" />
                    View Detailed Results
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 bg-transparent"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Certificate
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 bg-transparent"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share Achievement
                </Button>
              </div>

              <div className="pt-4">
                <Link href="/dashboard">
                  <Button variant="outline" size="lg">
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
