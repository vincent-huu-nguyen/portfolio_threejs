import React, { useRef } from 'react';
import emailjs from 'emailjs-com';

const Contact = ({ isVisible, onBack }) => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      '78963214',
      'template_luxjn3o',
      form.current,
      'd5p2EPhq-SKO-CKoV'
    ).then(
      (result) => {
        console.log(result.text);
        console.log('message sent');
      },
      (error) => {
        console.log(error.text);
      }
    );

    e.target.reset();
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-20 flex items-center justify-center transition-all duration-500 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="w-full max-w-xl rounded-md bg-gradient-to-r from-green-500 via-indigo-500 to-purple-500 p-1 sm:p-2">
        <div className="bg-[#0b0b0b] rounded-md p-6 sm:p-8">
          <h2 className="text-4xl font-bold text-center text-[#f7f8f8] mb-6">
            Contact Me
          </h2>

          <form ref={form} onSubmit={sendEmail} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#f7f8f8] mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="user_name"
                required
                className="w-full p-3 rounded-lg bg-[#0b0b0b] border border-gray-300 text-[#f7f8f8]"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#f7f8f8] mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="user_email"
                required
                className="w-full p-3 rounded-lg bg-[#0b0b0b] border border-gray-300 text-[#f7f8f8]"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#f7f8f8] mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                required
                className="w-full p-3 rounded-lg bg-[#0b0b0b] border border-gray-300 text-[#f7f8f8]"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 via-indigo-500 to-purple-500 text-white font-bold py-2 px-4 rounded hover:scale-105 transition"
            >
              Send
            </button>
          </form>

          <div className="flex justify-center mt-6">
            <button
              onClick={onBack}
              className="w-40 h-12 text-white border-2 border-white rounded transition duration-500 hover:scale-110"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
