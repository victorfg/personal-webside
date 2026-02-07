export const ReadingTime = ({ content }) => {
  // Extract text from TinaCMS JSON structure
  const extractTextFromTinaContent = (node) => {
    if (!node) return '';
    
    // If it's a string, return it
    if (typeof node === 'string') return node;
    
    // If it's an array, process each item
    if (Array.isArray(node)) {
      return node.map(extractTextFromTinaContent).join(' ');
    }
    
    // If it's an object
    if (typeof node === 'object') {
      let text = '';
      
      // Extract direct text property
      if (node.text) {
        text += node.text + ' ';
      }
      
      // Extract code block value
      if (node.type === 'code_block' && node.value) {
        text += node.value + ' ';
      }
      
      // Recursively extract from children
      if (node.children) {
        text += extractTextFromTinaContent(node.children);
      }
      
      return text;
    }
    
    return '';
  };

  // Calculate reading time for technical content
  const calculateReadingTime = (contentData) => {
    if (!contentData) return 0;
    
    // Extract all text from TinaCMS JSON structure
    const fullText = extractTextFromTinaContent(contentData);
    
    if (!fullText || fullText.trim().length === 0) return 0;
    
    // Count total words
    const words = fullText.split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
    
    // Calculate reading time
    // Technical content: ~200 words per minute (average reading speed)
    const totalMinutes = Math.ceil(wordCount / 200);
    
    // Minimum 1 minute for any content
    return Math.max(totalMinutes, 1);
  };

  const minutes = calculateReadingTime(content);

  if (minutes === 0) return null;

  return (
    <span className="flex items-center gap-1.5 font-light text-xs text-gray-600 dark:text-gray-400">
      <svg 
        className="w-3.5 h-3.5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
      <span>{minutes} min read</span>
    </span>
  );
};
