package android.demo.marco.papa.com.demo;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

public class DisplayHistoryActivity extends AppCompatActivity {
    ArrayList<String> mobileArray = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_display_history);
        setTitle("History");

        Intent intent = getIntent();
        HashMap<String,ArrayList<String>> hm;
        hm = (HashMap<String,ArrayList<String>>) intent.getSerializableExtra("EXTRA_MESSAGE");

        Set set = hm.entrySet();
        Iterator iterator = set.iterator();
        while(iterator.hasNext()){
            Map.Entry me = (Map.Entry) iterator.next();
            ArrayList<String> transaction  = (ArrayList<String>) me.getValue();
            int count = 0;
            StringBuilder stringBuilder = new StringBuilder();
            while(count < transaction.size() - 2) {
                stringBuilder.append(transaction.get(count)).append(" + ");
                count++;
            }
            stringBuilder.append(transaction.get(transaction.size() - 2)).append(" = ").append(transaction.get(transaction.size() - 1));
            mobileArray.add(stringBuilder.toString());
        }

        ArrayAdapter adapter = new ArrayAdapter<String>(this,
                R.layout.activity_listview, mobileArray);

        ListView listView = (ListView)findViewById(R.id.mobile_list);
        listView.setAdapter(adapter);
    }
}
