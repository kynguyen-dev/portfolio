/**
 * Triggers a proper file download with the correct filename.
 * Fetches the file as a Blob and forces the browser to download it,
 * avoiding router interception or missing file extensions (UUIDs).
 */
export const downloadFile = async (url: string, filename?: string): Promise<void> => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    
    // Explicitly set the blob type to PDF if it's a resume
    const originalBlob = await response.blob();
    const blob = new Blob([originalBlob], { type: 'application/pdf' });
    
    const blobUrl = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename || url.split('/').pop() || 'download.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the object URL to release memory
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Download failed:', error);
    // Fallback if fetch fails
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || url.split('/').pop() || 'download.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
