import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import fruits from "../../Assets/Projects/fruits.png";
import game from "../../Assets/Projects/game.png";
import joke from "../../Assets/Projects/joke.png";
import techy from "../../Assets/Projects/techy.png";
import resume from "../../Assets/Projects/resume.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={fruits}
              isBlog={false}
              title="fruitopia"
              description="
              Welcome to Fruitopia – a vibrant online haven for fruit enthusiasts! Our website, crafted with cutting-edge frontend technologies, offers a visually stunning and user-friendly experience. Dive into a virtual orchard of succulent fruits showcased through captivating design and seamless navigation. Whether you're exploring mouthwatering recipes, discovering the nutritional benefits of your favorite fruits, or shopping for the freshest produce, Fruitopia's frontend tech stack ensures a delightful and responsive interface. Embrace the juicy goodness of fruits with an immersive and dynamic online experience, brought to life by our state-of-the-art frontend technology."
              ghLink="https://github.com/adi0193/Froutopia"
              demoLink="https://fruitopiaadi.netlify.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={game}
              isBlog={false}
              title="racing game"
              description="Experience the adrenaline rush as you take the driver's seat in a visually stunning virtual race track. The game's foundation is built on HTML, ensuring a robust structure that sets the stage for an immersive racing experience. CSS adds a layer of style, with sleek designs, realistic animations, and attention-grabbing visuals that bring each car to life.
              JavaScript is the engine behind the action, enabling real-time physics, responsive controls, and competitive AI opponents. Feel the wind in your virtual hair as you speed through challenging tracks, navigating sharp turns and avoiding obstacles with the precision made possible by the seamless integration of these frontend technologies."
              ghLink="https://github.com/adi0193/Movingcar"
              demoLink="https://movingcaradi.netlify.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={techy}
              isBlog={false}
              title="TechnoTrails"
              description="Technotrails – an innovative React project that redefines your exploration of technology trails! Our platform, skillfully crafted with React, offers a seamless and dynamic user experience. Dive into a world of technological wonders where the frontend is meticulously designed using SCSS for enhanced styling and JSX for creating dynamic and interactive components.Technotrails leverages the power of React to provide a responsive and intuitive interface, ensuring a smooth navigation experience for users eager to explore the latest tech trends. With SCSS, our design goes beyond the ordinary, incorporating modern aesthetics and user-friendly layouts that enhance readability and engagement."
              ghLink="https://github.com/adi0193/TechnoTrails"
              demoLink="https://aditechnotrails.netlify.app/"              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={joke}
              isBlog={false}
              title="Random Joke generator"
              description="Welcome to the Random Joke Generator – a whimsical project that combines the charm of humor with the power of JavaScript and a dedicated Joke API. Brace yourself for an endless supply of laughter as you embark on a journey through an assortment of jokes, all delivered with a simple click.Powered by JavaScript, this project seamlessly fetches jokes from a specialized Joke API, ensuring a diverse and ever-expanding collection of witty, hilarious, and sometimes downright silly jokes. The dynamic nature of JavaScript allows for real-time updates, creating a delightful user experience that keeps the laughs coming.."
              ghLink="https://github.com/adi0193/randomjoke"
              demoLink="https://randomjokegenerate.netlify.app/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={resume}
              isBlog={false}
              title="Resume maker"
              description="
              Introducing the Resume Maker – an advanced tool crafted with React, Express, Node.js, and CORS to streamline the resume creation process like never before. This project is designed to provide users with a seamless and efficient experience in crafting personalized resumes tailored to their professional journey.The frontend of the Resume Maker is built using React, offering an intuitive and responsive user interface. Users can easily input their information, select from various templates, and customize the layout to create a professional and visually appealing resume."
              ghLink="https://github.com/adi0193/ResumeMaker"
              // demoLink="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" <--------Please include a demo link here
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
