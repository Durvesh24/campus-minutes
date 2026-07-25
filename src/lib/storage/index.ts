/**
 * Cloudinary / Storage Infrastructure Service
 */
export interface UploadResult {
  url: string;
  publicId: string;
}

export async function uploadFile(_file: Blob): Promise<UploadResult> {
  // Cloudinary / Object Storage integration point
  return { url: '', publicId: '' };
}
