package codi.backend.global.file;

import codi.backend.global.exception.BusinessLogicException;
import codi.backend.global.exception.ExceptionCode;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.UUID;

@Service
public class S3Service {
    @Value("${cloud.aws.s3.bucket.mentor-bucket}")
    private String mentorBucket;
    @Value("${cloud.aws.s3.bucket.profile-bucket}")
    private String profileBucket;
    private final AmazonS3 amazonS3;

    public S3Service(AmazonS3 amazonS3) {
        this.amazonS3 = amazonS3;
    }

    public String upload(MultipartFile file, String dirName) {
        validateFile(file);
        String bucket = getBucket(dirName);
        validateFileForDir(file, dirName);

        String originalFileName = file.getOriginalFilename();
        String fileName = dirName + "/" + createFileName(originalFileName);

        try {
            ObjectMetadata omd = new ObjectMetadata();
            omd.setContentType(file.getContentType());
            omd.setContentLength(file.getSize()); // resize -> file.getSize()
            if (originalFileName != null) {
                String encodedFilename = URLEncoder.encode(originalFileName, StandardCharsets.UTF_8);
                omd.addUserMetadata("original-filename", encodedFilename);
            }
            amazonS3.putObject(new PutObjectRequest(bucket, fileName, file.getInputStream(), omd) // resize -> file.getInputStream
                    .withCannedAcl(CannedAccessControlList.PublicRead));
            return amazonS3.getUrl(bucket, fileName).toString();
        } catch (IOException e) {
            throw new BusinessLogicException(ExceptionCode.FILE_UPLOAD_ERROR);
        }
    }

    private String getBucket(String dirName) {
        switch (dirName) {
            case "profile":
                return this.profileBucket;
            case "mentor":
                return this.mentorBucket;
            default:
                throw new BusinessLogicException(ExceptionCode.INVALID_DIRECTORY_NAME);
        }
    }

    private void validateFile(MultipartFile file) {
        if (file.isEmpty() || file.getOriginalFilename() == null) {
            throw new BusinessLogicException(ExceptionCode.INVALID_FILE);
        }
    }

    private void validateFileForDir(MultipartFile file, String dirName) {
        if (dirName.equals("profile") && isValidImage(file)) {
            throw new BusinessLogicException(ExceptionCode.INVALID_FILE_TYPE);
        }
    }

    private boolean isValidImage(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType == null || (!contentType.equals("image/jpeg") && !contentType.equals("image/png"));
    }

    private String createFileName(String fileName) {
        return UUID.randomUUID() + getFileExtension(fileName);
    }

    private String getFileExtension(String fileName) {
        try {
            return fileName.substring(fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일(" + fileName + ") 입니다.");
        }
    }

    public void delete(String filePath) {
        String dirName = filePath.split("/")[3];
        String bucket = getBucket(dirName);
        String fileName = filePath.substring(filePath.indexOf(dirName)); // object key

        amazonS3.deleteObject(new DeleteObjectRequest(bucket, fileName));
    }
}

