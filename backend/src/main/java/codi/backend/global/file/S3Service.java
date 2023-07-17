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

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Objects;
import java.util.UUID;

@Service
public class S3Service {
    private static final int IMG_WIDTH = 313;
    private static final int IMG_HEIGHT = 477;
    @Value("${cloud.aws.s3.bucket.mentor-bucket}")
    private String mentorBucket;
    @Value("${cloud.aws.s3.bucket.profile-bucket}")
    private String profileBucket;
    private final AmazonS3 amazonS3;

    public S3Service(AmazonS3 amazonS3) {
        this.amazonS3 = amazonS3;
    }

    public String upload(MultipartFile file, String dirName) {
        String bucket = getBucket(dirName);
        validateFileForDir(file, dirName);

        String originalFileName = file.getOriginalFilename();
        String fileName = dirName + "/" + createFileName(originalFileName);

        try {
//            byte[] bytes;
//            if (dirName.equals("profile") && isValidImage(file)) {
//                BufferedImage resizedImage = resizeImage(file);
//                ByteArrayOutputStream baos = new ByteArrayOutputStream();
//                String formatName = Objects.requireNonNull(file.getContentType()).split("/")[1];
//                boolean result = ImageIO.write(resizedImage, formatName, baos);
//                baos.flush();
//                baos.close();
//
//                if (!result) {
//                    throw new BusinessLogicException(ExceptionCode.FILE_WRITE_ERROR);
//                }
//
//                bytes = baos.toByteArray();
//            } else {
//                bytes = file.getBytes();
//            }

            ObjectMetadata omd = new ObjectMetadata();
            omd.setContentType(file.getContentType());
            omd.setContentLength(file.getSize()); // resize -> file.getSize()
            String encodedFilename = URLEncoder.encode(originalFileName, StandardCharsets.UTF_8);
            omd.addUserMetadata("original-filename", encodedFilename);
            amazonS3.putObject(new PutObjectRequest(bucket, fileName, file.getInputStream(), omd) // resize -> file.getInputStream
                    .withCannedAcl(CannedAccessControlList.PublicRead));
            return amazonS3.getUrl(bucket, fileName).toString();
        } catch (IOException e) {
            throw new BusinessLogicException(ExceptionCode.FILE_UPLOAD_ERROR);
        }
    }

    private BufferedImage resizeImage(MultipartFile file) throws IOException {
        BufferedImage originalImage = ImageIO.read(file.getInputStream());
        int type = originalImage.getType() == 0 ? BufferedImage.TYPE_INT_ARGB : originalImage.getType();

        if (needsResizing(originalImage.getWidth(), originalImage.getHeight())) {
            return resizeImageWithHint(originalImage, type);
        }

        return originalImage;
    }

    private boolean needsResizing(int width, int height) {
        return width > IMG_WIDTH || height > IMG_HEIGHT;
    }

    private BufferedImage resizeImageWithHint(BufferedImage originalImage, int type) {
        int width = originalImage.getWidth();
        int height = originalImage.getHeight();

        double aspectRatio = (double) width / height;

        int newWidth;
        int newHeight;

        if (aspectRatio > 1) { // if width > height
            newWidth = IMG_WIDTH;
            newHeight = (int) (IMG_WIDTH / aspectRatio);
        } else {
            newHeight = IMG_HEIGHT;
            newWidth = (int) (IMG_HEIGHT * aspectRatio);
        }

        BufferedImage resizedImage = new BufferedImage(newWidth, newHeight, type);
        Graphics2D g = resizedImage.createGraphics();

        g.drawImage(originalImage, 0, 0, newWidth, newHeight, null);
        g.setComposite(AlphaComposite.Src);
        g.setRenderingHint(RenderingHints.KEY_INTERPOLATION,
                RenderingHints.VALUE_INTERPOLATION_BILINEAR);
        g.setRenderingHint(RenderingHints.KEY_RENDERING,
                RenderingHints.VALUE_RENDER_QUALITY);
        g.setRenderingHint(RenderingHints.KEY_ANTIALIASING,
                RenderingHints.VALUE_ANTIALIAS_ON);

        g.dispose();

        return resizedImage;
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

    private void validateFileForDir(MultipartFile file, String dirName) {
        if (dirName.equals("profile") && isValidImage(file)) {
            throw new BusinessLogicException(ExceptionCode.INVALID_FILE_TYPE);
        }
    }

    // for resize
//    private void validateFileForDir(MultipartFile file, String dirName) {
//        if (dirName.equals("profile") && !isValidImage(file)) {
//            throw new BusinessLogicException(ExceptionCode.INVALID_FILE_TYPE);
//        }
//    }

    private boolean isValidImage(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType == null || (!contentType.equals("image/jpeg") && !contentType.equals("image/png"));
    }

    // for resize
//    private boolean isValidImage(MultipartFile file) {
//        String contentType = file.getContentType();
//        return contentType != null && (contentType.equals("image/jpeg") || contentType.equals("image/png"));
//    }

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

