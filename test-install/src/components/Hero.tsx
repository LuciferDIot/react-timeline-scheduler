import React from 'react';
import { ArrowRight, Calendar, CheckCircle, Zap } from 'lucide-react';
import { Timeline } from 'react-timeline-scheduler';
import siteData from '../data/site-data.json';
import { examples } from '../data/examples';

export const Hero = ({ onGetStarted }: { onGetStarted: () => void }) => {
  // Use the Basic Usage demo data from examples
  const heroExample = examples.find(ex => ex.id === "basic") || examples[0];

  return (
    <div className="relative overflow-hidden bg-[#030712] pt-16 sm:pt-24 lg:pt-32 pb-20">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-900/20 to-transparent opacity-50 blur-3xl pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/20 border border-blue-800/30 text-blue-400 text-sm mb-8 backdrop-blur-sm">
          <span className="flex h-2 w-2 relative">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          {siteData.hero.badgeText}
        </div>
        
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Modern</span><br />
          {siteData.hero.title.replace("Modern ", "")}
        </h1>
        
        <p className="max-w-2xl text-lg sm:text-xl text-gray-400 mb-10 leading-relaxed">
          A high-performance, fully customizable, and accessible timeline component for React applications. Built for speed, designed for beauty.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <button 
            onClick={onGetStarted}
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/25"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
          
          <a 
            href="https://github.com/LuciferDIot/react-timeline-scheduler"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-gray-300 bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          >
            View on GitHub
          </a>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left w-full max-w-5xl mb-24">
            <FeatureCard 
                icon={<Zap className="text-yellow-400" />}
                title="Blazing Fast"
                description="Optimized for thousands of items with virtualized rendering."
            />
            <FeatureCard 
                icon={<Calendar className="text-blue-400" />}
                title="Fully Customizable"
                description="Control every aspect of the look and feel with flexible theming."
            />
             <FeatureCard 
                icon={<CheckCircle className="text-green-400" />}
                title="TypeScript Ready"
                description="First-class TypeScript support for a robust developer experience."
            />
        </div>

        {/* Live Demo Preview with separate dataset */}
        <div className="w-full max-w-6xl rounded-xl border border-white/10 bg-[#111827]/50 backdrop-blur-sm p-4 shadow-2xl relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl pointer-events-none group-hover:opacity-75 transition-opacity" />
            <div className="w-full rounded-lg overflow-hidden border border-white/5 bg-[#030712]">
                <Timeline 
                    config={{
                        label: "Live Demo",
                        data: heroExample.tasks,
                        theme: {
                            primary: "#6366f1",
                            background: { primary: "#0B0E14", secondary: "#151921" },
                            text: { primary: "#E2E8F0", secondary: "#94A3B8" },
                            row: { even: "#0B0E14", odd: "#151921", hover: "#1E293B" },
                            grid: { color: "#1E293B", currentDateLine: "#6366f1" },
                            header: { background: "#0F172A", text: "#F1F5F9" },
                            border: "#1E293B",
                            task: {
                              even: "#3B82F6", odd: "#2563EB", hover: "#1D4ED8", text: "#FFFFFF", border: "transparent",
                            },
                            resize: { handleBackground: "rgba(255, 255, 255, 0.2)", handleHoverBackground: "#6366f1" },
                            buttons: {
                              lock: {
                                unlocked: {
                                    background: "transparent",
                                    color: "#94A3B8", // secondary text color
                                    border: "transparent"
                                },
                                locked: {
                                    background: "#6366f1",
                                    color: "#FFFFFF",
                                    border: "transparent"
                                }
                            }
                          }
                        }
                    }}
                />
            </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
        <div className="mb-4 p-2 bg-white/5 rounded-lg w-fit">
            {icon}
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
    </div>
);
