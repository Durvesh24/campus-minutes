import React from 'react';

export interface FileUploaderProps {
  accept?: string;
  multiple?: boolean;
  onFileSelect?: (files: FileList | null) => void;
}

export function FileUploader({ accept, multiple, onFileSelect }: FileUploaderProps) {
  return (
    <input
      type="file"
      data-component="file-uploader"
      accept={accept}
      multiple={multiple}
      onChange={(e) => onFileSelect?.(e.target.files)}
    />
  );
}
