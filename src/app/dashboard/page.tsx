"use client";

import { useState } from "react";
import {
  Play,
  Award,
  TrendingUp,
  Download,
  Calendar,
  Shield,
  BarChart3,
  CheckCircle,
  AlertCircle,
  User,
  LogOut,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";

export default function StudentDashboard() {
  const session = useSession();
  const [user] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    currentLevel: "B1",
    joinDate: "March 2024",
    testsCompleted: 3,
    averageScore: 78,
  });

  const testHistory = [
    {
      id: 1,
      date: "2024-03-15",
      level: "B1",
      score: 82,
      status: "Completed",
      duration: "58 minutes",
      certificate: true,
    },
    {
      id: 2,
      date: "2024-02-28",
      level: "A2",
      score: 75,
      status: "Completed",
      duration: "55 minutes",
      certificate: true,
    },
    {
      id: 3,
      date: "2024-02-10",
      level: "A1",
      score: 68,
      status: "Completed",
      duration: "52 minutes",
      certificate: true,
    },
  ];

  const nextAvailableTest = {
    level: "B2",
    availableDate: "2024-04-01",
    requirements: "Complete B1 level with 70% or higher",
  };

  const achievements = [
    {
      title: "First Assessment",
      description: "Completed your first competency test",
      earned: true,
    },
    {
      title: "Quick Learner",
      description: "Improved by 2 levels in 3 months",
      earned: true,
    },
    {
      title: "Consistent Performer",
      description: "Scored above 70% in 3 consecutive tests",
      earned: true,
    },
    {
      title: "Digital Expert",
      description: "Achieve C2 level certification",
      earned: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">
                Test School
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {/* <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-700">{user.name}</span>
              </div> */}

              {session?.data?.user && (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar className="cursor-pointer border h-10 w-10">
                      <AvatarFallback>
                        {(session.data.user.name || "??")
                          .substring(0, 2)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => signOut()}
                      className="cursor-pointer"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {session?.data?.user?.name}!
          </h1>
          <p className="text-gray-600">
            Track your progress and continue your digital competency journey
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Current Level
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {user.currentLevel}
                  </p>
                </div>
                <Award className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Tests Completed
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {user.testsCompleted}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Average Score
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    {user.averageScore}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Member Since
                  </p>
                  <p className="text-2xl font-bold text-orange-600">
                    {user.joinDate}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Start New Test */}
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Play className="h-5 w-5 text-blue-600" />
                  <span>Ready for Your Next Assessment?</span>
                </CardTitle>
                <CardDescription>
                  You&apos;re eligible to take the {nextAvailableTest.level}{" "}
                  level assessment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        Next Level: {nextAvailableTest.level}
                      </p>
                      <p className="text-sm text-gray-600">
                        {nextAvailableTest.requirements}
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      Available Now
                    </Badge>
                  </div>
                  <Link href="/assessment">
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      size="lg"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start {nextAvailableTest.level} Assessment
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Test History */}
            <Card>
              <CardHeader>
                <CardTitle>Assessment History</CardTitle>
                <CardDescription>
                  Your completed assessments and results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {testHistory.map((test) => (
                    <div
                      key={test.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <Badge className="bg-blue-100 text-blue-800 text-lg px-3 py-1">
                            {test.level}
                          </Badge>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            Level {test.level} Assessment
                          </p>
                          <p className="text-sm text-gray-600">
                            {new Date(test.date).toLocaleDateString()} •{" "}
                            {test.duration}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            {test.score}%
                          </p>
                          <Badge className="bg-green-100 text-green-800">
                            {test.status}
                          </Badge>
                        </div>
                        {test.certificate && (
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Certificate
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Progress Tracker */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Progress Tracker</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Progress</span>
                    <span>Level {user.currentLevel}</span>
                  </div>
                  <Progress value={60} className="h-2" />
                  <p className="text-xs text-gray-600 mt-1">
                    3 of 6 levels completed
                  </p>
                </div>

                <div className="space-y-2">
                  {["A1", "A2", "B1", "B2", "C1", "C2"].map((level, index) => (
                    <div
                      key={level}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm">{level}</span>
                      <div className="flex items-center space-x-2">
                        {index < 3 ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : index === 3 ? (
                          <AlertCircle className="w-4 h-4 text-blue-500" />
                        ) : (
                          <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        achievement.earned ? "bg-yellow-100" : "bg-gray-100"
                      }`}
                    >
                      <Award
                        className={`w-4 h-4 ${
                          achievement.earned
                            ? "text-yellow-600"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <p
                        className={`text-sm font-medium ${
                          achievement.earned ? "text-gray-900" : "text-gray-500"
                        }`}
                      >
                        {achievement.title}
                      </p>
                      <p className="text-xs text-gray-600">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download All Certificates
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Detailed Analytics
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Security Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
