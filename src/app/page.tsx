import {
  ArrowRight,
  Shield,
  Clock,
  Award,
  Users,
  BarChart3,
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
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOption } from "./api/auth/[...nextauth]/options";

export default async function LandingPage() {
  const session = await getServerSession(authOption);
  const user = session?.user;
  const steps = [
    {
      step: "01",
      title: "Basic Skills Assessment",
      description:
        "Fundamental digital literacy questions covering basic computer operations and internet usage.",
      duration: "15 minutes",
      questions: "15 questions",
    },
    {
      step: "02",
      title: "Intermediate Skills Test",
      description:
        "Advanced digital tools, productivity software, and online collaboration platforms.",
      duration: "20 minutes",
      questions: "20 questions",
    },
    {
      step: "03",
      title: "Advanced Competency Evaluation",
      description:
        "Complex digital scenarios, data analysis, and advanced technology applications.",
      duration: "25 minutes",
      questions: "25 questions",
    },
  ];

  const levels = [
    { level: "A1", title: "Beginner", color: "bg-red-100 text-red-800" },
    {
      level: "A2",
      title: "Elementary",
      color: "bg-orange-100 text-orange-800",
    },
    {
      level: "B1",
      title: "Intermediate",
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      level: "B2",
      title: "Upper Intermediate",
      color: "bg-blue-100 text-blue-800",
    },
    { level: "C1", title: "Advanced", color: "bg-green-100 text-green-800" },
    {
      level: "C2",
      title: "Proficient",
      color: "bg-purple-100 text-purple-800",
    },
  ];

  const sampleQuestions = [
    {
      question:
        "Which of the following is the most secure way to create a password?",
      options: [
        "Using your birth date",
        "A combination of letters, numbers, and symbols",
        "Your pet's name",
        "123456",
      ],
      correct: 1,
    },
    {
      question: "What does 'CC' mean in email?",
      options: [
        "Carbon Copy",
        "Computer Code",
        "Copy Content",
        "Create Contact",
      ],
      correct: 0,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
            <nav className="hidden md:flex space-x-8">
              <Link
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                About
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Features
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Support
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>Welcome, {user?.name}</span>
                </div>
                <Link href="/dashboard">
                  <Button>Go to Dashboard</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-sm font-medium">
              <Shield className="w-4 h-4 mr-2" />
              Secure Assessment Platform
            </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Digital Competency
            <span className="text-blue-600 block">Assessment Platform</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Evaluate your digital skills through our comprehensive 3-step
            assessment process. Get certified with internationally recognized
            competency levels from A1 to C2.
          </p>
          <Link href="/assessment">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
            >
              Start Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                60 Minutes Total
              </h3>
              <p className="text-gray-600 text-sm">
                Complete assessment in three structured steps
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Instant Certification
              </h3>
              <p className="text-gray-600 text-sm">
                Download your certificate immediately after completion
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Detailed Analytics
              </h3>
              <p className="text-gray-600 text-sm">
                Comprehensive performance insights and recommendations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              3-Step Assessment Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our structured approach ensures comprehensive evaluation of your
              digital competencies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card
                key={index}
                className="relative overflow-hidden border-2 hover:border-blue-200 transition-colors"
              >
                <div className="absolute top-0 left-0 bg-blue-600 text-white px-4 py-2 text-sm font-bold">
                  Step {step.step}
                </div>
                <CardHeader className="pt-12">
                  <CardTitle className="text-xl mb-2">{step.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {step.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {step.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {step.questions}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Competency Levels */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Competency Levels
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Achieve internationally recognized digital competency
              certifications
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {levels.map((level, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <Badge
                    className={`${level.color} text-2xl font-bold px-4 py-2 mb-3`}
                  >
                    {level.level}
                  </Badge>
                  <h3 className="font-semibold text-gray-900">{level.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Questions */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Sample Questions
            </h2>
            <p className="text-xl text-gray-600">
              Get familiar with our question format before starting your
              assessment
            </p>
          </div>

          <div className="space-y-8">
            {sampleQuestions.map((q, index) => (
              <Card key={index} className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Question {index + 1}
                  </CardTitle>
                  <CardDescription className="text-base text-gray-900 font-medium">
                    {q.question}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {q.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                          optIndex === q.correct
                            ? "border-green-200 bg-green-50"
                            : "border-gray-200 hover:border-blue-200"
                        }`}
                      >
                        <div className="flex items-center">
                          <div
                            className={`w-4 h-4 rounded-full border-2 mr-3 ${
                              optIndex === q.correct
                                ? "border-green-500 bg-green-500"
                                : "border-gray-300"
                            }`}
                          >
                            {optIndex === q.correct && (
                              <CheckCircle className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <span
                            className={
                              optIndex === q.correct
                                ? "text-green-800 font-medium"
                                : "text-gray-700"
                            }
                          >
                            {option}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {index === 0 && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 text-sm">
                        <CheckCircle className="w-4 h-4 inline mr-2" />
                        Correct! Strong passwords should include a mix of
                        letters, numbers, and symbols.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Certified?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who have validated their digital
            skills
          </p>
          <Link href="/assessment">
            <Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
              Start Your Assessment Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6" />
                <span className="text-lg font-bold">Test_School</span>
              </div>
              <p className="text-gray-400">
                Professional digital competency assessment platform for
                individuals and organizations.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    System Status
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Test_School. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
