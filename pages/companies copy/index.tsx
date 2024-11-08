"use client";
// src/app/companies/page.tsx
import React, { useEffect, useState } from 'react';
import { fetchFileList } from '../../services/fileService';

const Page = () => {
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    const loadFiles = async () => {
      const filesData = await fetchFileList();
      setFiles(filesData);
    };

    loadFiles();
  }, []);

  return (
    <div>
      <h1>Lista de Archivos</h1>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            {file.name} - {file.size}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;