"use client";

import { ChangeEvent, useState } from "react";
import {
  Users,
  BarChart3,
  FileText,
  Settings,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  Award,
  Clock,
  AlertCircle,
  Download,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Add this state at the top
  const [adminUser] = useState({
    name: "Admin User",
    role: "System Administrator",
  });

  // Add these state variables after the existing ones
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [activeReport, setActiveReport] = useState(null);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    category: "",
    difficulty: "",
    step: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    explanation: "",
    timeLimit: 60,
  });

  // Sample data
  const stats = {
    totalUsers: 1247,
    activeAssessments: 23,
    completedToday: 45,
    averageScore: 76,
  };

  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      status: "Active",
      level: "B2",
      lastAssessment: "2024-03-15",
      score: 82,
      organization: "Tech Corp",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@email.com",
      status: "Inactive",
      level: "A2",
      lastAssessment: "2024-02-28",
      score: 68,
      organization: "Edu Institute",
    },
    {
      id: 3,
      name: "Emma Wilson",
      email: "emma.wilson@email.com",
      status: "In Progress",
      level: "B1",
      lastAssessment: "2024-03-16",
      score: 75,
      organization: "Healthcare Plus",
    },
  ];

  const questions = [
    {
      id: 1,
      question: "What is the primary purpose of a firewall?",
      category: "Security",
      difficulty: "Basic",
      step: 1,
      correctRate: 78,
    },
    {
      id: 2,
      question: "Which file format is used for spreadsheets?",
      category: "Office Applications",
      difficulty: "Basic",
      step: 1,
      correctRate: 92,
    },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Active: "bg-green-100 text-green-800",
      Inactive: "bg-gray-100 text-gray-800",
      "In Progress": "bg-blue-100 text-blue-800",
      Suspended: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors: Record<string, string> = {
      Basic: "bg-green-100 text-green-800",
      Intermediate: "bg-yellow-100 text-yellow-800",
      Advanced: "bg-red-100 text-red-800",
    };
    return colors[difficulty] || "bg-gray-100 text-gray-800";
  };

  // Add these modal functions before the return statement
  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleDeleteUser = (user: any) => {
    setSelectedUser(user);
    setShowDeleteDialog(true);
  };

  const handleViewQuestion = (question: any) => {
    setSelectedQuestion(question);
    setShowQuestionModal(true);
  };

  const handleEditQuestion = (question: any) => {
    setSelectedQuestion(question);
    setShowQuestionModal(true);
  };

  const generateReport = (reportType: any) => {
    setActiveReport(reportType);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Settings className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">
                Admin Dashboard
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-purple-100 text-purple-800">
                Admin Demo
              </Badge>
              <span className="text-sm text-gray-600">{adminUser.name}</span>
              <Link href="/dashboard">
                <Button variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Student View
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Users
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalUsers.toLocaleString()}
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Assessments
                  </p>
                  <p className="text-2xl font-bold text-orange-600">
                    {stats.activeAssessments}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Completed Today
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {stats.completedToday}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
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
                    {stats.averageScore}%
                  </p>
                </div>
                <Award className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="questions">Question Bank</TabsTrigger>
            <TabsTrigger value="results">Results & Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage user accounts, view assessment history, and monitor
                  progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Search and Filter */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    More Filters
                  </Button>
                </div>

                {/* Users Table */}
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Organization</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Current Level</TableHead>
                        <TableHead>Last Assessment</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium text-gray-900">
                                {user.name}
                              </div>
                              <div className="text-sm text-gray-600">
                                {user.email}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{user.organization}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(user.status)}>
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-blue-100 text-blue-800">
                              {user.level}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.lastAssessment}</TableCell>
                          <TableCell className="font-medium">
                            {user.score}%
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewUser(user)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditUser(user)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600"
                                onClick={() => handleDeleteUser(user)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Questions Tab */}
          <TabsContent value="questions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Question Bank Management</CardTitle>
                <CardDescription>
                  Create, edit, and organize assessment questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search questions..."
                        className="pl-10 w-80"
                      />
                    </div>
                    <Select>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="security">Security</SelectItem>
                        <SelectItem value="office">
                          Office Applications
                        </SelectItem>
                        <SelectItem value="communication">
                          Communication
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={() => setShowAddQuestionModal(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Question
                  </Button>
                </div>

                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Question</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Difficulty</TableHead>
                        <TableHead>Step</TableHead>
                        <TableHead>Success Rate</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {questions.map((question) => (
                        <TableRow key={question.id}>
                          <TableCell className="max-w-md">
                            <div className="truncate">{question.question}</div>
                          </TableCell>
                          <TableCell>{question.category}</TableCell>
                          <TableCell>
                            <Badge
                              className={getDifficultyColor(
                                question.difficulty
                              )}
                            >
                              {question.difficulty}
                            </Badge>
                          </TableCell>
                          <TableCell>Step {question.step}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">
                                {question.correctRate}%
                              </span>
                              {question.correctRate < 60 && (
                                <AlertCircle className="w-4 h-4 text-red-500" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewQuestion(question)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditQuestion(question)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Assessment Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Total Assessments
                      </span>
                      <span className="font-medium">2,847</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Completion Rate
                      </span>
                      <span className="font-medium text-green-600">94.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Average Duration
                      </span>
                      <span className="font-medium">52 minutes</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Pass Rate (70%+)
                      </span>
                      <span className="font-medium text-blue-600">78.5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Level Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {["A1", "A2", "B1", "B2", "C1", "C2"].map(
                      (level, index) => {
                        const percentages = [15, 22, 28, 20, 12, 3];
                        return (
                          <div
                            key={level}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-2">
                              <Badge className="w-8 text-center">{level}</Badge>
                              <span className="text-sm text-gray-600">
                                Level {level}
                              </span>
                            </div>
                            <span className="font-medium">
                              {percentages[index]}%
                            </span>
                          </div>
                        );
                      }
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Generate Reports</CardTitle>
                <CardDescription>
                  Create detailed reports for analysis and compliance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    className="h-24 flex-col bg-transparent"
                    onClick={() => generateReport("user-activity")}
                  >
                    <FileText className="w-6 h-6 mb-2" />
                    <span>User Activity Report</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex-col bg-transparent"
                    onClick={() => generateReport("assessment-analytics")}
                  >
                    <BarChart3 className="w-6 h-6 mb-2" />
                    <span>Assessment Analytics</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex-col bg-transparent"
                    onClick={() => generateReport("certification")}
                  >
                    <Award className="w-6 h-6 mb-2" />
                    <span>Certification Report</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex-col bg-transparent"
                  >
                    <TrendingUp className="w-6 h-6 mb-2" />
                    <span>Performance Trends</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex-col bg-transparent"
                  >
                    <Users className="w-6 h-6 mb-2" />
                    <span>Organization Summary</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex-col bg-transparent"
                  >
                    <Settings className="w-6 h-6 mb-2" />
                    <span>System Usage</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* User Details/Edit Modal */}
        <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>User Details - {selectedUser?.name}</DialogTitle>
              <DialogDescription>
                View and edit user information
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="userName">Full Name</Label>
                    <Input id="userName" defaultValue={selectedUser.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userEmail">Email</Label>
                    <Input id="userEmail" defaultValue={selectedUser.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userOrg">Organization</Label>
                    <Input
                      id="userOrg"
                      defaultValue={selectedUser.organization}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userStatus">Status</Label>
                    <Select defaultValue={selectedUser.status.toLowerCase()}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Assessment History</h3>
                  <div className="border rounded-lg p-4">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Current Level:</span>
                        <Badge className="ml-2 bg-blue-100 text-blue-800">
                          {selectedUser.level}
                        </Badge>
                      </div>
                      <div>
                        <span className="font-medium">Last Score:</span>
                        <span className="ml-2 font-bold text-green-600">
                          {selectedUser.score}%
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Last Assessment:</span>
                        <span className="ml-2">
                          {selectedUser.lastAssessment}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowUserModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button>Save Changes</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Question Details/Edit Modal */}
        <Dialog open={showQuestionModal} onOpenChange={setShowQuestionModal}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Question Details</DialogTitle>
              <DialogDescription>
                View and edit question information
              </DialogDescription>
            </DialogHeader>
            {selectedQuestion && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="questionText">Question</Label>
                  <Textarea
                    id="questionText"
                    defaultValue={selectedQuestion.question}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="questionCategory">Category</Label>
                    <Select
                      defaultValue={selectedQuestion.category
                        .toLowerCase()
                        .replace(" ", "-")}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="security">Security</SelectItem>
                        <SelectItem value="office-applications">
                          Office Applications
                        </SelectItem>
                        <SelectItem value="communication">
                          Communication
                        </SelectItem>
                        <SelectItem value="data-analysis">
                          Data Analysis
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="questionDifficulty">Difficulty</Label>
                    <Select
                      defaultValue={selectedQuestion.difficulty.toLowerCase()}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="questionStep">Assessment Step</Label>
                    <Select defaultValue={selectedQuestion.step.toString()}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Step 1</SelectItem>
                        <SelectItem value="2">Step 2</SelectItem>
                        <SelectItem value="3">Step 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Answer Options</Label>
                  <div className="space-y-2">
                    {["Option A", "Option B", "Option C", "Option D"].map(
                      (option, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Input placeholder={option} />
                          <Button variant="outline" size="sm">
                            {index === 1 ? "Correct" : "Mark Correct"}
                          </Button>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Performance Statistics</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      Success Rate:{" "}
                      <span className="font-bold text-green-600">
                        {selectedQuestion.correctRate}%
                      </span>
                    </div>
                    <div>
                      Times Used: <span className="font-bold">247</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowQuestionModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button>Save Changes</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete {selectedUser?.name}? This
                action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end space-x-2 mt-4">
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive">Delete User</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Reports Modal */}
        {activeReport && (
          <Dialog
            open={!!activeReport}
            onOpenChange={() => setActiveReport(null)}
          >
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>
                  {activeReport === "user-activity" && "User Activity Report"}
                  {activeReport === "assessment-analytics" &&
                    "Assessment Analytics Report"}
                  {activeReport === "certification" && "Certification Report"}
                </DialogTitle>
                <DialogDescription>
                  Generated report data and insights
                </DialogDescription>
              </DialogHeader>

              {activeReport === "user-activity" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          1,247
                        </div>
                        <p className="text-sm text-gray-600">Total Users</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">
                          892
                        </div>
                        <p className="text-sm text-gray-600">
                          Active This Month
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          156
                        </div>
                        <p className="text-sm text-gray-600">
                          New Registrations
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          23
                        </div>
                        <p className="text-sm text-gray-600">
                          Currently Testing
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Last Login</TableHead>
                          <TableHead>Tests Taken</TableHead>
                          <TableHead>Time Spent</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Sarah Johnson</TableCell>
                          <TableCell>2024-03-16 14:30</TableCell>
                          <TableCell>3</TableCell>
                          <TableCell>2h 45m</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">
                              Active
                            </Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Michael Chen</TableCell>
                          <TableCell>2024-03-15 09:15</TableCell>
                          <TableCell>2</TableCell>
                          <TableCell>1h 52m</TableCell>
                          <TableCell>
                            <Badge className="bg-blue-100 text-blue-800">
                              In Progress
                            </Badge>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}

              {activeReport === "assessment-analytics" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          2,847
                        </div>
                        <p className="text-sm text-gray-600">
                          Total Assessments
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">
                          78.5%
                        </div>
                        <p className="text-sm text-gray-600">Pass Rate</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          52 min
                        </div>
                        <p className="text-sm text-gray-600">Avg Duration</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Performance by Level</h3>
                    {["A1", "A2", "B1", "B2", "C1", "C2"].map(
                      (level, index) => {
                        const data = [85, 78, 72, 68, 61, 45];
                        return (
                          <div
                            key={level}
                            className="flex items-center justify-between p-3 border rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <Badge className="w-12 text-center">
                                {level}
                              </Badge>
                              <span>Level {level}</span>
                            </div>
                            <div className="flex items-center space-x-4">
                              <Progress value={data[index]} className="w-32" />
                              <span className="font-medium">
                                {data[index]}% pass rate
                              </span>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              )}

              {activeReport === "certification" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">
                          2,234
                        </div>
                        <p className="text-sm text-gray-600">
                          Certificates Issued
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          156
                        </div>
                        <p className="text-sm text-gray-600">This Month</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          B1
                        </div>
                        <p className="text-sm text-gray-600">
                          Most Common Level
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">
                      Certification Distribution
                    </h3>
                    <div className="space-y-2">
                      {[
                        { level: "A1", count: 234, percentage: 15 },
                        { level: "A2", count: 445, percentage: 22 },
                        { level: "B1", count: 567, percentage: 28 },
                        { level: "B2", count: 402, percentage: 20 },
                        { level: "C1", count: 245, percentage: 12 },
                        { level: "C2", count: 67, percentage: 3 },
                      ].map((item) => (
                        <div
                          key={item.level}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <Badge className="w-12 text-center">
                              {item.level}
                            </Badge>
                            <span>Level {item.level}</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Progress
                              value={item.percentage}
                              className="w-32"
                            />
                            <span className="font-medium">
                              {item.count} certificates ({item.percentage}%)
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2 mt-6">
                <Button variant="outline" onClick={() => setActiveReport(null)}>
                  Close
                </Button>
                <Button>
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Add Question Modal */}
        <Dialog
          open={showAddQuestionModal}
          onOpenChange={setShowAddQuestionModal}
        >
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Question</DialogTitle>
              <DialogDescription>
                Create a new assessment question for the question bank
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Question Text */}
              <div className="space-y-2">
                <Label htmlFor="newQuestionText">Question *</Label>
                <Textarea
                  id="newQuestionText"
                  placeholder="Enter the question text..."
                  value={newQuestion.question}
                  onChange={(e: any) =>
                    setNewQuestion({ ...newQuestion, question: e.target.value })
                  }
                  rows={3}
                  className="resize-none"
                />
                <p className="text-xs text-gray-500">
                  Write a clear, concise question that tests the intended skill
                </p>
              </div>

              {/* Question Metadata */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newQuestionCategory">Category *</Label>
                  <Select
                    value={newQuestion.category}
                    onValueChange={(value) =>
                      setNewQuestion({ ...newQuestion, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="security">Digital Security</SelectItem>
                      <SelectItem value="office-applications">
                        Office Applications
                      </SelectItem>
                      <SelectItem value="communication">
                        Digital Communication
                      </SelectItem>
                      <SelectItem value="data-analysis">
                        Data Analysis
                      </SelectItem>
                      <SelectItem value="internet-basics">
                        Internet Basics
                      </SelectItem>
                      <SelectItem value="file-management">
                        File Management
                      </SelectItem>
                      <SelectItem value="troubleshooting">
                        Troubleshooting
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newQuestionDifficulty">Difficulty *</Label>
                  <Select
                    value={newQuestion.difficulty}
                    onValueChange={(value) =>
                      setNewQuestion({ ...newQuestion, difficulty: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newQuestionStep">Assessment Step *</Label>
                  <Select
                    value={newQuestion.step}
                    onValueChange={(value) =>
                      setNewQuestion({ ...newQuestion, step: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select step" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Step 1 - Basic Skills</SelectItem>
                      <SelectItem value="2">
                        Step 2 - Intermediate Skills
                      </SelectItem>
                      <SelectItem value="3">
                        Step 3 - Advanced Skills
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newQuestionTimeLimit">
                    Time Limit (seconds)
                  </Label>
                  <Input
                    id="newQuestionTimeLimit"
                    type="number"
                    min="30"
                    max="300"
                    value={newQuestion.timeLimit}
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        timeLimit: Number.parseInt(e.target.value) || 60,
                      })
                    }
                  />
                </div>
              </div>

              {/* Answer Options */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Answer Options *</Label>
                  <Badge className="bg-blue-100 text-blue-800">
                    Select the correct answer
                  </Badge>
                </div>

                <div className="space-y-3">
                  {newQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="correctAnswer"
                          checked={newQuestion.correctAnswer === index}
                          onChange={() =>
                            setNewQuestion({
                              ...newQuestion,
                              correctAnswer: index,
                            })
                          }
                          className="w-4 h-4 text-blue-600"
                        />
                        <Label className="text-sm font-medium">
                          Option {String.fromCharCode(65 + index)}
                        </Label>
                      </div>
                      <Input
                        placeholder={`Enter option ${String.fromCharCode(
                          65 + index
                        )}...`}
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...newQuestion.options];
                          newOptions[index] = e.target.value;
                          setNewQuestion({
                            ...newQuestion,
                            options: newOptions,
                          });
                        }}
                        className={
                          newQuestion.correctAnswer === index
                            ? "border-green-500 bg-green-50"
                            : ""
                        }
                      />
                      {newQuestion.correctAnswer === index && (
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          Correct
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>

                <p className="text-xs text-gray-500">
                  Click the radio button next to the correct answer. The correct
                  answer will be highlighted in green.
                </p>
              </div>

              {/* Explanation */}
              <div className="space-y-2">
                <Label htmlFor="newQuestionExplanation">
                  Explanation (Optional)
                </Label>
                <Textarea
                  id="newQuestionExplanation"
                  placeholder="Provide an explanation for the correct answer..."
                  value={newQuestion.explanation}
                  onChange={(e: any) =>
                    setNewQuestion({
                      ...newQuestion,
                      explanation: e.target.value,
                    })
                  }
                  rows={2}
                  className="resize-none"
                />
                <p className="text-xs text-gray-500">
                  This explanation will be shown to users after they complete
                  the assessment
                </p>
              </div>

              {/* Question Preview */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                <h4 className="font-medium mb-3 flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  Question Preview
                </h4>

                {newQuestion.question ? (
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-medium">Sample Question</h5>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{newQuestion.timeLimit}s</span>
                        </div>
                      </div>
                      <p className="text-gray-900 mb-4">
                        {newQuestion.question}
                      </p>

                      <div className="space-y-2">
                        {newQuestion.options.map(
                          (option, index) =>
                            option && (
                              <div
                                key={index}
                                className={`p-2 border rounded ${
                                  newQuestion.correctAnswer === index
                                    ? "border-green-500 bg-green-50"
                                    : "border-gray-200"
                                }`}
                              >
                                <div className="flex items-center space-x-2">
                                  <div
                                    className={`w-4 h-4 rounded-full border-2 ${
                                      newQuestion.correctAnswer === index
                                        ? "border-green-500 bg-green-500"
                                        : "border-gray-300"
                                    }`}
                                  ></div>
                                  <span>
                                    {String.fromCharCode(65 + index)}. {option}
                                  </span>
                                </div>
                              </div>
                            )
                        )}
                      </div>

                      {newQuestion.explanation && (
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                          <p className="text-sm text-blue-800">
                            <strong>Explanation:</strong>{" "}
                            {newQuestion.explanation}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {newQuestion.category && (
                        <Badge className="bg-purple-100 text-purple-800">
                          {newQuestion.category}
                        </Badge>
                      )}
                      {newQuestion.difficulty && (
                        <Badge
                          className={getDifficultyColor(newQuestion.difficulty)}
                        >
                          {newQuestion.difficulty}
                        </Badge>
                      )}
                      {newQuestion.step && (
                        <Badge className="bg-blue-100 text-blue-800">
                          Step {newQuestion.step}
                        </Badge>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 italic">
                    Question preview will appear here as you fill in the details
                    above
                  </p>
                )}
              </div>

              {/* Validation Summary */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-900 mb-2">
                  Validation Checklist
                </h4>
                <div className="space-y-1 text-sm">
                  <div
                    className={`flex items-center space-x-2 ${
                      newQuestion.question.length >= 10
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    {newQuestion.question.length >= 10 ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <AlertCircle className="w-4 h-4" />
                    )}
                    <span>Question text (minimum 10 characters)</span>
                  </div>
                  <div
                    className={`flex items-center space-x-2 ${
                      newQuestion.category ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {newQuestion.category ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <AlertCircle className="w-4 h-4" />
                    )}
                    <span>Category selected</span>
                  </div>
                  <div
                    className={`flex items-center space-x-2 ${
                      newQuestion.difficulty ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {newQuestion.difficulty ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <AlertCircle className="w-4 h-4" />
                    )}
                    <span>Difficulty level selected</span>
                  </div>
                  <div
                    className={`flex items-center space-x-2 ${
                      newQuestion.step ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {newQuestion.step ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <AlertCircle className="w-4 h-4" />
                    )}
                    <span>Assessment step selected</span>
                  </div>
                  <div
                    className={`flex items-center space-x-2 ${
                      newQuestion.options.filter((opt) => opt.trim()).length >=
                      2
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    {newQuestion.options.filter((opt) => opt.trim()).length >=
                    2 ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <AlertCircle className="w-4 h-4" />
                    )}
                    <span>At least 2 answer options provided</span>
                  </div>
                  <div
                    className={`flex items-center space-x-2 ${
                      newQuestion.options[newQuestion.correctAnswer]?.trim()
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    {newQuestion.options[newQuestion.correctAnswer]?.trim() ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <AlertCircle className="w-4 h-4" />
                    )}
                    <span>Correct answer selected and has content</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddQuestionModal(false);
                    setNewQuestion({
                      question: "",
                      category: "",
                      difficulty: "",
                      step: "",
                      options: ["", "", "", ""],
                      correctAnswer: 0,
                      explanation: "",
                      timeLimit: 60,
                    });
                  }}
                >
                  Cancel
                </Button>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setNewQuestion({
                        question: "",
                        category: "",
                        difficulty: "",
                        step: "",
                        options: ["", "", "", ""],
                        correctAnswer: 0,
                        explanation: "",
                        timeLimit: 60,
                      });
                    }}
                  >
                    Clear Form
                  </Button>

                  <Button
                    disabled={
                      !newQuestion.question.trim() ||
                      !newQuestion.category ||
                      !newQuestion.difficulty ||
                      !newQuestion.step ||
                      newQuestion.options.filter((opt) => opt.trim()).length <
                        2 ||
                      !newQuestion.options[newQuestion.correctAnswer]?.trim()
                    }
                    onClick={() => {
                      // Here you would typically save the question to your database
                      alert(
                        `Question added successfully!\n\nQuestion: ${newQuestion.question}\nCategory: ${newQuestion.category}\nDifficulty: ${newQuestion.difficulty}\nStep: ${newQuestion.step}`
                      );
                      setShowAddQuestionModal(false);
                      setNewQuestion({
                        question: "",
                        category: "",
                        difficulty: "",
                        step: "",
                        options: ["", "", "", ""],
                        correctAnswer: 0,
                        explanation: "",
                        timeLimit: 60,
                      });
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Question
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
