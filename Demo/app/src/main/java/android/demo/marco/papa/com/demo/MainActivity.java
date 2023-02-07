package android.demo.marco.papa.com.demo;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.support.design.widget.NavigationView;
import android.support.v4.content.ContextCompat;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.GridView;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

public class MainActivity extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener {
    public static final String EXTRA_MESSAGE = "com.example.myfirstapp.MESSAGE";
    private GridView gridView;
    private NavigationView nvDrawer;
    private Toolbar toolbar;
    private DrawerLayout mDrawer;
    private TextView result;
    boolean hitPlus = false;
    private int count = 0;
    int newNum = 0;
    LinkedHashMap<String, ArrayList<String>> lhm = new LinkedHashMap<>();

    static final String[] numbers = new String[] {
            "7", "8", "9",
            "4", "5", "6",
            "1", "2", "3",
            "+", "0", "="
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        ArrayAdapter<String> ad = new ArrayAdapter<String>(getApplicationContext(),
                android.R.layout.simple_list_item_1, numbers) {
            @Override
            public View getView(int position, View convertView, ViewGroup parent) {
                View view = super.getView(position, convertView, parent);
                view.setBackgroundColor(ContextCompat.getColor(getContext(), R.color.gray));
                view.setPadding(0, 80, 0, 80);
                TextView textView= (TextView) view;
                textView.setTextColor(Color.parseColor("#1C99FC"));
                textView.setTextSize(25);
                textView.setTextAlignment(View.TEXT_ALIGNMENT_CENTER);
                return view;
            }
        };

        final LinkedHashMap<Integer, Integer> numbers = new LinkedHashMap<Integer, Integer>();
        numbers.put(count, 0);
        gridView = (GridView) findViewById(R.id.gridView1);
        gridView.setAdapter(ad);
        result = (TextView) findViewById(R.id.result);

        gridView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            public void onItemClick(AdapterView<?> parent, View v,
                                    int position, long id) {
                switch(((TextView) v).getText().toString()){
                    case "=":
                        int sum = 0;
                        Set set = numbers.entrySet();
                        Iterator i = set.iterator();
                        ArrayList<String> lhmList = new ArrayList<String>();
                        while(i.hasNext()) {
                            Map.Entry me = (Map.Entry) i.next();
                            int value = (int)me.getValue();
                            sum += value;
                            lhmList.add(Integer.toString(value));
                        }
                        lhmList.add(Integer.toString(sum));
                        lhm.put(Integer.toString(count), lhmList);
                        numbers.clear();
                        result.setText(Integer.toString(sum));
                        hitPlus = false;
                        break;
                    case "0":
                    case "1":
                    case "2":
                    case "3":
                    case "4":
                    case "5":
                    case "6":
                    case "7":
                    case "8":
                    case "9":
                        if(hitPlus == false && numbers.size() != 0){
                            int oldValue = numbers.get(count);
                            newNum = (oldValue * 10) + Integer.parseInt(((TextView) v).getText()
                                    .toString());
                            numbers.put(count, newNum);
                        } else {
                            newNum = Integer.parseInt(((TextView) v).getText().toString());
                            numbers.put(++count, newNum);
                        }
                        result.setText(Integer.toString(newNum));
                        hitPlus = false;
                        break;
                    case "+":
                        hitPlus = true;
                        result.setText("");
                        Toast.makeText(getApplicationContext(),
                                "+", Toast.LENGTH_SHORT).show();
                        break;
                }
            }
        });

        mDrawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, mDrawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        mDrawer.setDrawerListener(toggle);
        toggle.syncState();

        nvDrawer = (NavigationView) findViewById(R.id.nav_view);
        nvDrawer.setNavigationItemSelectedListener(this);
    }

    public void showHistory(View view) {
        Intent intent = new Intent(this, DisplayHistoryActivity.class);
        intent.putExtra("EXTRA_MESSAGE", lhm);
        startActivity(intent);
    }

    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        // Handle navigation view item clicks here.
        int id = item.getItemId();

        if (id == R.id.demo) {
            Toast.makeText(this, "Started MainActivity", Toast.LENGTH_SHORT).show();
            Intent intent = new Intent(this, MainActivity.class);
            startActivity(intent);
        } else if (id == R.id.activity) {
            Toast.makeText(this, "Started ActivityActivity", Toast.LENGTH_SHORT).show();
            Intent intent = new Intent(this, ActivityActivity.class);
            startActivity(intent);
        } else if (id == R.id.service) {
            Toast.makeText(this, "Started ServiceActivity", Toast.LENGTH_SHORT).show();
            Intent intent = new Intent(this, ServiceActivity.class);
            startActivity(intent);
        } else if (id == R.id.broadcast) {
            Toast.makeText(this, "Started BroadcastReceiverActivity", Toast.LENGTH_SHORT).show();
            Intent intent = new Intent(this, BroadcastReceiverActivity.class);
            startActivity(intent);
        } else if (id == R.id.fragment) {
            Toast.makeText(this, "Started FragmentActivity", Toast.LENGTH_SHORT).show();
            Intent intent = new Intent(this, FragmentActivity.class);
            startActivity(intent);
        } else if (id == R.id.uiControl) {
            Toast.makeText(this, "Started UIControlsActivity", Toast.LENGTH_SHORT).show();
            Intent intent = new Intent(this, UIControlsActivity.class);
            startActivity(intent);
        } else if (id == R.id.event) {
            Toast.makeText(this, "Started EventHandlingActivity", Toast.LENGTH_SHORT).show();
            Intent intent = new Intent(this, EventHandlingActivity.class);
            startActivity(intent);
        } else if (id == R.id.http){
            Toast.makeText(this, "Started HTTPActivity", Toast.LENGTH_SHORT).show();
            Intent intent = new Intent(this, HTTPActivity.class);
            startActivity(intent);
        }

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }
}
