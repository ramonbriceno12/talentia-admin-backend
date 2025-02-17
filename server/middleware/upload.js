const multer = require('multer');
const { Upload } = require('@aws-sdk/lib-storage');
const s3 = require('../config/s3');

const bucketName = 'talentiafilesprod';

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 80 * 1024 * 1024 }, // 80 MB limit
});

const uploadToS3 = async (file, folder) => {
    const uploadParams = {
        Bucket: bucketName,
        Key: `${folder}/${Date.now().toString()}-${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        // ACL: 'public-read',
    };

    const parallelUploads3 = new Upload({
        client: s3,
        params: uploadParams,
    });

    try {
        const result = await parallelUploads3.done();
        return result.Location;
    } catch (error) {
        console.error('S3 Upload Error:', error);
        throw new Error('Failed to upload to S3. Check bucket permissions, file size, and region.');
    }
};

module.exports = { upload, uploadToS3 };
