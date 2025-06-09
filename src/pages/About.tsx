
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AwardIcon, UsersIcon, BeakerIcon, GraduationCapIcon } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About VIVARILY
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Born from cutting-edge research at IIT Kharagpur, VIVARILY represents the next generation 
            of oil performance prediction technology, revolutionizing the lubricant industry.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-4">
              To transform the lubricant industry by eliminating costly and time-consuming physical testing 
              through advanced AI-powered prediction models.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              We believe that every oil formulation decision should be backed by instant, accurate data 
              that accelerates innovation and reduces environmental impact.
            </p>
            <div className="space-y-4">
              {[
                'Reduce testing costs by up to 90%',
                'Accelerate R&D cycles from weeks to seconds',
                'Enable sustainable lubricant development',
                'Democratize access to advanced oil testing'
              ].map((point, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Technology Overview</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <BeakerIcon className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Advanced ML Models</h4>
                  <p className="text-gray-600 text-sm">Neural networks trained on extensive laboratory datasets</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <GraduationCapIcon className="h-6 w-6 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Academic Research</h4>
                  <p className="text-gray-600 text-sm">Developed at IIT Kharagpur with peer-reviewed validation</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <AwardIcon className="h-6 w-6 text-purple-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Industry Validated</h4>
                  <p className="text-gray-600 text-sm">Tested and validated by leading lubricant manufacturers</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Rajesh Kumar",
                role: "Chief Technology Officer",
                education: "Ph.D. Chemical Engineering, IIT Kharagpur",
                image: "/placeholder.svg"
              },
              {
                name: "Dr. Priya Sharma",
                role: "Head of Data Science",
                education: "Ph.D. Machine Learning, IIT Kharagpur",
                image: "/placeholder.svg"
              },
              {
                name: "Amit Patel",
                role: "Product Manager",
                education: "M.Tech Industrial Engineering, IIT Kharagpur",
                image: "/placeholder.svg"
              }
            ].map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-gray-600">{member.education}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Research Background */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                IIT Kharagpur Research Foundation
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                VIVARILY's technology is built upon years of rigorous research at the prestigious 
                Indian Institute of Technology Kharagpur, one of India's premier engineering institutions.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our models are trained on datasets compiled from over 10,000 laboratory tests, 
                ensuring accuracy and reliability that meets industry standards.
              </p>
              <div className="flex items-center space-x-4">
                <UsersIcon className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="font-semibold text-gray-900">50+ Research Papers</p>
                  <p className="text-sm text-gray-600">Published in peer-reviewed journals</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Research Achievements</h3>
              <ul className="space-y-3 text-gray-700">
                <li>• 95%+ prediction accuracy across all oil types</li>
                <li>• 10,000+ validated test results</li>
                <li>• 4 international patents pending</li>
                <li>• Collaboration with 15+ industry partners</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
