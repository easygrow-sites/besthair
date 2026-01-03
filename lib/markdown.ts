export function markdownToHtml(markdown: string): string {
  if (!markdown) return '';
  let html = markdown;

  // Remove hashtags (social media style)
  html = html.replace(/#(\w+)/g, '$1');

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-gray-900 mt-8 mb-4">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-gray-900 mt-10 mb-6">$1</h1>');

  // Bold and italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary-600 hover:text-primary-700 underline">$1</a>');

  // Lists
  html = html.replace(/^\s*[-*]\s+(.*)$/gim, '<li class="ml-4">$1</li>');

  // Horizontal rules
  html = html.replace(/^---$/gim, '<hr class="my-8 border-gray-200" />');

  // Paragraphs
  const lines = html.split('\n');
  const processedLines = lines.map((line: string) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('<') || trimmed.startsWith('-') || trimmed.match(/^\d+\./)) return line;
    return `<p class="text-gray-600 leading-relaxed mb-4">${trimmed}</p>`;
  });

  return processedLines.join('\n').replace(/<p class="[^"]*"><\/p>/g, '');
}
