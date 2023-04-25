import axios from 'axios';
import type { FileMetadataWithID } from '../../interfaces/FileMetadata';

export const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const uploadFile = await axios.post<FileMetadataWithID>("http://localhost:3000/upload", formData, {
        headers: {
            'Content-Type': "multipart/form-data"
        }
    })
    return uploadFile;
}
