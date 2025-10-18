class RandomNameGenerator {
    constructor() {
        this.nameElement = document.getElementById('randomName');
        this.generateBtn = document.getElementById('generateBtn');
        this.refreshBtn = document.getElementById('refreshBtn');
        
        this.init();
    }
    
    init() {
        // Load initial random name
        this.getRandomName();
        
        // Event listeners
        this.generateBtn.addEventListener('click', () => {
            this.getRandomName();
        });
        
        this.refreshBtn.addEventListener('click', () => {
            location.reload();
        });
        
        // Also generate new name when page loads/refreshes
        window.addEventListener('load', () => {
            this.getRandomName();
        });
    }
    
    async getRandomName() {
        try {
            // Show loading state
            this.nameElement.innerHTML = '<span class="loading-text">Generating...</span>';
            
            const response = await fetch('/api/random-name');
            const data = await response.json();
            
            // Display the random name with animation
            this.displayName(data.name);
            
        } catch (error) {
            console.error('Error fetching random name:', error);
            this.nameElement.innerHTML = '<span style="color: #ff6b6b;">Error loading name</span>';
        }
    }
    
    displayName(name) {
        this.nameElement.innerHTML = name;
        this.nameElement.classList.remove('fade-in');
        
        // Trigger reflow for animation
        void this.nameElement.offsetWidth;
        
        this.nameElement.classList.add('fade-in');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RandomNameGenerator();
});