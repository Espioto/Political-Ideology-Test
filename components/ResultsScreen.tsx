import React, { useState, useCallback, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import type { IdeologyResult } from '../types';
import { PoliticalCompassChart } from './PoliticalCompassChart';
import { LoadingScreen } from './LoadingScreen';

interface ResultsScreenProps {
  results: IdeologyResult;
  onRetake: () => void;
}

const AnimatedBlock: React.FC<{ children: React.ReactNode, delay: number, className?: string }> = ({ children, delay, className }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  return <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${className}`}>{children}</div>;
};

export const ResultsScreen: React.FC<ResultsScreenProps> = ({ results, onRetake }) => {
  const { economicScore, socialScore, ideology, scoreHistory } = results;
  const [shareStatus, setShareStatus] = useState<'idle' | 'loading' | 'copied' | 'error'>('idle');
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleShare = useCallback(async () => {
    if (!resultsRef.current) return;
    setShareStatus('loading');

    try {
      const canvas = await html2canvas(resultsRef.current, {
          backgroundColor: '#111827', // Match bg-gray-900
          scale: 2, // Higher resolution
          useCORS: true,
      });

      canvas.toBlob(async (blob) => {
        if (!blob) {
            setShareStatus('error');
            return;
        }
        
        const file = new File([blob], 'political_ideology_results.png', { type: 'image/png' });

        // Use Web Share API if available (great for mobile)
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
                title: 'My Political Ideology Results',
                text: `I'm a ${ideology.name}! Find out where you stand.`,
                files: [file],
            });
            setShareStatus('copied');
        } else { // Fallback to clipboard
            try {
                await navigator.clipboard.write([
                    new ClipboardItem({ 'image/png': blob })
                ]);
                setShareStatus('copied');
            } catch (err) {
                console.error('Failed to copy image to clipboard: ', err);
                setShareStatus('error');
            }
        }

        setTimeout(() => setShareStatus('idle'), 3000);

      }, 'image/png');

    } catch (err) {
      console.error('Failed to create canvas: ', err);
      setShareStatus('error');
      setTimeout(() => setShareStatus('idle'), 3000);
    }
  }, [ideology.name]);
  
  const getShareButtonText = () => {
      switch (shareStatus) {
          case 'loading': return 'Generating...';
          case 'copied': return 'Copied to Clipboard!';
          case 'error': return 'Error! Try Again';
          default: return 'Share Results as Image';
      }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm p-3 sm:p-6 lg:p-8 rounded-2xl shadow-2xl w-full border border-gray-700 max-w-7xl mx-auto">
      <div ref={resultsRef} className="p-2 sm:p-4 bg-gray-900/50 rounded-lg">
        <AnimatedBlock delay={0}>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-white mb-2">Your Results</h1>
          <p className="text-center text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">Here's where you stand on the political compass.</p>
        </AnimatedBlock>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          <AnimatedBlock delay={100} className="w-full h-64 sm:h-80 lg:h-full min-h-[300px] sm:min-h-[350px] order-1 lg:order-1">
            <PoliticalCompassChart economic={economicScore} social={socialScore} history={scoreHistory} />
          </AnimatedBlock>
          
          <div className="text-left space-y-4 sm:space-y-6 order-2 lg:order-2">
            <AnimatedBlock delay={200}>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-cyan-400 mb-2">{ideology.name}</h2>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{ideology.description}</p>
              <div className="mt-4 space-y-2 text-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="font-semibold text-sm sm:text-base">Economic Score (Left/Right):</span>
                  <span className="font-mono text-lg sm:text-xl text-cyan-400">{economicScore.toFixed(2)}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="font-semibold text-sm sm:text-base">Social Score (Libertarian/Authoritarian):</span>
                  <span className="font-mono text-lg sm:text-xl text-purple-400">{socialScore.toFixed(2)}</span>
                </div>
              </div>
            </AnimatedBlock>

            <AnimatedBlock delay={300} className="pt-4 sm:pt-6 border-t border-gray-700">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Country Spotlight</h3>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-8 sm:w-16 sm:h-12 rounded-md overflow-hidden border-2 border-gray-600 flex-shrink-0" dangerouslySetInnerHTML={{ __html: ideology.country.svgFlag }} />
                  <p className="text-lg sm:text-2xl font-semibold text-cyan-400">{ideology.country.name}</p>
                </div>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mt-2">{ideology.country.reasoning}</p>
            </AnimatedBlock>

            <AnimatedBlock delay={400} className="pt-4 sm:pt-6 border-t border-gray-700">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">US Party Alignment</h3>
              <p className="text-lg sm:text-2xl font-semibold text-cyan-400 mb-1">{ideology.usPartyAlignment.party}</p>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                <strong className="text-gray-200">Reasoning: </strong>{ideology.usPartyAlignment.reasoning}
              </p>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed bg-gray-900/50 p-2 sm:p-3 rounded-lg border border-gray-600">
                <strong className="text-gray-300">Potential Disagreements: </strong>{ideology.usPartyAlignment.disagreements}
              </p>
            </AnimatedBlock>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
        <button
          onClick={onRetake}
          className="bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 w-full sm:w-auto touch-manipulation"
        >
          Retake the Test
        </button>
        <button
          onClick={handleShare}
          disabled={shareStatus !== 'idle'}
          className={`font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 w-full sm:w-auto touch-manipulation ${
            shareStatus === 'copied' ? 'bg-green-600 text-white cursor-not-allowed focus:ring-green-500/50' :
            shareStatus === 'error' ? 'bg-red-600 text-white focus:ring-red-500/50' :
            'bg-gray-600 hover:bg-gray-500 active:bg-gray-700 text-white focus:ring-gray-500/50 disabled:opacity-50'
          }`}
        >
          {getShareButtonText()}
        </button>
      </div>
    </div>
  );
};