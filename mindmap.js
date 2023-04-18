const allMindMapNodes = {
    "List":[
       "Interface which requires to preserve elements order",
       "Collection interface which allows duplicates",
       "Collection interface which allows elements access by index"
    ],
    "ArrayList":[
       "Collection implementing dynamically increased array",
       "Resizable array",
       "Efficient random access by index",
       "Less efficient insertions and deletions in the middle"
    ],
    "LinkedList":[
       "Collection implementing doubly-linked list",
       "List implementation with efficient insertions and deletions",
       "Inefficient random access by index",
       "Efficient for insertion element at certain position",
       "Efficient for deleting element at certain position"
    ],
    "Set":[
       "Collection interface which doesn't preserve order of elements",
       "Interface for collection with only unique elements"
    ],
    "HashSet":[
       "Uses hash table for elements",
       "Set with constant time performance",
       "Set which requires well-designed hash function",
       "Set with fast add, remove, and search operations"
    ],
    "TreeSet":[
       "Set implementation using red-black tree",
       "Set implementation with ordered elements",
       "Elements of this collection must implement Comparable",
       "Set implementation with sorted output",
       "Set implementation with logarithmic efficiency of search element"
    ],
    "LinkedHashSet":[
       "Set which preserves insertion order",
       "Performance of HashSet but keeps order of elements"
    ],
    "Queue":[
       "Holds elements prior to processing",
       "Used for multi-threaded processing",
       "Strict FIFO order",
       "Useful for scheduling tasks"
    ],
    "Deque":[
       "Double-ended queue",
       "Queue with insertion and removal at both ends",
       "Supports both FIFO and LIFO access"
    ],
    "Map":[
       "Interface with key-value pairs",
       "Interface with unique keys",
       "Interface not inherited from Collection"
    ],
    "HashMap":[
       "Map with constant time performance",
       "Map which requires equals() and hashCode() for custom classes",
       "Key-value storage with undefined order"
    ],
    "TreeMap":[
       "Key-value pairs sorted by key values",
       "Sorts keys using natural order or a provided comparator",
       "Slower than HashMap but provides sorted output"
    ],
    "LinkedHashMap":[
       "Preserves key-value pairs order",
       "Combines features of HashMap and linked list",
       "Maintains insertion order of key-value pairs"
    ]
 };

let openedMindMapNodes = allMindMapNodes;
let taskNodes = Object.entries(allMindMapNodes).flatMap(n=>n[1]);
// const taskNodes  = [
//   "Collection interface which allows duplicates",
//   "Resizable array",
//   "Strict FIFO order",
//   "Useful for scheduling tasks",
//   "Double-ended queue",
//   "Interface with key-value pairs",
//   "Interface with unique keys",
// ]
