// Example: Summarizing a book

// 1️⃣ Messy / vague prompt
const vaguePrompt = "Summarize 'The Hobbit'";
const messyOutput = `
The Hobbit is a book about a hobbit named Bilbo. He goes on an adventure with dwarves. 
There are dragons, some fights, lots of things happen. Bilbo changes and grows. It's a classic story.`;

console.log("Messy Output:\n", messyOutput);

// 2️⃣ Clear / structured prompt
const clearPrompt =
  "Summarize 'The Hobbit' in 3 bullet points highlighting main characters, plot, and key events.";
const structuredOutput = [
  "Bilbo Baggins, a hobbit, joins Thorin and his company of dwarves on a quest to reclaim their homeland.",
  "The group encounters trolls, goblins, spiders, and the dragon Smaug along their journey.",
  "Bilbo grows braver and wiser, ultimately playing a crucial role in the success of the quest.",
];

console.log("Structured Output:\n- " + structuredOutput.join("\n- "));

// =======================================
// Example: Messy vs Structured AI Code Output
// =======================================

// 1️⃣ Messy / vague prompt
const vaguePromptCode = "Write a function that sorts an array";
const messyCodeOutput = `
// This is a function that sorts an array but it's messy
function sortArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        let temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
      }
    }
  }
  console.log(arr);
  return arr;
}
`;

console.log("=== Messy Code Output ===");
console.log(messyCodeOutput);

// 2️⃣ Clear / structured prompt
const clearPromptCode =
  "Write a clean JavaScript function 'sortArray' that takes an array of numbers and returns a new sorted array in ascending order using built-in methods, with comments explaining each step.";
const structuredCodeOutput = `
// Clean and structured sortArray function
function sortArray(arr) {
  // Create a copy of the array to avoid mutating the original
  const newArr = [...arr];
  
  // Use the built-in sort method to sort numbers in ascending order
  newArr.sort((a, b) => a - b);
  
  // Return the sorted array
  return newArr;
}

// Example usage:
const numbers = [5, 2, 9, 1];
console.log(sortArray(numbers)); // Output: [1, 2, 5, 9]
`;

console.log("=== Structured Code Output ===");
console.log(structuredCodeOutput);

const test = `The History and Impact of the Printing Press

The invention of the printing press in the mid-15th century is widely regarded as one of the most transformative events in human history. Prior to this technological breakthrough, books were painstakingly copied by hand, usually by monks in monasteries, a process that was both time-consuming and expensive. As a result, literacy and access to written knowledge were largely confined to the elite and the clergy. The arrival of the printing press, however, fundamentally changed this dynamic by making the mass production of books possible for the first time.

Johannes Gutenberg, a German inventor, is credited with developing the first movable-type printing press around 1440. His design allowed individual letters to be rearranged and reused, significantly speeding up the printing process. The first major book printed using this method was the Gutenberg Bible, which appeared in the 1450s. The success of the printing press rapidly spread across Europe, leading to a dramatic increase in the production of books and other printed materials. This proliferation of printed texts facilitated the dissemination of knowledge, ideas, and culture on an unprecedented scale.

One of the most significant consequences of the printing press was its role in the spread of literacy. As books became more affordable and widely available, ordinary people gained greater access to education and information. This democratization of knowledge contributed to the intellectual movements of the Renaissance, which emphasized humanism, scientific inquiry, and artistic achievement. Scholars and thinkers could now share their ideas more easily, and debates and discussions could take place across regions and even countries.

The printing press also played a crucial role in religious reform. The Protestant Reformation, initiated by figures such as Martin Luther in the early 16th century, relied heavily on the ability to mass-produce pamphlets, tracts, and translated Bibles. Ideas that might have remained localized were suddenly able to reach a much broader audience, challenging established religious authorities and reshaping the spiritual landscape of Europe.

Beyond literacy and religion, the printing press had profound economic, social, and political impacts. It facilitated the growth of newspapers and journals, laying the foundation for modern journalism and the public sphere. By enabling the distribution of scientific and technical knowledge, it accelerated technological progress and innovation. Politically, the press empowered citizens by providing information about government policies, legal matters, and public affairs, ultimately fostering a more informed and engaged populace.

However, the printing press also had unintended consequences. The rapid spread of information sometimes led to the dissemination of false or misleading ideas, contributing to social unrest and political instability. Authorities often attempted to control printed material through censorship, highlighting the tension between access to knowledge and societal control. Despite these challenges, the overall impact of the printing press remains overwhelmingly positive, as it laid the groundwork for the modern knowledge-based society.

In summary, the invention of the printing press marked a turning point in human history. By making written knowledge accessible to a wider audience, it transformed education, religion, science, and politics. Its legacy continues to influence the way we communicate, learn, and share ideas today, underscoring the profound and lasting power of technological innovation in shaping human civilization.`;
