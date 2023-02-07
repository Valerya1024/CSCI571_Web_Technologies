package android.demo.marco.papa.com.demo;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.widget.Toast;

public class ActivityActivity extends AppCompatActivity {
    String msg = "Android : ";

    /** Called when the activity is first created. */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_activity);
        setTitle("Activity");
        Log.d(msg, "The onCreate() event");
        Toast.makeText(getApplicationContext(),
                "The onCreate() event", Toast.LENGTH_SHORT).show();
    }

    /** Called when the activity is about to become visible. */
    @Override
    protected void onStart() {
        super.onStart();
        Log.d(msg, "The onStart() event");
        Toast.makeText(getApplicationContext(),
                "The onStart() event", Toast.LENGTH_SHORT).show();
    }

    /** Called when the activity has become visible. */
    @Override
    protected void onResume() {
        super.onResume();
        Log.d(msg, "The onResume() event");
        Toast.makeText(getApplicationContext(),
                "The onResume() event", Toast.LENGTH_SHORT).show();
    }

    /** Called when another activity is taking focus. */
    @Override
    protected void onPause() {
        super.onPause();
        Log.d(msg, "The onPause() event");
        Toast.makeText(getApplicationContext(),
                "The onPause() event", Toast.LENGTH_SHORT).show();
    }

    /** Called when the activity is no longer visible. */
    @Override
    protected void onStop() {
        super.onStop();
        Log.d(msg, "The onStop() event");
        Toast.makeText(getApplicationContext(),
                "The onStop() event", Toast.LENGTH_SHORT).show();
    }

    /** Called just before the activity is destroyed. */
    @Override
    public void onDestroy() {
        super.onDestroy();
        Log.d(msg, "The onDestroy() event");
        Toast.makeText(getApplicationContext(),
                "The onDestroy() event", Toast.LENGTH_SHORT).show();
    }
}
