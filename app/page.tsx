"use client";

import React, { useState, useEffect,useRef } from 'react'


import { handler } from "@/actions/insight";


import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import HeroSection from "@/components/hero" 
import {
  featuresData,
  howItWorksData,
  statsData,
  testimonialsData,
} from "@/data/landing";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { features } from "process";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowBigUp, Mic, Plus } from 'lucide-react';
import { log } from 'console';
import { LoaderCircle } from "lucide-react";





export default function Home() {
    const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
const [email, setEmail] = useState("");
const [chatHistory, setChatHistory] = useState([
  { role: "user", content: "..." },
  { role: "ai", content: "..." },
]);

  const [input, setInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState([]);
  const [groups, setGroups] = useState([]);
  const [text, setText] = useState("");
  const [spoken, setSpoken] = useState("");

  const speak = (text: string) => {
  if (typeof window === "undefined") return;

  const synth = window.speechSynthesis;
  synth.cancel(); // Stop previous

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-IN";
  utterance.pitch = 1;
  utterance.rate = 1;

  const voices = synth.getVoices();
  if (voices.length > 0) {
    utterance.voice = voices.find(v => v.lang === "en-IN") || voices[0];
    synth.speak(utterance);
  } else {
    setTimeout(() => {
      const updatedVoices = synth.getVoices();
      utterance.voice = updatedVoices.find(v => v.lang === "en-IN") || updatedVoices[0];
      synth.speak(utterance);
    }, 200);
  }
};


 useEffect(() => {
    // Load voices once
    if (typeof window !== "undefined") {
      window.speechSynthesis.onvoiceschanged = () => {
        console.log("Voices loaded9756375271:", window.speechSynthesis.getVoices());
      };
    }
  }, []);



const handleAispeech = async () => {
  // const SpeechRecognition =
  //   window.SpeechRecognition || window.webkitSpeechRecognition;

  // if (!SpeechRecognition) {
  //   alert("Speech Recognition not supported in your browser");
  //   return;
  // }

  // const recognition = new SpeechRecognition();
  // recognition.lang = "en-US";
  // recognition.interimResults = false;

  // recognition.onstart = () => setIsListening(true);

  // recognition.onresult = async (event) => {
  //   const userInput = event.results[0][0].transcript;
  //   setTranscript(userInput);
  //   setIsListening(false);

  //   try {
  //     const reply = await handler(userInput);
  //     const finalResponse = reply.response || reply.error || "";
  //     setResponse(finalResponse);
  //     console.log("🧠 AI said:", finalResponse);
  //     speak(finalResponse); // ✅ Works now
  //   } catch (e) {
  //     setResponse("Error occurred while processing.");
  //   }
  // };

  // recognition.onerror = () => setIsListening(false);
  // recognition.start();
};




  const handleAIRequest = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setChatHistory(prev => [...prev, { role: "user", content: input }]);
    try {
      const { response,error } = await handler(input);
      const reply = response || error || "No response.";
      setAiResponse(response||error);
       setChatHistory(prev => [...prev, { role: "ai", content: reply }]);
    } catch (error) {
      setAiResponse("Error: "  );
       setChatHistory(prev => [...prev, { role: "ai", content: "❌ Error occurred" }]);
    } finally {
      setLoading(false);
    }
  };
  const bottomRef = useRef(null);

// useEffect(() => {
//   if (bottomRef.current) {
//     bottomRef.current.scrollIntoView({ behavior: "smooth" });
//   }
// }, [chatHistory]);




//   useEffect(() => {
//   if (typeof window !== "undefined") {
//     window.speechSynthesis.onvoiceschanged = () => {
//       console.log("Voices loaded:", window.speechSynthesis.getVoices());
//     };
//   }
// }, []);

  return (
    <div className="min-h-screen bg-white">
<HeroSection></HeroSection>

<Card className='mx-auto mr-2 ml-2 '>
 <CardHeader>
  <CardTitle className='text-center text-xl font-bold text-orange-400'>Advance Finance Chatbot</CardTitle>
 </CardHeader>
<CardContent className="px-4 space-y-4 max-h-[60vh] overflow-y-auto">
  {chatHistory.map((msg, idx) => (
    <div
      key={idx}
      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
     
    >
      <div
        className={`px-4 py-2 rounded-xl shadow-md text-sm whitespace-pre-wrap max-w-[75%] ${
          msg.role === "user"
            ? "bg-blue-100 text-blue-900"
            : "bg-gray-100 text-gray-900"
        }`}
         ref={bottomRef}
      >
        {msg.content}
      </div>
    </div>
  ))}
</CardContent>

<CardFooter className="max-w-4xl mx-auto px-4 py-2 w-full">
  <div className="w-full flex flex-col sm:flex-row  gap-2">
    <Card className="w-full p-3">
      <div className="flex flex-col space-y-2">
        <textarea
          id="message"
          rows={3}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Ask AI about your expenses..."
        ></textarea>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="p-2 text-gray-600 hover:text-blue-600"
            >
              <Plus className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              className="p-2 text-gray-600 hover:text-blue-600"
              onClick={handleAispeech}
            >
              <Mic className="h-5 w-5" />
            </Button>
          </div>

          <Button
            onClick={handleAIRequest}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded"
            disabled={loading}
          >
            {loading ? (
              <LoaderCircle className="animate-spin h-5 w-5" />
            ) : (
              <ArrowBigUp className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </Card>
  </div>
</CardFooter>

</Card>

{/* 
  <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
         <section id="features" className="py-20">

       <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need to manage your finances
          </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature,index)=>(
           <Link href={`/${feature.title}`} key={index}>
<Card key={index} className="p-6" >
 
  <CardContent className="space-y-4 pt-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
 
</Card>
</Link>
          ))}
            
            
            
            
            </div>
        </div>
      </section>
 <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {howItWorksData.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="pt-4">
                  <div className="flex items-center mb-4">
                    {/* <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    /> */}
                    <div className="ml-4">
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">{testimonial.quote}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already managing their finances
            smarter with Welth
          </p>
          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 animate-bounce"
            >
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>



    </div>
  );
}