
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckIcon, XIcon } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "month",
      description: "Perfect for researchers and small teams",
      predictions: "10 predictions/month",
      features: [
        "Basic oil performance prediction",
        "Standard visualization",
        "Email support",
        "Basic export options"
      ],
      notIncluded: [
        "Advanced analytics",
        "API access",
        "Custom reports",
        "Priority support"
      ],
      popular: false,
      buttonText: "Start Free",
      buttonVariant: "outline" as const
    },
    {
      name: "Professional",
      price: "$99",
      period: "month",
      description: "Ideal for R&D teams and consultants",
      predictions: "1,000 predictions/month",
      features: [
        "All Free features",
        "Advanced performance analytics",
        "Detailed visualization charts",
        "Batch processing",
        "CSV/PDF export",
        "Priority email support",
        "Prediction history"
      ],
      notIncluded: [
        "API access",
        "Custom integrations",
        "Dedicated support"
      ],
      popular: true,
      buttonText: "Start Professional",
      buttonVariant: "default" as const
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large organizations and manufacturers",
      predictions: "Unlimited predictions",
      features: [
        "All Professional features",
        "REST API access",
        "Custom integrations",
        "White-label options",
        "Advanced security",
        "Dedicated account manager",
        "Custom training data",
        "On-premise deployment",
        "24/7 phone support"
      ],
      notIncluded: [],
      popular: false,
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your needs. All plans include our core AI-powered 
            oil performance prediction technology.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-blue-500 border-2 shadow-xl' : 'border-gray-200'}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {plan.name}
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-gray-600">/{plan.period}</span>}
                </div>
                <p className="text-gray-600 mt-2">{plan.description}</p>
                <p className="text-sm font-medium text-blue-600 mt-2">{plan.predictions}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">What's included:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckIcon className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.notIncluded.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Not included:</h4>
                    <ul className="space-y-2">
                      {plan.notIncluded.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <XIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                          <span className="text-gray-500">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button 
                  variant={plan.buttonVariant}
                  className="w-full mt-6"
                  size="lg"
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What counts as a prediction?</h3>
              <p className="text-gray-600">
                Each time you submit oil properties and receive performance results counts as one prediction. 
                Modifying properties and re-predicting counts as a new prediction.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I upgrade or downgrade anytime?</h3>
              <p className="text-gray-600">
                Yes, you can change your plan at any time. Upgrades take effect immediately, 
                while downgrades take effect at the next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Do you offer refunds?</h3>
              <p className="text-gray-600">
                We offer a 30-day money-back guarantee for all paid plans. 
                Contact our support team for assistance.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Is there an API available?</h3>
              <p className="text-gray-600">
                Yes, our REST API is available for Enterprise customers. 
                Contact our sales team to discuss API access and pricing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
