import React from 'react';
import "./about.css"

const About = () => {
  return (
    <section className='grid'>
      
    <div className="container project-explanation">
      <h1>Responsive Restaurant Web App</h1>

      <section>
        <h2>1. Project Overview</h2>
        <p>
          The <strong>Responsive Restaurant Web App</strong> is designed to provide users with an efficient platform for ordering food and booking tables, built entirely with <strong>HTML, CSS, JavaScript, and React</strong>. The application leverages <strong>frontend technologies</strong> and <strong>local storage</strong> to manage user data, creating a seamless experience without relying on a backend server.
        </p>
      </section>

      <section>
        <h2>2. Technology Stack</h2>
        <ul>
          <li><strong>HTML/CSS</strong>: Used for structuring and styling the application.</li>
          <li><strong>JavaScript</strong>: Enables dynamic content updates and interactivity.</li>
          <li><strong>React</strong>: Manages the application state and provides a component-based architecture.</li>
          <li><strong>Local Storage</strong>: Facilitates persistent data storage across sessions.</li>
        </ul>
      </section>

      <section>
        <h2>3. Architecture</h2>
        <p>
          The architecture of the web app follows a component-based structure typical of React applications. Each feature is encapsulated within reusable components:
        </p>
        <ul>
          <li><strong>Header Component</strong>: Contains the Logo and navigation bar.</li>
          <li><strong>Hero Section Component</strong>: Displays promotional content and call-to-action buttons.</li>
          <li><strong>Fast Food Showcase Component</strong>: Highlights popular fast food and slide using arrow functionality.</li>
          <li><strong>Most Served Items Component</strong>: Shows dynamically changing menu items on page reload.</li>
          <li><strong>Cart Component</strong>: Manages the user's selected items, quantities, and subtotal calculations.</li>
          <li><strong>Booking Component</strong>: Handles table reservation.</li>
          <li><strong>Food menu Component</strong>: Show menu items.</li>
          <li><strong>Footer Component</strong>: Contains Logo, Share, quick links  and developer contact information.</li>
        </ul>
      </section>

      <section>
        <h2>4. Key Features</h2>
        <ul>
          <li><strong>Responsive Design</strong>: The layout adapts to various screen sizes using CSS media queries and React's responsive design principles, ensuring usability on desktops, tablets, and mobile devices.</li>
          <li><strong>Food Ordering System</strong>: Users can select items from the menu, manage their cart, and proceed to checkout. The cart functionality includes:
            <ul>
              <li>Adding/removing items.</li>
              <li>Adjusting quantities.</li>
              <li>Viewing the subtotal dynamically.</li>
            </ul>
          </li>
          <li><strong>Table Booking System</strong>: Users can reserve tables by selecting a time slot, entering contact details, and confirming their booking with OTP verification.</li>
          <li><strong>User Authentication</strong>: While not backed by a database, the application includes form validation for sign-up and login processes, ensuring data integrity.</li>
          <li><strong>Local Storage</strong>: User data, including cart items and bookings, are stored in the browser's local storage, allowing for a persistent experience.</li>
          <li><strong>Dark Mode Toggle</strong>: A user-friendly toggle to switch between light and dark themes.</li>
        </ul>
      </section>

      <section>
        <h2>5. Development Process</h2>
        <p>
          I built each feature as a separate component, making it easy to maintain and update. This modular approach enhances reusability and readability.
        </p>
        <ul>
          <li>
        <h3>GitHub Integration</h3>
      <p>
        Throughout the development of this project, I utilized <strong>GitHub</strong> for version control and collaboration. The code repository is hosted on GitHub, which allowed me to manage changes efficiently and maintain the integrity of the project.
      </p>
          </li>
        </ul>
      </section>

      <section>
        <h2>6. Challenges and Solutions</h2>
        <p>
          Without a backend, managing dynamic data like the "Most Served" items required creative use of JavaScript's built-in capabilities. I implemented a randomization function to select different items on each reload. Implementing real-time validation for user input in forms was challenging but essential. I used JavaScript functions to ensure users received immediate feedback on their input, enhancing the user experience.
        </p>
      </section>

      <section>
        <h2>7. Conclusion</h2>
        <p>
          The <strong>Responsive Restaurant Web App</strong> showcases my ability to build a full-featured application using modern frontend technologies without a backend. By focusing on a robust user experience and employing best practices in web development, this project serves as a testament to my skills in creating engaging, efficient, and visually appealing web applications.
        </p>
      </section>
      <section>
        <h2>Thank You!</h2>
        <p>
          Thank you for taking the time to read about my project! I appreciate your interest and look forward to any questions you may have.
        </p>
      </section>
    </div>
    </section>
  );
};

export default About;
