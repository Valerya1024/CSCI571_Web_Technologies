package android.demo.marco.papa.com.demo;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;

public class ServiceActivity extends AppCompatActivity {

    String msg = "Android : ";
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_service);
        setTitle("Service");
        Log.d(msg, "The onCreate() event");
    }
    public void startService(View view) {
        startService(new Intent(getBaseContext(), MyService.class));
    }
    // Method to stop the service
    public void stopService(View view) {
        stopService(new Intent(getBaseContext(), MyService.class));
    }
}
