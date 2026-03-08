export type SupportedCodingLanguage = "python" | "cpp";

export type CodingTemplate = {
  language: SupportedCodingLanguage;
  label: string;
  judge0LanguageId: number;
  starterCode: string;
  referenceSolution: string;
};

export type SampleTestcase = {
  input: string;
  expectedOutput: string;
  explanation: string;
};

export type CodingProblem = {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  pattern: string;
  concepts: string[];
  approach: string[];
  companies: string[];
  tracks: string[];
  hiddenTestcaseGroups: Array<{
    label: string;
    focus: string;
  }>;
  templates: CodingTemplate[];
  sampleTestcases: SampleTestcase[];
};

const python = (
  starterCode: string,
  referenceSolution: string,
): CodingTemplate => ({
  language: "python",
  label: "Python 3",
  judge0LanguageId: 71,
  starterCode,
  referenceSolution,
});

const cpp = (
  starterCode: string,
  referenceSolution: string,
): CodingTemplate => ({
  language: "cpp",
  label: "C++17",
  judge0LanguageId: 54,
  starterCode,
  referenceSolution,
});

export const codingProblems: CodingProblem[] = [
  {
    id: "two-sum-indices",
    title: "Two Sum Indices",
    description:
      "Given an array and a target, print the indices of two numbers whose sum equals the target. If no answer exists, print -1 -1.",
    difficulty: "easy",
    pattern: "Hash Map",
    concepts: ["arrays", "hash map", "index lookup"],
    companies: ["General FAANG", "Amazon", "Google", "Meta"],
    tracks: ["Blind 75", "NeetCode 150"],
    hiddenTestcaseGroups: [
      { label: "duplicate values", focus: "same number appearing multiple times" },
      { label: "no solution", focus: "returning fallback output correctly" },
    ],
    approach: [
      "Walk through the array once.",
      "Store each value and its index in a hash map.",
      "For the current number, check whether target - current already exists.",
      "If it does, return the stored index and the current index.",
    ],
    templates: [
      python(
        `n, target = map(int, input().split())
nums = list(map(int, input().split()))

# TODO: solve using a hash map in O(n)
print(-1, -1)
`,
        `n, target = map(int, input().split())
nums = list(map(int, input().split()))

seen = {}
for i, num in enumerate(nums):
    need = target - num
    if need in seen:
        print(seen[need], i)
        break
    seen[num] = i
else:
    print(-1, -1)
`,
      ),
      cpp(
        `#include <bits/stdc++.h>
using namespace std;

int main() {
  int n, target;
  cin >> n >> target;
  vector<int> nums(n);
  for (int i = 0; i < n; i++) cin >> nums[i];

  // TODO: solve using an unordered_map in O(n)
  cout << -1 << " " << -1 << "\\n";
  return 0;
}
`,
        `#include <bits/stdc++.h>
using namespace std;

int main() {
  int n, target;
  cin >> n >> target;
  vector<int> nums(n);
  for (int i = 0; i < n; i++) cin >> nums[i];

  unordered_map<int, int> seen;
  for (int i = 0; i < n; i++) {
    int need = target - nums[i];
    if (seen.count(need)) {
      cout << seen[need] << " " << i << "\\n";
      return 0;
    }
    seen[nums[i]] = i;
  }

  cout << -1 << " " << -1 << "\\n";
  return 0;
}
`,
      ),
    ],
    sampleTestcases: [
      { input: "4 9\n2 7 11 15\n", expectedOutput: "0 1\n", explanation: "2 + 7 = 9." },
      { input: "5 6\n3 2 4 1 8\n", expectedOutput: "1 2\n", explanation: "2 + 4 = 6." },
    ],
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    description:
      "Given a string containing only (), {}, and [], print true if it is valid and false otherwise.",
    difficulty: "easy",
    pattern: "Stack",
    concepts: ["stack", "matching pairs", "strings"],
    companies: ["General FAANG", "Amazon", "Meta"],
    tracks: ["Blind 75", "NeetCode 150"],
    hiddenTestcaseGroups: [
      { label: "early mismatch", focus: "closing bracket before opener" },
      { label: "leftover stack", focus: "unclosed brackets at the end" },
    ],
    approach: [
      "Push opening brackets onto a stack.",
      "When you see a closing bracket, the stack top must be its matching opener.",
      "If the stack is empty too early or a mismatch appears, return false.",
      "At the end, the stack must be empty.",
    ],
    templates: [
      python(
        `s = input().strip()

# TODO: solve using a stack
print("false")
`,
        `s = input().strip()

pairs = {')': '(', ']': '[', '}': '{'}
stack = []

for ch in s:
    if ch in "([{":
        stack.append(ch)
    else:
        if not stack or stack[-1] != pairs[ch]:
            print("false")
            break
        stack.pop()
else:
    print("true" if not stack else "false")
`,
      ),
      cpp(
        `#include <bits/stdc++.h>
using namespace std;

int main() {
  string s;
  cin >> s;

  // TODO: solve using a stack<char>
  cout << "false\\n";
  return 0;
}
`,
        `#include <bits/stdc++.h>
using namespace std;

int main() {
  string s;
  cin >> s;

  unordered_map<char, char> pairs = {{')', '('}, {']', '['}, {'}', '{'}};
  vector<char> stack;

  for (char ch : s) {
    if (ch == '(' || ch == '[' || ch == '{') {
      stack.push_back(ch);
    } else {
      if (stack.empty() || stack.back() != pairs[ch]) {
        cout << "false\\n";
        return 0;
      }
      stack.pop_back();
    }
  }

  cout << (stack.empty() ? "true" : "false") << "\\n";
  return 0;
}
`,
      ),
    ],
    sampleTestcases: [
      { input: "()[]{}\n", expectedOutput: "true\n", explanation: "All pairs close correctly." },
      { input: "([)]\n", expectedOutput: "false\n", explanation: "Crossed brackets are invalid." },
    ],
  },
  {
    id: "binary-search",
    title: "Binary Search",
    description:
      "Given a sorted array and a target, print its index. If it does not exist, print -1.",
    difficulty: "easy",
    pattern: "Binary Search",
    concepts: ["sorted array", "midpoint", "logarithmic search"],
    companies: ["General FAANG", "Google", "Meta"],
    tracks: ["Blind 75", "NeetCode 150"],
    hiddenTestcaseGroups: [
      { label: "single-element array", focus: "boundary handling" },
      { label: "target absent", focus: "terminating cleanly with -1" },
    ],
    approach: [
      "Maintain left and right pointers on the sorted range.",
      "Check the midpoint each step.",
      "If the midpoint is too small, move left up. If too large, move right down.",
      "Stop when found or when the range becomes empty.",
    ],
    templates: [
      python(
        `n, target = map(int, input().split())
nums = list(map(int, input().split()))

# TODO: solve using binary search
print(-1)
`,
        `n, target = map(int, input().split())
nums = list(map(int, input().split()))

left, right = 0, n - 1
while left <= right:
    mid = (left + right) // 2
    if nums[mid] == target:
        print(mid)
        break
    if nums[mid] < target:
        left = mid + 1
    else:
        right = mid - 1
else:
    print(-1)
`,
      ),
      cpp(
        `#include <bits/stdc++.h>
using namespace std;

int main() {
  int n, target;
  cin >> n >> target;
  vector<int> nums(n);
  for (int i = 0; i < n; i++) cin >> nums[i];

  // TODO: solve using binary search
  cout << -1 << "\\n";
  return 0;
}
`,
        `#include <bits/stdc++.h>
using namespace std;

int main() {
  int n, target;
  cin >> n >> target;
  vector<int> nums(n);
  for (int i = 0; i < n; i++) cin >> nums[i];

  int left = 0, right = n - 1;
  while (left <= right) {
    int mid = left + (right - left) / 2;
    if (nums[mid] == target) {
      cout << mid << "\\n";
      return 0;
    }
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  cout << -1 << "\\n";
  return 0;
}
`,
      ),
    ],
    sampleTestcases: [
      { input: "6 9\n1 3 5 7 9 11\n", expectedOutput: "4\n", explanation: "Target exists at index 4." },
      { input: "5 8\n1 2 3 4 5\n", expectedOutput: "-1\n", explanation: "Target is not present." },
    ],
  },
  {
    id: "best-time-stock",
    title: "Best Time to Buy and Sell Stock",
    description:
      "Given daily stock prices, print the maximum profit from one buy and one sell. If no profit is possible, print 0.",
    difficulty: "easy",
    pattern: "Greedy / Prefix Minimum",
    concepts: ["single pass", "minimum so far", "profit tracking"],
    companies: ["General FAANG", "Amazon", "Meta"],
    tracks: ["Blind 75", "NeetCode 150"],
    hiddenTestcaseGroups: [
      { label: "strictly decreasing prices", focus: "profit should stay 0" },
      { label: "late best sell", focus: "minimum price appears early" },
    ],
    approach: [
      "Track the smallest price seen so far.",
      "At each day, compute profit if you sold today.",
      "Keep the best profit over all days.",
      "This works in one pass and constant extra space.",
    ],
    templates: [
      python(
        `n = int(input())
prices = list(map(int, input().split()))

# TODO: track minimum price and best profit
print(0)
`,
        `n = int(input())
prices = list(map(int, input().split()))

min_price = float("inf")
best = 0
for price in prices:
    min_price = min(min_price, price)
    best = max(best, price - min_price)
print(best)
`,
      ),
      cpp(
        `#include <bits/stdc++.h>
using namespace std;

int main() {
  int n;
  cin >> n;
  vector<int> prices(n);
  for (int i = 0; i < n; i++) cin >> prices[i];

  // TODO: track minimum price and best profit
  cout << 0 << "\\n";
  return 0;
}
`,
        `#include <bits/stdc++.h>
using namespace std;

int main() {
  int n;
  cin >> n;
  vector<int> prices(n);
  for (int i = 0; i < n; i++) cin >> prices[i];

  int min_price = INT_MAX;
  int best = 0;
  for (int price : prices) {
    min_price = min(min_price, price);
    best = max(best, price - min_price);
  }

  cout << best << "\\n";
  return 0;
}
`,
      ),
    ],
    sampleTestcases: [
      { input: "6\n7 1 5 3 6 4\n", expectedOutput: "5\n", explanation: "Buy at 1 and sell at 6." },
      { input: "5\n7 6 4 3 1\n", expectedOutput: "0\n", explanation: "No profitable transaction exists." },
    ],
  },
  {
    id: "maximum-subarray",
    title: "Maximum Subarray Sum",
    description:
      "Given an integer array, print the maximum possible sum of a non-empty contiguous subarray.",
    difficulty: "medium",
    pattern: "Kadane's Algorithm",
    concepts: ["dynamic programming", "running sum", "subarray"],
    companies: ["General FAANG", "Amazon", "Google"],
    tracks: ["Blind 75", "NeetCode 150"],
    hiddenTestcaseGroups: [
      { label: "all negative", focus: "must return the least negative element" },
      { label: "best subarray in middle", focus: "cannot greedily take whole array" },
    ],
    approach: [
      "Keep the best subarray ending at the current index.",
      "Either extend the previous subarray or start fresh at the current number.",
      "Track the best global sum across all positions.",
    ],
    templates: [
      python(
        `n = int(input())
nums = list(map(int, input().split()))

# TODO: solve using Kadane's algorithm
print(0)
`,
        `n = int(input())
nums = list(map(int, input().split()))

current = best = nums[0]
for num in nums[1:]:
    current = max(num, current + num)
    best = max(best, current)
print(best)
`,
      ),
      cpp(
        `#include <bits/stdc++.h>
using namespace std;

int main() {
  int n;
  cin >> n;
  vector<int> nums(n);
  for (int i = 0; i < n; i++) cin >> nums[i];

  // TODO: solve using Kadane's algorithm
  cout << 0 << "\\n";
  return 0;
}
`,
        `#include <bits/stdc++.h>
using namespace std;

int main() {
  int n;
  cin >> n;
  vector<int> nums(n);
  for (int i = 0; i < n; i++) cin >> nums[i];

  int current = nums[0], best = nums[0];
  for (int i = 1; i < n; i++) {
    current = max(nums[i], current + nums[i]);
    best = max(best, current);
  }

  cout << best << "\\n";
  return 0;
}
`,
      ),
    ],
    sampleTestcases: [
      { input: "9\n-2 1 -3 4 -1 2 1 -5 4\n", expectedOutput: "6\n", explanation: "Best subarray is 4, -1, 2, 1." },
      { input: "3\n1 2 3\n", expectedOutput: "6\n", explanation: "Whole array is best." },
    ],
  },
  {
    id: "product-except-self",
    title: "Product of Array Except Self",
    description:
      "Given an array, print the product of all elements except the current one for each index without using division.",
    difficulty: "medium",
    pattern: "Prefix / Suffix",
    concepts: ["prefix product", "suffix product", "array transformation"],
    companies: ["General FAANG", "Amazon", "Meta"],
    tracks: ["Blind 75", "NeetCode 150"],
    hiddenTestcaseGroups: [
      { label: "contains zero", focus: "division-free logic matters" },
      { label: "multiple zeros", focus: "all outputs can become zero" },
    ],
    approach: [
      "Build prefix products from left to right.",
      "Build suffix products from right to left.",
      "Multiply prefix and suffix contributions for each index.",
    ],
    templates: [
      python(
        `n = int(input())
nums = list(map(int, input().split()))

# TODO: solve using prefix and suffix products
print(*([0] * n))
`,
        `n = int(input())
nums = list(map(int, input().split()))

answer = [1] * n
prefix = 1
for i in range(n):
    answer[i] = prefix
    prefix *= nums[i]

suffix = 1
for i in range(n - 1, -1, -1):
    answer[i] *= suffix
    suffix *= nums[i]

print(*answer)
`,
      ),
      cpp(
        `#include <bits/stdc++.h>
using namespace std;

int main() {
  int n;
  cin >> n;
  vector<long long> nums(n);
  for (int i = 0; i < n; i++) cin >> nums[i];

  // TODO: solve using prefix and suffix products
  for (int i = 0; i < n; i++) cout << 0 << (i + 1 == n ? '\\n' : ' ');
  return 0;
}
`,
        `#include <bits/stdc++.h>
using namespace std;

int main() {
  int n;
  cin >> n;
  vector<long long> nums(n), answer(n, 1);
  for (int i = 0; i < n; i++) cin >> nums[i];

  long long prefix = 1;
  for (int i = 0; i < n; i++) {
    answer[i] = prefix;
    prefix *= nums[i];
  }

  long long suffix = 1;
  for (int i = n - 1; i >= 0; i--) {
    answer[i] *= suffix;
    suffix *= nums[i];
  }

  for (int i = 0; i < n; i++) {
    cout << answer[i] << (i + 1 == n ? '\\n' : ' ');
  }
  return 0;
}
`,
      ),
    ],
    sampleTestcases: [
      { input: "4\n1 2 3 4\n", expectedOutput: "24 12 8 6\n", explanation: "Standard prefix/suffix example." },
      { input: "5\n2 3 4 5 6\n", expectedOutput: "360 240 180 144 120\n", explanation: "Works for larger products too." },
    ],
  },
  {
    id: "longest-unique-substring",
    title: "Longest Substring Without Repeating Characters",
    description:
      "Given a string, print the length of the longest substring with all unique characters.",
    difficulty: "medium",
    pattern: "Sliding Window",
    concepts: ["window", "last seen index", "string scanning"],
    companies: ["General FAANG", "Google", "Meta"],
    tracks: ["Blind 75", "NeetCode 150"],
    hiddenTestcaseGroups: [
      { label: "repeat inside window", focus: "left pointer must jump correctly" },
      { label: "all same character", focus: "window collapses to size 1" },
    ],
    approach: [
      "Use a sliding window with left and right pointers.",
      "Track the last index where each character appeared.",
      "If a character repeats inside the current window, move left just past the previous occurrence.",
      "Track the maximum window length.",
    ],
    templates: [
      python(
        `s = input().strip()

# TODO: solve using a sliding window
print(0)
`,
        `s = input().strip()

last = {}
left = 0
best = 0
for right, ch in enumerate(s):
    if ch in last and last[ch] >= left:
        left = last[ch] + 1
    last[ch] = right
    best = max(best, right - left + 1)
print(best)
`,
      ),
      cpp(
        `#include <bits/stdc++.h>
using namespace std;

int main() {
  string s;
  cin >> s;

  // TODO: solve using a sliding window
  cout << 0 << "\\n";
  return 0;
}
`,
        `#include <bits/stdc++.h>
using namespace std;

int main() {
  string s;
  cin >> s;

  unordered_map<char, int> last;
  int left = 0, best = 0;
  for (int right = 0; right < (int)s.size(); right++) {
    char ch = s[right];
    if (last.count(ch) && last[ch] >= left) {
      left = last[ch] + 1;
    }
    last[ch] = right;
    best = max(best, right - left + 1);
  }

  cout << best << "\\n";
  return 0;
}
`,
      ),
    ],
    sampleTestcases: [
      { input: "abcabcbb\n", expectedOutput: "3\n", explanation: "Longest unique substring is abc." },
      { input: "bbbbb\n", expectedOutput: "1\n", explanation: "Only one unique character at a time." },
    ],
  },
  {
    id: "top-k-frequent",
    title: "Top K Frequent Elements",
    description:
      "Given an array and k, print the k most frequent numbers in descending order of frequency. Break ties by smaller value first.",
    difficulty: "medium",
    pattern: "Hash Map + Sorting/Heap",
    concepts: ["frequency map", "sorting", "top k"],
    companies: ["General FAANG", "Amazon", "Google"],
    tracks: ["NeetCode 150"],
    hiddenTestcaseGroups: [
      { label: "tie breaking", focus: "stable ordering when counts match" },
      { label: "k equals number of unique values", focus: "return all candidates" },
    ],
    approach: [
      "Count frequencies with a hash map.",
      "Sort entries by frequency descending, then value ascending for ties.",
      "Take the first k elements.",
    ],
    templates: [
      python(
        `n, k = map(int, input().split())
nums = list(map(int, input().split()))

# TODO: count frequencies and return top k
print()
`,
        `from collections import Counter

n, k = map(int, input().split())
nums = list(map(int, input().split()))

freq = Counter(nums)
ordered = sorted(freq.items(), key=lambda item: (-item[1], item[0]))
answer = [value for value, _ in ordered[:k]]
print(*answer)
`,
      ),
      cpp(
        `#include <bits/stdc++.h>
using namespace std;

int main() {
  int n, k;
  cin >> n >> k;
  vector<int> nums(n);
  for (int i = 0; i < n; i++) cin >> nums[i];

  // TODO: count frequencies and return top k
  cout << "\\n";
  return 0;
}
`,
        `#include <bits/stdc++.h>
using namespace std;

int main() {
  int n, k;
  cin >> n >> k;
  vector<int> nums(n);
  for (int i = 0; i < n; i++) cin >> nums[i];

  unordered_map<int, int> freq;
  for (int num : nums) freq[num]++;

  vector<pair<int, int>> items;
  for (auto &[value, count] : freq) items.push_back({value, count});

  sort(items.begin(), items.end(), [](const auto &a, const auto &b) {
    if (a.second != b.second) return a.second > b.second;
    return a.first < b.first;
  });

  for (int i = 0; i < k; i++) {
    cout << items[i].first << (i + 1 == k ? '\\n' : ' ');
  }
  return 0;
}
`,
      ),
    ],
    sampleTestcases: [
      { input: "6 2\n1 1 1 2 2 3\n", expectedOutput: "1 2\n", explanation: "1 occurs three times, 2 occurs twice." },
      { input: "8 3\n4 4 4 5 5 6 6 6\n", expectedOutput: "4 6 5\n", explanation: "Tie is broken by smaller value first after frequency sort." },
    ],
  },
  {
    id: "merge-intervals",
    title: "Merge Intervals",
    description:
      "Given intervals, merge all overlapping ones and print the merged intervals in sorted order.",
    difficulty: "medium",
    pattern: "Sorting + Sweep",
    concepts: ["intervals", "sorting", "merging"],
    companies: ["General FAANG", "Meta", "Amazon"],
    tracks: ["Blind 75", "NeetCode 150"],
    hiddenTestcaseGroups: [
      { label: "touching intervals", focus: "decide if endpoints merge" },
      { label: "fully contained interval", focus: "outer interval should survive" },
    ],
    approach: [
      "Sort intervals by start time.",
      "Keep a result list with the current merged interval.",
      "If the next interval overlaps, extend the end.",
      "Otherwise, start a new merged interval.",
    ],
    templates: [
      python(
        `n = int(input())
intervals = [list(map(int, input().split())) for _ in range(n)]

# TODO: sort and merge intervals
`,
        `n = int(input())
intervals = [list(map(int, input().split())) for _ in range(n)]

intervals.sort()
merged = []
for start, end in intervals:
    if not merged or start > merged[-1][1]:
        merged.append([start, end])
    else:
        merged[-1][1] = max(merged[-1][1], end)

for start, end in merged:
    print(start, end)
`,
      ),
      cpp(
        `#include <bits/stdc++.h>
using namespace std;

int main() {
  int n;
  cin >> n;
  vector<pair<int, int>> intervals(n);
  for (int i = 0; i < n; i++) cin >> intervals[i].first >> intervals[i].second;

  // TODO: sort and merge intervals
  return 0;
}
`,
        `#include <bits/stdc++.h>
using namespace std;

int main() {
  int n;
  cin >> n;
  vector<pair<int, int>> intervals(n);
  for (int i = 0; i < n; i++) cin >> intervals[i].first >> intervals[i].second;

  sort(intervals.begin(), intervals.end());
  vector<pair<int, int>> merged;

  for (auto [start, end] : intervals) {
    if (merged.empty() || start > merged.back().second) {
      merged.push_back({start, end});
    } else {
      merged.back().second = max(merged.back().second, end);
    }
  }

  for (auto [start, end] : merged) {
    cout << start << " " << end << "\\n";
  }
  return 0;
}
`,
      ),
    ],
    sampleTestcases: [
      { input: "4\n1 3\n2 6\n8 10\n15 18\n", expectedOutput: "1 6\n8 10\n15 18\n", explanation: "First two intervals overlap." },
      { input: "2\n1 4\n4 5\n", expectedOutput: "1 5\n", explanation: "Touching intervals also merge here." },
    ],
  },
  {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    description:
      "You can climb 1 or 2 steps at a time. Given n, print the number of distinct ways to reach the top.",
    difficulty: "easy",
    pattern: "Dynamic Programming",
    concepts: ["fibonacci-style dp", "state transition"],
    companies: ["General FAANG", "Amazon", "Google"],
    tracks: ["Blind 75", "NeetCode 150"],
    hiddenTestcaseGroups: [
      { label: "small n", focus: "base cases n=1 and n=2" },
      { label: "larger n", focus: "iterative state update correctness" },
    ],
    approach: [
      "Let dp[i] be the number of ways to reach step i.",
      "Then dp[i] = dp[i-1] + dp[i-2] because the last move is either 1 or 2 steps.",
      "Compute iteratively with O(1) extra space.",
    ],
    templates: [
      python(
        `n = int(input())

# TODO: solve using iterative dynamic programming
print(0)
`,
        `n = int(input())

if n <= 2:
    print(n)
else:
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    print(b)
`,
      ),
      cpp(
        `#include <bits/stdc++.h>
using namespace std;

int main() {
  int n;
  cin >> n;

  // TODO: solve using iterative dynamic programming
  cout << 0 << "\\n";
  return 0;
}
`,
        `#include <bits/stdc++.h>
using namespace std;

int main() {
  int n;
  cin >> n;

  if (n <= 2) {
    cout << n << "\\n";
    return 0;
  }

  long long a = 1, b = 2;
  for (int i = 3; i <= n; i++) {
    long long c = a + b;
    a = b;
    b = c;
  }

  cout << b << "\\n";
  return 0;
}
`,
      ),
    ],
    sampleTestcases: [
      { input: "2\n", expectedOutput: "2\n", explanation: "1+1 or 2." },
      { input: "5\n", expectedOutput: "8\n", explanation: "Fibonacci-style recurrence." },
    ],
  },
  {
    id: "coin-change",
    title: "Coin Change Minimum Coins",
    description:
      "Given coin denominations and a target amount, print the minimum number of coins needed, or -1 if impossible.",
    difficulty: "medium",
    pattern: "Dynamic Programming",
    concepts: ["unbounded knapsack", "minimum transitions", "dp array"],
    companies: ["General FAANG", "Google", "Meta"],
    tracks: ["Blind 75", "NeetCode 150"],
    hiddenTestcaseGroups: [
      { label: "impossible amount", focus: "return -1 instead of a huge value" },
      { label: "greedy trap", focus: "DP beats local greedy choice" },
    ],
    approach: [
      "Use dp[x] = minimum coins needed for amount x.",
      "Initialize dp[0] = 0 and everything else to a large value.",
      "For each amount, try every coin and relax the state.",
      "If dp[target] never improves, return -1.",
    ],
    templates: [
      python(
        `n, amount = map(int, input().split())
coins = list(map(int, input().split()))

# TODO: solve using 1D dynamic programming
print(-1)
`,
        `n, amount = map(int, input().split())
coins = list(map(int, input().split()))

INF = 10**9
dp = [INF] * (amount + 1)
dp[0] = 0

for value in range(1, amount + 1):
    for coin in coins:
        if value - coin >= 0:
            dp[value] = min(dp[value], dp[value - coin] + 1)

print(dp[amount] if dp[amount] != INF else -1)
`,
      ),
      cpp(
        `#include <bits/stdc++.h>
using namespace std;

int main() {
  int n, amount;
  cin >> n >> amount;
  vector<int> coins(n);
  for (int i = 0; i < n; i++) cin >> coins[i];

  // TODO: solve using 1D dynamic programming
  cout << -1 << "\\n";
  return 0;
}
`,
        `#include <bits/stdc++.h>
using namespace std;

int main() {
  int n, amount;
  cin >> n >> amount;
  vector<int> coins(n);
  for (int i = 0; i < n; i++) cin >> coins[i];

  const int INF = 1e9;
  vector<int> dp(amount + 1, INF);
  dp[0] = 0;

  for (int value = 1; value <= amount; value++) {
    for (int coin : coins) {
      if (value - coin >= 0) {
        dp[value] = min(dp[value], dp[value - coin] + 1);
      }
    }
  }

  cout << (dp[amount] == INF ? -1 : dp[amount]) << "\\n";
  return 0;
}
`,
      ),
    ],
    sampleTestcases: [
      { input: "3 11\n1 2 5\n", expectedOutput: "3\n", explanation: "11 = 5 + 5 + 1." },
      { input: "1 3\n2\n", expectedOutput: "-1\n", explanation: "Impossible with only coin 2." },
    ],
  },
  {
    id: "longest-common-prefix",
    title: "Longest Common Prefix",
    description:
      "Given n strings, print their longest common prefix. Print an empty line if none exists.",
    difficulty: "easy",
    pattern: "String Scanning",
    concepts: ["prefix comparison", "sorting or pairwise trimming"],
    companies: ["General FAANG", "Amazon"],
    tracks: ["NeetCode 150"],
    hiddenTestcaseGroups: [
      { label: "empty prefix", focus: "return blank line when nothing matches" },
      { label: "one string", focus: "entire word is the prefix" },
    ],
    approach: [
      "Start with the first string as the current prefix.",
      "Compare it with each next string and trim until it matches.",
      "If it becomes empty, stop early.",
    ],
    templates: [
      python(
        `n = int(input())
words = [input().strip() for _ in range(n)]

# TODO: trim prefix against each word
print("")
`,
        `n = int(input())
words = [input().strip() for _ in range(n)]

prefix = words[0]
for word in words[1:]:
    while not word.startswith(prefix):
        prefix = prefix[:-1]
        if not prefix:
            break
    if not prefix:
        break

print(prefix)
`,
      ),
      cpp(
        `#include <bits/stdc++.h>
using namespace std;

int main() {
  int n;
  cin >> n;
  vector<string> words(n);
  for (int i = 0; i < n; i++) cin >> words[i];

  // TODO: trim prefix against each word
  cout << "" << "\\n";
  return 0;
}
`,
        `#include <bits/stdc++.h>
using namespace std;

int main() {
  int n;
  cin >> n;
  vector<string> words(n);
  for (int i = 0; i < n; i++) cin >> words[i];

  string prefix = words[0];
  for (int i = 1; i < n; i++) {
    while (words[i].find(prefix) != 0) {
      prefix.pop_back();
      if (prefix.empty()) break;
    }
    if (prefix.empty()) break;
  }

  cout << prefix << "\\n";
  return 0;
}
`,
      ),
    ],
    sampleTestcases: [
      { input: "3\nflower\nflow\nflight\n", expectedOutput: "fl\n", explanation: "Common prefix is fl." },
      { input: "2\ndog\nracecar\n", expectedOutput: "\n", explanation: "No common prefix exists." },
    ],
  },
  {
    id: "search-rotated-array",
    title: "Search in Rotated Sorted Array",
    description:
      "Given a rotated sorted array with distinct values and a target, print its index or -1.",
    difficulty: "medium",
    pattern: "Modified Binary Search",
    concepts: ["rotation", "sorted half", "decision logic"],
    companies: ["General FAANG", "Amazon", "Meta"],
    tracks: ["Blind 75", "NeetCode 150"],
    hiddenTestcaseGroups: [
      { label: "target in rotated half", focus: "choose correct sorted side" },
      { label: "target absent", focus: "binary search termination" },
    ],
    approach: [
      "Binary search still works because one half is always sorted.",
      "At each step, decide whether the left half or right half is sorted.",
      "Check whether the target lies inside the sorted half and move accordingly.",
    ],
    templates: [
      python(
        `n, target = map(int, input().split())
nums = list(map(int, input().split()))

# TODO: solve using modified binary search
print(-1)
`,
        `n, target = map(int, input().split())
nums = list(map(int, input().split()))

left, right = 0, n - 1
while left <= right:
    mid = (left + right) // 2
    if nums[mid] == target:
        print(mid)
        break

    if nums[left] <= nums[mid]:
        if nums[left] <= target < nums[mid]:
            right = mid - 1
        else:
            left = mid + 1
    else:
        if nums[mid] < target <= nums[right]:
            left = mid + 1
        else:
            right = mid - 1
else:
    print(-1)
`,
      ),
      cpp(
        `#include <bits/stdc++.h>
using namespace std;

int main() {
  int n, target;
  cin >> n >> target;
  vector<int> nums(n);
  for (int i = 0; i < n; i++) cin >> nums[i];

  // TODO: solve using modified binary search
  cout << -1 << "\\n";
  return 0;
}
`,
        `#include <bits/stdc++.h>
using namespace std;

int main() {
  int n, target;
  cin >> n >> target;
  vector<int> nums(n);
  for (int i = 0; i < n; i++) cin >> nums[i];

  int left = 0, right = n - 1;
  while (left <= right) {
    int mid = left + (right - left) / 2;
    if (nums[mid] == target) {
      cout << mid << "\\n";
      return 0;
    }

    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) right = mid - 1;
      else left = mid + 1;
    } else {
      if (nums[mid] < target && target <= nums[right]) left = mid + 1;
      else right = mid - 1;
    }
  }

  cout << -1 << "\\n";
  return 0;
}
`,
      ),
    ],
    sampleTestcases: [
      { input: "7 0\n4 5 6 7 0 1 2\n", expectedOutput: "4\n", explanation: "Target is in the rotated half." },
      { input: "7 3\n4 5 6 7 0 1 2\n", expectedOutput: "-1\n", explanation: "Target is absent." },
    ],
  },
  {
    id: "number-of-islands",
    title: "Number of Islands",
    description:
      "Given a grid of 0s and 1s, print how many connected groups of 1s exist using 4-directional adjacency.",
    difficulty: "medium",
    pattern: "DFS / BFS on Grid",
    concepts: ["graph traversal", "grid", "visited marking"],
    companies: ["General FAANG", "Amazon", "Google", "Meta"],
    tracks: ["Blind 75", "NeetCode 150"],
    hiddenTestcaseGroups: [
      { label: "single large island", focus: "full traversal without recounting" },
      { label: "many tiny islands", focus: "restart traversal correctly" },
    ],
    approach: [
      "Scan every cell in the grid.",
      "When you find an unvisited land cell, start DFS or BFS from it.",
      "Mark the entire component visited.",
      "Increment the island count each time you start a new traversal.",
    ],
    templates: [
      python(
        `rows, cols = map(int, input().split())
grid = [input().strip().split() for _ in range(rows)]

# TODO: solve using DFS or BFS
print(0)
`,
        `rows, cols = map(int, input().split())
grid = [input().strip().split() for _ in range(rows)]

def dfs(r, c):
    if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != "1":
        return
    grid[r][c] = "0"
    dfs(r + 1, c)
    dfs(r - 1, c)
    dfs(r, c + 1)
    dfs(r, c - 1)

count = 0
for r in range(rows):
    for c in range(cols):
        if grid[r][c] == "1":
            count += 1
            dfs(r, c)

print(count)
`,
      ),
      cpp(
        `#include <bits/stdc++.h>
using namespace std;

int main() {
  int rows, cols;
  cin >> rows >> cols;
  vector<vector<string>> grid(rows, vector<string>(cols));
  for (int r = 0; r < rows; r++) {
    for (int c = 0; c < cols; c++) cin >> grid[r][c];
  }

  // TODO: solve using DFS or BFS
  cout << 0 << "\\n";
  return 0;
}
`,
        `#include <bits/stdc++.h>
using namespace std;

int rows, cols;
vector<vector<string>> grid;

void dfs(int r, int c) {
  if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] != "1") return;
  grid[r][c] = "0";
  dfs(r + 1, c);
  dfs(r - 1, c);
  dfs(r, c + 1);
  dfs(r, c - 1);
}

int main() {
  cin >> rows >> cols;
  grid.assign(rows, vector<string>(cols));
  for (int r = 0; r < rows; r++) {
    for (int c = 0; c < cols; c++) cin >> grid[r][c];
  }

  int count = 0;
  for (int r = 0; r < rows; r++) {
    for (int c = 0; c < cols; c++) {
      if (grid[r][c] == "1") {
        count++;
        dfs(r, c);
      }
    }
  }

  cout << count << "\\n";
  return 0;
}
`,
      ),
    ],
    sampleTestcases: [
      { input: "4 5\n1 1 0 0 0\n1 1 0 0 0\n0 0 1 0 0\n0 0 0 1 1\n", expectedOutput: "3\n", explanation: "There are three connected components of land." },
      { input: "2 2\n1 1\n1 1\n", expectedOutput: "1\n", explanation: "All land cells are connected." },
    ],
  },
  {
    id: "kth-largest-element",
    title: "Kth Largest Element",
    description:
      "Given an array and k, print the k-th largest element.",
    difficulty: "medium",
    pattern: "Heap / Sorting",
    concepts: ["heap", "selection", "sorting"],
    companies: ["General FAANG", "Amazon", "Google"],
    tracks: ["Blind 75", "NeetCode 150"],
    hiddenTestcaseGroups: [
      { label: "duplicates", focus: "ranking with repeated values" },
      { label: "k equals array size", focus: "smallest element becomes answer" },
    ],
    approach: [
      "Use a min-heap of size k or sort descending.",
      "For interview clarity, either solution is acceptable unless optimality is stressed.",
      "With a heap, keep only the k largest elements seen so far.",
    ],
    templates: [
      python(
        `n, k = map(int, input().split())
nums = list(map(int, input().split()))

# TODO: solve using a heap or sorting
print(0)
`,
        `import heapq

n, k = map(int, input().split())
nums = list(map(int, input().split()))

heap = []
for num in nums:
    heapq.heappush(heap, num)
    if len(heap) > k:
        heapq.heappop(heap)

print(heap[0])
`,
      ),
      cpp(
        `#include <bits/stdc++.h>
using namespace std;

int main() {
  int n, k;
  cin >> n >> k;
  vector<int> nums(n);
  for (int i = 0; i < n; i++) cin >> nums[i];

  // TODO: solve using a min-heap or sorting
  cout << 0 << "\\n";
  return 0;
}
`,
        `#include <bits/stdc++.h>
using namespace std;

int main() {
  int n, k;
  cin >> n >> k;
  vector<int> nums(n);
  for (int i = 0; i < n; i++) cin >> nums[i];

  priority_queue<int, vector<int>, greater<int>> pq;
  for (int num : nums) {
    pq.push(num);
    if ((int)pq.size() > k) pq.pop();
  }

  cout << pq.top() << "\\n";
  return 0;
}
`,
      ),
    ],
    sampleTestcases: [
      { input: "6 2\n3 2 1 5 6 4\n", expectedOutput: "5\n", explanation: "Second largest is 5." },
      { input: "9 4\n3 2 3 1 2 4 5 5 6\n", expectedOutput: "4\n", explanation: "Fourth largest is 4." },
    ],
  },
];

export function getTemplate(problemId: string, language: SupportedCodingLanguage) {
  const problem = codingProblems.find((item) => item.id === problemId);
  return problem?.templates.find((template) => template.language === language) ?? null;
}
