package android.demo.marco.papa.com.demo;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class HTTPActivity extends AppCompatActivity {
    private RequestQueue requestQueue;
    private TextView textView;
    private  TextView responseName;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_http);
        setTitle("HTTP Networking & JSON Parser");

        textView = (TextView) findViewById(R.id.volleyText);
        responseName = (TextView) findViewById(R.id.responseName);
        requestQueue = Volley.newRequestQueue(this); // 'this' is the Context
        String url = "https://jsonplaceholder.typicode.com/users";

        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(Request.Method.GET, url, null,
                new Response.Listener<JSONArray>() {
                    @Override
                    public void onResponse(JSONArray response) {
                        textView.setText("Trimmed response: " + response.toString());
                        Toast.makeText(getApplicationContext(), response.toString(), Toast.LENGTH_SHORT);
                        StringBuilder names = new StringBuilder();
                        names.append("Parsed names from the response: ");
                        try {
                            for(int i = 0; i < response.length(); i++){
                                JSONObject jresponse = response.getJSONObject(i);
                                String name = jresponse.getString("name");
                                names.append(name).append(", ");
                                Log.d("Name", name);
                            }
                            names.deleteCharAt(names.length() -2);
                            responseName.setText(names.toString());
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(getApplicationContext(), "Nothing found!", Toast.LENGTH_SHORT);
                    }
                });
        //add request to queue
        requestQueue.add(jsonArrayRequest);
    }
}
