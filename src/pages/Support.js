import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, HelpCircle } from 'lucide-react';

const Support = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: 'How do I upload materials?',
      answer:
        'Go to the Materials section and click on the "Upload Material" button. You can upload PDFs, PPTs, or add links to external resources.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-4">
          <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="ml-3 text-2xl font-semibold text-gray-900">Support</h1>
        </div>

        {/* Contact Support Section */}
        <div className="mb-6 border-b pb-6">
          <h2 className="text-lg font-medium text-gray-900 flex items-center">
            <MessageCircle className="h-5 w-5 text-indigo-600 mr-2" /> Contact Support
          </h2>
          <form className="mt-4 space-y-4">
            <input type="text" placeholder="Subject" className="w-full border rounded-md p-2" />
            <textarea placeholder="Message" rows={4} className="w-full border rounded-md p-2"></textarea>
            <button className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">
              Send Message
            </button>
          </form>
        </div>

        {/* FAQs Section */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 flex items-center">
            <HelpCircle className="h-5 w-5 text-indigo-600 mr-2" /> FAQs
          </h2>
          <div className="mt-4 space-y-4">
            {faqs.map((faq, index) => (
              <div key={index}>
                <h3 className="text-sm font-medium text-gray-900">{faq.question}</h3>
                <p className="text-sm text-gray-500 mt-1">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
