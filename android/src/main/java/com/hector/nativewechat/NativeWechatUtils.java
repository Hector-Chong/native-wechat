package com.hector.nativewechat;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Rect;

import androidx.annotation.NonNull;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.URL;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.ResponseBody;

public class NativeWechatUtils {
  private static final OkHttpClient client = new OkHttpClient();

  public static void downloadFileAsBitmap(String url, DownloadBitmapCallback callback) {
    Request request = new Request.Builder().url(url).build();

    client.newCall(request).enqueue(new Callback() {
      @Override
      public void onFailure(@NonNull Call call, @NonNull IOException e) {
        callback.onFailure(call, e);
      }

      @Override
      public void onResponse(@NonNull Call call, @NonNull Response response) throws IOException {
        try (ResponseBody responseBody = response.body()) {
          if (!response.isSuccessful()) throw new IOException("Unexpected code " + response);

          byte[] bytes = responseBody.bytes();

          callback.onResponse(BitmapFactory.decodeByteArray(bytes, 0, bytes.length));
        }
      }
    });
  }

  public static byte[] bmpToByteArray(final Bitmap bmp, final boolean needRecycle) {
    int i;
    int j;
    if (bmp.getHeight() > bmp.getWidth()) {
      i = bmp.getWidth();
      j = bmp.getWidth();
    } else {
      i = bmp.getHeight();
      j = bmp.getHeight();
    }

    Bitmap localBitmap = Bitmap.createBitmap(i, j, Bitmap.Config.RGB_565);
    Canvas localCanvas = new Canvas(localBitmap);

    while (true) {
      localCanvas.drawBitmap(bmp, new Rect(0, 0, i, j), new Rect(0, 0, i, j), null);
      if (needRecycle)
        bmp.recycle();
      ByteArrayOutputStream localByteArrayOutputStream = new ByteArrayOutputStream();
      localBitmap.compress(Bitmap.CompressFormat.JPEG, 100,
        localByteArrayOutputStream);
      localBitmap.recycle();
      byte[] arrayOfByte = localByteArrayOutputStream.toByteArray();
      try {
        localByteArrayOutputStream.close();
        return arrayOfByte;
      } catch (Exception e) {
        //F.out(e);
      }
      i = bmp.getHeight();
      j = bmp.getHeight();
    }
  }

  public static Bitmap compressImage(Bitmap image, Integer size) {
    ByteArrayOutputStream baos = new ByteArrayOutputStream();
    image.compress(Bitmap.CompressFormat.JPEG, 100, baos);
    int options = 100;
    while (baos.toByteArray().length / 1024 > size) {
      baos.reset();
      image.compress(Bitmap.CompressFormat.JPEG, options, baos);
      options -= 10;
    }

    ByteArrayInputStream isBm = new ByteArrayInputStream(baos.toByteArray());
    Bitmap bitmap = BitmapFactory.decodeStream(isBm, null, null);
    return bitmap;
  }

  public interface DownloadBitmapCallback {
    void onFailure(@NonNull Call call, @NonNull IOException e);

    void onResponse(@NonNull Bitmap bitmap);
  }
}
