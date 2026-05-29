// Riddle bank for the portfolio lock screen.
// Categories: Math, Logical & Analytical Reasoning, DBMS, OS, Networks, DSA, AI/ML.
// Each riddle: { q: question, a: [acceptable answers, lowercase], hint: optional }.
// Answers are matched case-insensitively after trimming and collapsing inner whitespace.

window.RIDDLE_BANK = {
  "Math": [
    { q: "I am a two-digit number. The product of my digits is 18 and their sum is 9. What am I (the smaller one)?", a: ["36"], hint: "3 x 6 = 18, 3 + 6 = 9" },
    { q: "What is the only number that is twice the sum of its digits? (it is a two-digit number)", a: ["18"], hint: "1 + 8 = 9, and 9 x 2 = 18" },
    { q: "If you multiply me by any other number, the answer always stays the same. What number am I?", a: ["0", "zero"], hint: "Anything times me is itself... only one fits." },
    { q: "What is the next number in the sequence: 1, 1, 2, 3, 5, 8, 13, ... ?", a: ["21"], hint: "Each term is the sum of the previous two (Fibonacci)." },
    { q: "I am a prime number between 20 and 30 whose digits add up to 5. What am I?", a: ["23"], hint: "Prime, and 2 + 3 = 5." },
    { q: "What is the value of 7 factorial (7!) ?", a: ["5040"], hint: "7 x 6 x 5 x 4 x 3 x 2 x 1" },
    { q: "How many degrees are there in the interior angles of a triangle, summed together?", a: ["180", "180 degrees"], hint: "Always the same for any triangle." }
  ],

  "Logical & Analytical Reasoning": [
    { q: "A man looks at a portrait. 'Brothers and sisters I have none, but this man's father is my father's son.' Who is in the portrait? (one word)", a: ["son", "his son"], hint: "'My father's son' is the man himself." },
    { q: "Two fathers and two sons go fishing. They catch 3 fish, and each takes home exactly one. How is this possible? (answer: how many people?)", a: ["3", "three"], hint: "Grandfather, father, son." },
    { q: "If all Bloops are Razzies and all Razzies are Lazzies, are all Bloops definitely Lazzies? (yes/no)", a: ["yes"], hint: "Transitivity." },
    { q: "I am an odd number. Take away one letter and I become even. What number am I? (word)", a: ["seven"], hint: "Remove the 's'." },
    { q: "Which weighs more: a kilogram of feathers or a kilogram of steel? (answer: same / feathers / steel)", a: ["same", "neither", "equal"], hint: "A kilogram is a kilogram." },
    { q: "A clock shows 3:15. What is the smaller angle (in degrees) between the hour and minute hands?", a: ["7.5", "7.5 degrees"], hint: "The hour hand has moved a quarter past 3." },
    { q: "If it takes 5 machines 5 minutes to make 5 widgets, how many minutes for 100 machines to make 100 widgets?", a: ["5", "five"], hint: "Each machine makes one widget in 5 minutes." }
  ],

  "DBMS": [
    { q: "Which SQL keyword removes duplicate rows from a result set?", a: ["distinct"], hint: "SELECT ___ column FROM ..." },
    { q: "What do we call a column (or set of columns) that uniquely identifies each row in a table?", a: ["primary key", "primary-key", "primarykey"], hint: "It cannot be NULL and must be unique." },
    { q: "What is the process of organizing tables to reduce redundancy called?", a: ["normalization"], hint: "1NF, 2NF, 3NF, BCNF..." },
    { q: "Which SQL clause is used to filter groups created by GROUP BY?", a: ["having"], hint: "WHERE filters rows, ___ filters groups." },
    { q: "ACID stands for Atomicity, Consistency, Isolation, and what? (one word)", a: ["durability"], hint: "Committed data survives crashes." },
    { q: "Which type of JOIN returns only rows with matching keys in both tables?", a: ["inner join", "inner", "inner-join"], hint: "The default JOIN." },
    { q: "What command in SQL is used to permanently save a transaction?", a: ["commit"], hint: "Opposite of ROLLBACK." }
  ],

  "OS": [
    { q: "What is a lightweight unit of execution within a process called?", a: ["thread"], hint: "A process can have many of these." },
    { q: "What scheduling algorithm always picks the job with the shortest next CPU burst?", a: ["sjf", "shortest job first", "shortest-job-first"], hint: "S_F" },
    { q: "What do we call the situation where two processes wait forever for each other's resources?", a: ["deadlock"], hint: "Coffman conditions describe it." },
    { q: "Which hardware component translates virtual addresses to physical addresses?", a: ["mmu", "memory management unit"], hint: "M_U" },
    { q: "What is the fixed-size block of virtual memory called?", a: ["page"], hint: "Physical memory is divided into frames; virtual memory into ___." },
    { q: "What do we call a critical-section protection variable that can be used to signal between processes? (one word)", a: ["semaphore"], hint: "Dijkstra invented it; uses wait() and signal()." },
    { q: "What is it called when the OS swaps pages so frequently that little real work gets done?", a: ["thrashing"], hint: "Too many page faults." }
  ],

  "Networks": [
    { q: "How many layers are there in the OSI reference model?", a: ["7", "seven"], hint: "Please Do Not Throw Sausage Pizza Away." },
    { q: "Which protocol translates human-readable domain names into IP addresses?", a: ["dns", "domain name system"], hint: "___ resolves google.com to an IP." },
    { q: "What does the 'S' stand for in HTTPS? (one word)", a: ["secure"], hint: "HTTP over TLS/SSL." },
    { q: "Which connection-oriented transport protocol guarantees reliable, ordered delivery?", a: ["tcp", "transmission control protocol"], hint: "The opposite of UDP." },
    { q: "What is the loopback IPv4 address commonly used to refer to localhost?", a: ["127.0.0.1"], hint: "Also known as localhost." },
    { q: "Which device operates at Layer 2 and forwards frames using MAC addresses?", a: ["switch"], hint: "A router works at Layer 3; this works at Layer 2." },
    { q: "What is the default port number for HTTP?", a: ["80"], hint: "HTTPS uses 443." }
  ],

  "DSA": [
    { q: "What is the worst-case time complexity of binary search? (use 'log n')", a: ["o(log n)", "log n", "logn", "o(logn)"], hint: "It halves the search space each step." },
    { q: "Which data structure follows Last-In-First-Out (LIFO) ordering?", a: ["stack"], hint: "Push and pop." },
    { q: "Which data structure follows First-In-First-Out (FIFO) ordering?", a: ["queue"], hint: "Enqueue and dequeue." },
    { q: "What is the average time complexity to look up a key in a hash table? (use big-O)", a: ["o(1)", "1", "constant", "o(1) constant"], hint: "Constant time." },
    { q: "Which tree traversal visits nodes in the order root, left, right?", a: ["preorder", "pre order", "pre-order"], hint: "Root comes first." },
    { q: "What sorting algorithm repeatedly partitions around a pivot element?", a: ["quicksort", "quick sort"], hint: "Average O(n log n), worst O(n^2)." },
    { q: "What is the data structure that uses nodes connected by pointers, with each node pointing to the next?", a: ["linked list", "linkedlist", "linked-list"], hint: "Singly or doubly." }
  ],

  "AI/ML": [
    { q: "What do we call the algorithm that minimizes a loss function by moving in the direction of steepest descent?", a: ["gradient descent", "gradient-descent"], hint: "Uses the negative gradient." },
    { q: "What is the problem called when a model performs great on training data but poorly on unseen data?", a: ["overfitting"], hint: "Opposite of underfitting." },
    { q: "Which activation function outputs max(0, x)?", a: ["relu", "rectified linear unit"], hint: "Rectified Linear Unit." },
    { q: "What do we call the smallest computational unit of a neural network, inspired by the brain?", a: ["neuron", "perceptron"], hint: "A single one is a perceptron." },
    { q: "What type of learning uses labeled data to train a model?", a: ["supervised", "supervised learning"], hint: "Opposite of unsupervised." },
    { q: "Which technique randomly drops units during training to reduce overfitting?", a: ["dropout"], hint: "A regularization method." },
    { q: "What is the matrix called that summarizes correct vs. incorrect classification counts?", a: ["confusion matrix", "confusion-matrix"], hint: "TP, FP, TN, FN." }
  ]
};

// Returns a flat array of {category, q, a, hint} across all categories.
window.allRiddles = function () {
  const out = [];
  Object.keys(window.RIDDLE_BANK).forEach(function (cat) {
    window.RIDDLE_BANK[cat].forEach(function (r) {
      out.push({ category: cat, q: r.q, a: r.a, hint: r.hint || "" });
    });
  });
  return out;
};

// Picks a uniformly random riddle from the whole bank.
window.pickRandomRiddle = function () {
  const all = window.allRiddles();
  const idx = Math.floor(Math.random() * all.length);
  return all[idx];
};

// Normalizes an answer string for comparison.
window.normalizeAnswer = function (s) {
  return String(s || "").trim().toLowerCase().replace(/\s+/g, " ");
};
