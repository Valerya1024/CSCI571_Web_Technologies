package android.demo.marco.papa.com.demo;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

public class EventHandlingActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_event_handling);
        setTitle("Event Handling");
    }

    public void showName(View view) {
        TextView textView = (TextView) findViewById(R.id.editTextName);
        String name = textView.getText().toString();
        Toast.makeText(getApplicationContext(), "Hi " + name +"! How you doin ? ;)" , Toast.LENGTH_LONG).show();
    }
}
