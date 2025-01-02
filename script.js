// Update total problem count
function updateProblemCount() {
    const rows = document.querySelectorAll('#solutions-table tbody tr');
    document.getElementById('problem-count').innerText = rows.length;
  }
  
  function filterTable() {
    const searchInput = document.getElementById('search-box').value.toLowerCase();
    const difficultyFilter = document.getElementById('difficulty-filter').value;
    const rows = document.querySelectorAll('#solutions-table tbody tr');
    let visibleCount = 0;
  
    rows.forEach(row => {
      const text = row.innerText.toLowerCase();
      const difficulty = row.cells[3].innerText; // Difficulty column
  
      // Check if the row matches both filters
      const matchesSearch = text.includes(searchInput);
      const matchesDifficulty =
        difficultyFilter === 'All' || difficulty === difficultyFilter;
  
      if (matchesSearch && matchesDifficulty) {
        row.style.display = '';
        visibleCount++;
      } else {
        row.style.display = 'none';
      }
    });
  
    // Update the total problem count
    document.getElementById('problem-count').innerText = visibleCount;
  }
  
  
  // Sort the table by difficulty
  function sortTableByDifficulty() {
    const table = document.getElementById('solutions-table');
    const rows = Array.from(table.tBodies[0].rows);
  
    rows.sort((a, b) => {
      const difficultyA = a.cells[3].innerText; // Difficulty column
      const difficultyB = b.cells[3].innerText;
      const order = { Easy: 1, Medium: 2, Hard: 3 }; // Sorting order
      return order[difficultyA] - order[difficultyB];
    });
  
    rows.forEach(row => table.tBodies[0].appendChild(row)); // Re-add sorted rows
  }

// Fetch data and populate the table
async function fetchAndPopulateSolutions() {
    const response = await fetch('contents/solutions.json');
    const solutions = await response.json();
    const tbody = document.getElementById('solutions-body');
    tbody.innerHTML = ''; // Clear existing content
  
    solutions.forEach(solution => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${solution.problem}</td>
        <td><a href="${solution.solutionLink}" target="_blank">View Solution</a></td>
        <td>${solution.runtime}</td>
        <td style="color: ${
          solution.difficulty === 'Easy' ? 'lightseagreen' : 
          solution.difficulty === 'Medium' ? 'darkorange' : 
          'crimson'
        }">${solution.difficulty}</td>
        <td>${solution.tags.join(', ')}</td>
      `;
      tbody.appendChild(row);
    });
  
    updateProblemCount();
  }
  
  // Initialize the page
  document.addEventListener('DOMContentLoaded', () => {
    fetchAndPopulateSolutions();
});
  
  