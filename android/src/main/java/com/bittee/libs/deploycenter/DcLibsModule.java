// DcLibsModule.java

package com.bittee.libs.deploycenter;

import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class DcLibsModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public DcLibsModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "DcLibs";
    }

//    @ReactMethod
//    public void sampleMethod(String stringArgument, int numberArgument, Callback callback) {
//        // TODO: Implement some actually useful functionality
//        callback.invoke("Received numberArgument: " + numberArgument + " stringArgument: " + stringArgument);
//    }

    @ReactMethod
    public void getAppInfo(Promise promise) {
        try {
            String packageName = reactContext.getPackageName();
            PackageInfo pInfo = reactContext.getPackageManager().getPackageInfo(reactContext.getPackageName(), 0);
            String version = pInfo.versionName;
            int versionCode = pInfo.versionCode;
            String data = String.format("%s:%s:%s", packageName, version, versionCode);
            promise.resolve(data);
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
            promise.resolve(null);
        }
    }
}
