package android.demo.marco.papa.com.demo;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

public class BroadcastReceiverActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_broadcast_receiver);
        setTitle("Broadcast Receiver");
    }
}
