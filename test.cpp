#include <bits/stdc++.h>

using namespace std;

int main()
{
    vector<int> arr{3, 2, 4, 6};

    int min_val = INT_MAX, max_val = INT_MIN;
    for (int i = 0; i < arr.size(); i++)
    {
        int ele = arr[i];
        min_val = min(min_val, ele);
        max_val = max(max_val, ele);
    }

    cout << min_val << " " << max_val << endl;
}
