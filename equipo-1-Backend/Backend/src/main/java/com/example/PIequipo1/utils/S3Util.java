package com.example.PIequipo1.utils;

import java.io.IOException;
import java.io.InputStream;

import com.amazonaws.auth.InstanceProfileCredentialsProvider;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.HeadObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.waiters.S3Waiter;
public class S3Util {
    private static final String BUCKET = "bucket2escapexperince";

    public static String uploadFile(String fileName, InputStream inputStream) throws IOException {
        AwsBasicCredentials awsCreds = AwsBasicCredentials.create("AKIAY3PLHSUJIASJO6UP", "5sdIP0Vpp5k9cZENwy0n5lKFUxmHIBkLa5BwW+5n");
        try (S3Client client = S3Client.builder().region(Region.US_EAST_2).credentialsProvider(StaticCredentialsProvider.create(awsCreds)).build();) {
            PutObjectRequest request = PutObjectRequest.builder()
                    .bucket(BUCKET)
                    .key(fileName)
                    .build();

            client.putObject(request, RequestBody.fromInputStream(inputStream, inputStream.available()));

            S3Waiter waiter = client.waiter();
            HeadObjectRequest waitRequest = HeadObjectRequest.builder()
                    .bucket(BUCKET)
                    .key(fileName)
                    .build();

            return waiter.waitUntilObjectExists(waitRequest)
                    .matched()
                    .response()
                    .map(response -> client.utilities().getUrl(builder -> builder.bucket(BUCKET).key(fileName)).toString())
                    .orElseThrow(() -> new RuntimeException("Failed to retrieve the URL of the uploaded file."));
        }
    }
}
