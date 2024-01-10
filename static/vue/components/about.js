const About =  Vue.component('about', {
    template: `<div>
    <h1>Jonnalagadda Sai Satyanarayana</h1>
    <p> 8008757469 | <a href= "mailto:saisatya161734@gmail.com">saisatya161734@gmail.com</a>  | <a href="https://saisatya16.github.io/">saisatya16.github.io/</a> |  <a href="https://github.com/SaiSatya16">github.com/SaiSatya16</a> | <a href="https://www.linkedin.com/in/sai-satya-jonnalagadda-157900225/">linkedin.com/in/sai-satya-jonnalagadda-157900225/</a></p>
  
    <h2>Education</h2>
    <table>
      <tr>
        <th>Year</th>
        <th>Degree</th>
        <th>Institution</th>
      </tr>
      <tr>
        <td>Expected 2025</td>
        <td>B.Tech. in Computer Science and Engineering - 9.09/10</td>
        <td>SRM Institute of Science and Technology, Chennai, India</td>
      </tr>
      <tr>
        <td>Sep 2021 - Present</td>
        <td>BS in Data Science and Applications (Online Degree)</td>
        <td>Indian Institute of Technology, Madras, Chennai, India</td>
      </tr>
      <tr>
        <td>June 2019 - Mar 2021</td>
        <td>Class XII - 976/1000</td>
        <td>Narayana JR. College, Hyderabad, India</td>
      </tr>
      <tr>
        <td>June 2018 - Mar 2019</td>
        <td>Class X - 9.7/10</td>
        <td>Siddhartha Mdl School, Hyderabad, India</td>
      </tr>
    </table>
  
    <h2>Skills</h2>
    <p>Languages: Python, Java, C/C++, SQL, JavaScript, HTML/CSS</p>
    <p>Frameworks: Flask, Django, Vue.js, RESTfulAPI</p>
    <p>Databases: SQL (PostgreSQL, MySQL, SQLite3), AWS</p>
    <p>Libraries: pandas, NumPy, Matplotlib, TensorFlow, seaborn, Flask-SQLAlchemy</p>
    <p>Soft Skills: Time Management, Teamwork, Leadership, Communication, Problem Solving, Community Building, Analytical skills, creative thinking, Documentation, Engaging Presentation</p>
  
    <h2>Experience</h2>
    <h3>Samsung PRISM Research Intern</h3>
    <p>Samsung R&D Institute India | Aug 2023 - Present</p>
    <ul>
      <li>Project: Segment Human from One Image and Impose on Second Image</li>
      <li>Objective: Customize the background scene based on user choice using image segmentation techniques.</li>
      <li>Outcomes: Develop an Android app that lets users select two images from the phone...</li>
    </ul>
  
    <h3>Technical Director</h3>
    <p>Data Science Community SRM | May 2023 - Present</p>
    <ul>
      <li>As a Technical Director at the Data Science Community SRM, I have successfully leveraged my leadership and project management skills...</li>
      <li>Additionally, I’ve cultivated a thriving technology-driven student-led community...</li>
    </ul>
  
    <!-- Add other experiences similarly -->
  
    <h2>Projects</h2>
    <h3>Grocery Store, Modern Application Development - I</h3>
    <p>Indian Institute of Technology, Madras | June 2023 - Aug 2023</p>
    <ul>
      <li>I successfully developed a multi‐user grocery store web application using Flask, Jinja2 templates, and Bootstrap for a seamless user ex‐ perience. The project featured category and product management, including the ability to create, edit, and remove sections/categories and products. Users could browse and purchase products from various categories, with real‐time stock status and dynamic pricing op‐ tions.Furthermore, I implemented REST APIs for CRUD operations on categories and products, ensuring data validation at both the frontend and backend levels.Project Grade Achieved: 93%</li>
    </ul>

    <h3>Rhythm Generator</h3>
    <p>SRM Institute of Science and Technology | Feb 2023 - May 2023</p>
    <ul>
        <li>Objective:DevelopedaRhythmGenerator,thatgeneratesrandommusicalrhythmbasedoninstrumentsandmoodusingComMUdataset, a collection of over 10,000 MIDI files of various genres and styles. Using vertically stacked time‐valued sequences and REMI format, the Transformer‐XL approach achieved a 15% improvement in composition quality, surpassing benchmarks like Music Transformer and DeepJ. Awarded Best Project by Data Science Community SRM for 2022‐23 term.Currently progressing for Publication.</li>
    </ul>

  
    <!-- Add other projects similarly -->
  
    <h2>Achievements & Certifications</h2>
    <ul>
      <li>2023: Got prestigious summer internship offer, from FIST, IIT Patna India</li>
      <li>2023: Best Project Award, from Data Science Community SRM India</li>
      <li>2023: AWS Academy Graduate - AWS Academy Machine Learning Foundations, Issued by Amazon Web Services India</li>
      <li>2022: Foundational Level in Programming and Data Science, Indian Institute of Technology, Madras India</li>
      <li>2022: Elite+Silver Badge, Python for Data Science NPTEL Exam India</li>
      <li>2022: Elite+Silver Badge, The Joy of Computing using Python NPTEL Exam India</li>
      <li>2021: CSR Scholarship by Verizon, to pursue courses in IIT Madras BS in Data Science and Applications program India</li>
    </ul> </div>`,
        mounted : function(){
        document.title = "About";
    }
});

export default About;