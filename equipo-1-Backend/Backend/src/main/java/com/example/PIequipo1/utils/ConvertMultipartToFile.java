package com.example.PIequipo1.utils;

import org.jetbrains.annotations.NotNull;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class ConvertMultipartToFile {
    static public @NotNull File toFile(@NotNull MultipartFile imageFile) throws IOException {
        String file = imageFile.getOriginalFilename();
        assert file != null;
        File convertFile = new File(file);
        FileOutputStream fileOutputStream = new FileOutputStream(convertFile);
        fileOutputStream.write(imageFile.getBytes());
        fileOutputStream.close();
        return convertFile;
    }
}
