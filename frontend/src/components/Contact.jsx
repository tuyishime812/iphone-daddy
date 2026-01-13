import React from 'react';

const Contact = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
          <p className="text-xl text-gray-600 mb-10">
            Have questions about our products? Reach out to us!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <div className="flex items-center justify-center mb-4">
                <i className="fas fa-envelope text-blue-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Email Us</h3>
              <p className="text-gray-600 mb-4">For inquiries and support</p>
              <a 
                href="mailto:iphonedaddy@gmail.com" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                iphonedaddy@gmail.com
              </a>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <div className="flex items-center justify-center mb-4">
                <i className="fab fa-whatsapp text-green-600 text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
              <p className="text-gray-600 mb-4">Chat with our admin directly</p>
              <a 
                href="https://wa.me/265990342825" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-800 font-medium"
              >
                +265 990 342 825
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;