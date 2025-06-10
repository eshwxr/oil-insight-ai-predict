import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckIcon, ClockIcon, Zap, TrendingUpIcon } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Predict Oil Performance in 
            <span className="text-blue-600"> Seconds</span>, Not Weeks
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Revolutionary AI-powered platform that eliminates expensive physical testing. 
            Get instant, accurate predictions for 4 different oil types using advanced machine learning models.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
              <Link to="/platform">Try Platform Free</Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Why Choose AKME?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 border-2 hover:border-blue-200 transition-colors">
              <CardContent className="pt-6">
                <ClockIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Instant Results</h3>
                <p className="text-gray-600">
                  Get predictions in seconds instead of waiting weeks for physical testing. 
                  Accelerate your R&D process dramatically.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-2 hover:border-green-200 transition-colors">
              <CardContent className="pt-6">
                <Zap className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Scientific Accuracy</h3>
                <p className="text-gray-600">
                  Advanced ML models trained on extensive datasets from IIT Kharagpur 
                  deliver laboratory-grade accuracy.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-2 hover:border-purple-200 transition-colors">
              <CardContent className="pt-6">
                <TrendingUpIcon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Cost Effective</h3>
                <p className="text-gray-600">
                  Reduce testing costs by up to 90%. Optimize formulations 
                  before expensive physical prototyping.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Comprehensive Oil Analysis
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our platform analyzes 16 key properties across 4 different oil types, 
                providing detailed performance predictions for critical metrics.
              </p>
              
              <div className="space-y-4">
                {[
                  'SRV Coefficient of Friction prediction',
                  'Four Ball Wear measurement analysis',
                  'Film Thickness optimization',
                  'Industry standard comparisons'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckIcon className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <Button asChild className="mt-8 bg-blue-600 hover:bg-blue-700">
                <Link to="/platform">Start Predicting</Link>
              </Button>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Sample Prediction</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                  <span className="font-medium">SRV COF</span>
                  <span className="text-green-600 font-bold">0.087</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                  <span className="font-medium">Four Ball Wear</span>
                  <span className="text-blue-600 font-bold">0.45 mm</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                  <span className="font-medium">Film Thickness</span>
                  <span className="text-purple-600 font-bold">32.1 nm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Oil Testing?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join leading lubricant manufacturers who trust AKME for accurate, 
            instant oil performance predictions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-3">
              <Link to="/platform">Start Free Trial</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600">
              <Link to="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
